import { Request,Response } from "express";
import postService from "../domain/services/postService";
import { IPost } from "../domain/entities/postEntity";
import fs, { promises as fsPromises } from 'fs';

export default class postController {
    private postService:postService

    constructor(post:postService){
        this.postService = post
    }
    async create(req:Request,res:Response):Promise<void>{
       try {
        const id = req.headers['id'].toString();
        const {description} = req.body
        const file = req.file?.path
        const result = await this.postService.create({userId:id,description,media:file,time: new Date()})
        res.status(200).json({message:'Post created successfully',result })
       } catch (error) {
        
       }
        
    }
    async getAllPosts(req:Request,res:Response):Promise<void>{
        try {
            const page = parseInt(req.params.page);
            const skip = parseInt(req.params.skip);
;            const result = await this.postService.getAllPosts(page,skip);
            res.status(200).json({message:'Posts retrieved successfully',posts:result})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async edit(req:Request,res:Response):Promise<void>{
        try {
            const {id,data} = req.body
            await this.postService.edit(id,data);
            res.status(200).json({message:'Post edited successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async editPost(req:Request,res:Response):Promise<void>{
        try {
            const {description,id,ePostImg} = req.body
            const file = req.file?.path ?? ePostImg
            const data = {description,media:file}
            await this.postService.editPost(id,data);
            fsPromises.access(ePostImg, fs.constants.F_OK)
            .then(() => {
                fsPromises.unlink(ePostImg).then(res=>console.log('deleted path successfull..')).catch(err=>console.log(err,'error'))
            }).catch(err=>{
                console.log(err,'getting error when access')
            })
            
            res.status(200).json({message:'Post edited successfully'})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    async delete(req:Request,res:Response):Promise<void>{
        try {
            const id = req.params.id
        const img = req.params.img;
        const up = req.params.up;
        await this.postService.delete(id);
        if(up != 'up'){
           await fsPromises.unlink(up+'/'+img);
        }
        res.status(200).json({message:'Post deleted successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async addLike(req :Request, res: Response):Promise<void>{
       try {
        const id = req.headers['id'].toString();
        const postId = req.body.id;
        await this.postService.edit(postId, {likes:id});
        res.status(200).json({message:'Like recorded successfully'})
       } catch (error) {
        res.status(500).json(error)
       }
    }
    async removeLike(req :Request, res: Response):Promise<void>{
        try {
         const id = req.headers['id'].toString();
         const postId = req.body.id;
         await this.postService.removeLike(postId, {likes:id});
         res.status(200).json({message:'Like recorded successfully'})
        } catch (error) {
         res.status(500).json(error)
        }
     }
     async addComment(req: Request,res: Response){
        try {
            const id = req.headers['id']?.toString();
         const postId = req.body.id;
         const comment = req.body.comment;
         const comments =  {userId: id,comment,time: new Date()};
        const response = await this.postService.addComment(postId, comments);
        
        if(response){
            res.status(200).json({message:'comment recorded successfully', response })
        }else{
            throw new Error("comment not recorded successfully");
            
        }
        
        } catch (error) {
            
            res.status(500).json(error)
        }
     }
     async addReply(req: Request,res: Response){
        try {
            const{commentId,userId,mention,reply,time} = req.body;
            await this.postService.addCommentReply(commentId,{userId,mention,reply,time});
            res.status(200).json({message:'reply added successfully'});
        } catch (error) {
            res.status(500).json({message:'Internal server error'})
        }
     }
     async editComment(req: Request,res: Response){
        try {
            const {id,data} = req.body
            const result = await this.postService.editComment(id,data);
            res.status(200).json({message:'Post edited successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
     }
     async deleteComment(req: Request,res: Response){
        try {
           const id = req.params.id
            const result = await this.postService.deleteComment(id);
            res.status(200).json({message:'Post comment removed successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
     }
     async editReplyComment(req: Request,res: Response){
        try {
            const {commentId,replyId,text} = req.body
            const result = await this.postService.editCommentReply(commentId,replyId,text);
            res.status(200).json({message:'reply edited successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
     }
     async deleteReplyComment(req: Request,res: Response){
        try {
            const {commentId,replyId} = req.body
            const result = await this.postService.removeCommentReply(commentId,replyId);
            res.status(200).json({message:'reply edited successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
     }
     async likeComment(req : Request,res: Response){
        try {
            const {id,userId} = req.body;
            await this.postService.like(id,userId);
            res.status(200).json({message: 'Comment edited successfully'})
        } catch (error) {
            res.status(500).json({message: "Internal server error "})
        }
     }
     async report(req :Request,res:Response){
        try {
            const {reportFor,reason,itemId,userId} = req.body;
            if(reportFor == 'post'){
                const result = await this.postService.checkPostReport(itemId,userId);
                if(result == 'User already reported'){
                    res.status(201).json({message: 'Reported already'})
                    return;
                }else if(result == 'post deleted'){
                    res.status(201).json({message: 'Reported successfully'})
                    return;
                }
                else if(result == 'user not exist'){
                    await this.postService.addPostReport(itemId,{details : {userId,reason,time:new Date()}})
                }else{
                    await this.postService.newPostReport({postId : itemId,details : [{userId,reason,time:new Date()}]})
                }
            }else{
                const result  = await this.postService.checkCommentReport(itemId,userId);
                if(result == 'User already reported'){
                    res.status(201).json({message: 'Reported already'})
                    return;
                }
                else if(result == 'user not exist'){
                    await this.postService.addCommentReport(itemId,{details : {userId,reason,time:new Date()}})
                }else{
                    await this.postService.newCommentReport({commentId : itemId,details : [{userId,reason,time:new Date()}]})
                }
            }
            res.status(201).json({message: 'Reported successfully'})
        } catch (error) {
            
            res.status(500).json({message: "Internal server error "})
        }
     }
    }