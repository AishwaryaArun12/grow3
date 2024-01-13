import { IPost } from "../domain/entities/postEntity";
import postRepository from "../infrastructure/repository/postRepository";

export default class postUseCase{
    private postRepository: postRepository;

    constructor (post: postRepository){
        this.postRepository = post;
    }

    create(post: IPost):Promise<IPost>{
        return this.postRepository.create(post);
    }
    edit(id: string,data: object):Promise<boolean | IPost>{
        return this.postRepository.edit(id,data);
    }
    delete(id:string): Promise<boolean>{
        return this.postRepository.delete(id);
    }
    getAllPosts(page:number,skip:number):Promise<IPost[]>{
        return this.postRepository.getAllPosts(page,skip);
    }
    getPost(id: string):Promise<IPost[]>{
        return this.postRepository.getPost(id);
    }
    removeLike(id: string,data: object):Promise<boolean>{
        return this.postRepository.removeLike(id,data);
    }
    editPost(id:string,data:object):Promise<boolean| IPost>{
        return this.postRepository.editPost(id,data)
    }
    report(data:object):Promise<boolean>{
        return this.postRepository.report(data);
    }
    editReport(id:string,data:object):Promise<boolean>{
        return this.postRepository.editReport(id,data);
    }
    checkReport(id:string,userId:string):Promise<boolean | string>{
        return this.postRepository.checkReport(id,userId);
    }
}