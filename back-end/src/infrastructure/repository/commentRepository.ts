import { IComment } from "../../domain/entities/postEntity";
import Comments from "../../infrastructure/database/commentModel";
import { CommentReports } from "../../infrastructure/database/reportModel";

export default class commentRepository{
    async create(comment : object): Promise<IComment>{
        const newComment = await Comments.create(comment);
        return newComment.toObject();
    }
    async edit(id:string, data:object): Promise< boolean>{
        try {           
            const res = await Comments.findOneAndUpdate({_id : id},{$set : data}, {new : true});
            return true
         } catch (error) {
             return false
         }
    }
    async addReply(id:string, data:object): Promise< boolean>{
        try {           
            await Comments.findOneAndUpdate({_id : id},{$push : {reply : data}}, {new : true});           
            return true
         } catch (error) {
             console.log(error)
             return false
         }
    }
    async removeReply(id:string,replyId:string): Promise<boolean>{
        try {
             await Comments.findOneAndUpdate(
                { _id: id },
                { $pull: { reply: { _id: replyId } } },
                { new: true }
              );
            return true;
        } catch (error) {
            return false;
        }
    }
    async editReply(id:string,replyId:string,updatedText:string):Promise<boolean>{
        try {
            const updatedComment = await Comments.findOneAndUpdate(
                { _id: id, 'reply._id': replyId },
                { $set: { 'reply.$.reply': updatedText } },
                { new: true }
              );
              return true
        } catch (error) {
            return false
        }
    }
    async delete(id:string): Promise<boolean>{
        try {
            await Comments.findByIdAndDelete(id);
            return true
        } catch (error) {
            return false;
        }
    }
    async like(id:string,userId: string): Promise<boolean>{
        try {
            const result = await Comments.findOne({
                _id: id,
                likes: { $in: [userId] },
              });
              console.log(id,userId,result,'zzzzzzzzzzzzzzzzzz')
            if(result){
                await Comments.findOneAndUpdate({_id:id},{$pull : { likes : userId}});
            }else{
                
                await Comments.findOneAndUpdate({_id : id},{$push : { likes : userId}});
            }
            return true;
        } catch (error) {
            return false
        }
    }
    async report(data : object):Promise<boolean>{
        try {
            await CommentReports.create(data)
            return true
        } catch (error) {
            return false;
        }
    }
    async editReport(id:string,data:object){
        try {
            await CommentReports.findOneAndUpdate({commentId :id},{$push : {details : data}})
            return true;
        } catch (error) {
            return false;
        }
    }
    async checkReport(id:string,userId:string):Promise<boolean | string>{
        try {
            const res =  await CommentReports.findOne({commentId: id});
             if(res){
                 const checkUser =  await CommentReports.findOne({'details.userId': userId});
                 if(checkUser){
                    if(checkUser.details.length >= 2){
                        await CommentReports.findOneAndDelete({postId: id});
                        return 'post deleted'
                    }
                     return 'User already reported'
                 }else{
                     return "user not exist";
                 }
                 
             }else{
                 throw new Error("not exist");
             }
         } catch (error) {
             return false
         }
    }
    
}