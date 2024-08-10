import postUseCase from "../../application/postUseCase";
import { IPost } from "../../domain/entities/postEntity";
import commentUseCase from "../../application/commentUseCase";
import { IReport } from "../../domain/entities/reportEntity";

export default class postService{
    private postUseCase : postUseCase;
    private commentUseCase : commentUseCase;

    constructor(post : postUseCase,comment : commentUseCase){
        this.postUseCase = post
        this.commentUseCase = comment
    }

    create(post: IPost):Promise<IPost>{
        return this.postUseCase.create(post);
    }
    edit(id:string, data:object):Promise<boolean | IPost>{
        return this.postUseCase.edit(id,data);
    }
    delete(id:string):Promise<boolean>{
        return this.postUseCase.delete(id);
    }
    getAllPosts(page:number):Promise<IPost[]>{
        return this.postUseCase.getAllPosts(page)
    }
    getPost(id:string):Promise<IPost[]>{
        return this.postUseCase.getPost(id);
    }
    removeLike(id:string, data:object):Promise<boolean>{
        return this.postUseCase.removeLike(id,data);
    }
    editPost(id:string, data:object):Promise<boolean | IPost>{
        return this.postUseCase.editPost(id,data);
    }
    async addComment(id : string,comment : object):Promise<boolean>{
         try {
            const res =await this.commentUseCase.create(comment);
            const add =await this.postUseCase.edit(id,{comments : res._id});
            return true
         } catch (error) {
            return false
         }
    }
    editComment(id:string,data:object):Promise<boolean>{
        return this.commentUseCase.edit(id,data)
    }
    deleteComment(id:string) : Promise<boolean>{
        return this.commentUseCase.delete(id)
    }
    addCommentReply(id:string,data:object):Promise<boolean>{
        return this.commentUseCase.addReply(id,data)
    }
    removeCommentReply(id:string,replyId:string):Promise<boolean>{
        return this.commentUseCase.removeReply(id,replyId)
    }
    editCommentReply(id:string,replyId:string,updatedText:string):Promise<boolean>{
        return this.commentUseCase.editReply(id,replyId,updatedText)
    }
    like(id: string, userId: string): Promise<boolean>{
        return this.commentUseCase.like(id,userId);
    }
    newPostReport(data:object):Promise<boolean>{
        return this.postUseCase.report(data);
    }
    newCommentReport(data:object):Promise<boolean>{
        return this.commentUseCase.report(data);
    }
    addPostReport(id:string,data:object):Promise<boolean>{
        return this.postUseCase.editReport(id,data);
    }
    addCommentReport(id:string,data:object):Promise<boolean>{
        return this.commentUseCase.editReport(id,data);
    }
    checkPostReport(id:string,userId:string):Promise<boolean | string>{
        return this.postUseCase.checkReport(id,userId);
    }
    checkCommentReport(id:string,userId:string):Promise<boolean | string>{
        return this.commentUseCase.checkReport(id,userId);
    }
    getAllReports():Promise<IReport[]>{
        return this.postUseCase.getAllReports()
    }
}