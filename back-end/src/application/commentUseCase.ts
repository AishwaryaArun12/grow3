import { IComment } from "../domain/entities/postEntity";
import commentRepository from "../infrastructure/repository/commentRepository";

export default class commentUseCase{
    private commentRepository : commentRepository

    constructor(comment: commentRepository){
        this.commentRepository = comment;
    }
    create(comment: IComment):Promise<IComment>{
       return this.commentRepository.create(comment)
    }
    edit(id: string,data:object):Promise<boolean>{
        return this.commentRepository.edit(id,data);
    }
    delete(id:string):Promise<boolean>{
        return this.commentRepository.delete(id)
    }
    addReply(id : string,data: object): Promise<boolean>{
        return this.commentRepository.addReply(id,data)
    }
    removeReply(id: string, replyId:string): Promise<boolean>{
        return this.commentRepository.removeReply(id,replyId)
    }
    editReply(id: string, replyId:string,updatedText:string): Promise<boolean>{
        return this.commentRepository.editReply(id,replyId,updatedText)
    }
    like(id: string, userId: string): Promise<boolean>{
        return this.commentRepository.like(id,userId);
    }
    report(data:object):Promise <boolean>{
        return this.commentRepository.report(data);
    }
    editReport(id:string,data:object):Promise<boolean>{
        return this.commentRepository.editReport(id,data);
    }
    checkReport(id:string,userId:string):Promise<boolean | string>{
        return this.commentRepository.checkReport(id,userId);
    }
}