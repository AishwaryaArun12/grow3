import {Post} from "../../infrastructure/database/postModel";
import Users from "../../infrastructure/database/userModel";
import { IPost} from '../../domain/entities/postEntity'
import { CommentReports, PostReports } from '../../infrastructure/database/reportModel';
import {IReport} from "../../domain/entities/reportEntity";

export default class postRepository{
    async create(comment:object):Promise<IPost>{
        const newComment = await Post.create(comment);
        return newComment.toObject();
    }
    async edit(id:string, data: object):Promise<boolean | IPost>{
        try {
            
           const update =  await Post.findOneAndUpdate({_id : id},{$addToSet : data}, {new : true});
           
           return update
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async editPost(id:string, data: object):Promise<boolean | IPost>{
        try {
            console.log(id,'id');
           const update =  await Post.findOneAndUpdate({_id : id},{$set : data}, {new : true});
           return update
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async delete(id: string):Promise<boolean>{
        try {
            await Post.findByIdAndDelete(id);
            await PostReports.findOneAndDelete({postId : id});
            return true
        } catch (error) {
            return false
        }
       
    }
    async getAllPosts(page:number):Promise<IPost[]>{
        try {
            const count = await Post.countDocuments({'userId': { $in: await Users.find({ active: true }).distinct('_id') }})
            const result = await Post.find({'userId': { $in: await Users.find({ active: true }).distinct('_id') }}).populate('userId') .populate({

                path: 'comments',
                options: { sort: { time: 'desc' } },
                populate: [
                  {
                    path: 'userId',
                  },
                  {
                    path: 'reply.userId',
                  },
                  {
                    path: 'reply.mention',
                  },
                ],
              }).sort({time : -1}).limit(page*2);
              console.log(count,'count')
            return result
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    async getPost(id : string):Promise<IPost[]>{
        try {
            const result = await Post.find({userId : id}).populate('userId') .populate({

                path: 'comments',
                options: { sort: { time: 'desc' } },
                populate: [
                  {
                    path: 'userId',
                  },
                  {
                    path: 'reply.userId',
                  },
                  {
                    path: 'reply.mention',
                  },
                ],
              }).sort({time : -1});
            return result;
        } catch (error) {
            return error;            
        }
    }
    async removeLike(id:string,data:object):Promise<boolean>{
        try {
            await Post.findOneAndUpdate({_id : id},{$pull : data}, {new : true});
            return true
        } catch (error) {
            return false
        }
    }
    async report(data : object):Promise<boolean>{
        try {
           const res = await PostReports.create(data)
            return true
        } catch (error) {
            return false;
        }
    }
    async editReport(id:string,data:object):Promise<boolean>{
        try {
            const res = await PostReports.findOneAndUpdate({postId :id},{$push : data});
            return true;
        } catch (error) {
            return false;
        }
    }
    async checkReport(id:string,userId:string):Promise<boolean | string>{
        try {
           const res =  await PostReports.findOne({postId: id});
            if(res){
                const checkUser =  await PostReports.findOne({postId : id,'details.userId': userId});
                if(checkUser){
                    
                    return 'User already reported'
                }else{
                    console.log(res.details.length,'nooooooooooo')
                    if(res.details.length >= 2){
                        await PostReports.findOneAndDelete({postId: id});
                        await Post.findOneAndDelete({_id: id});
                        return 'post deleted'
                    }
                    return "user not exist";
                }
                
            }else{
                throw new Error("not exist");
            }
        } catch (error) {
            console.log(error,'error')
            return false
        }
    }
    async getAllReports():Promise<IReport[]>{
        
            const postRes = await PostReports.find().populate({
                path: 'postId',
                populate: {
                  path: 'userId',
                  model: 'Users', 
                },
              }).populate({
                path: 'details.userId',
                model: 'Users', 
              });
            const commentRes = await CommentReports.find().populate({
                path: 'commentId',
                populate: {
                  path: 'userId',
                  model: 'Users', 
                },
              }).populate({
                path: 'details.userId',
                model: 'User', 
              });
            const res = [...postRes,...commentRes]
            return res
       
    }
}