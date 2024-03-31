
import { user } from "./user";

export class ForumPost{
    postId!:number;
    title!:String;
  
    postDate !:Date;
    postContent!:String;
    user!:user;
    nbLikes!: number;
    nbdisLikes!:number;
    comments!:any;
    imageUrl:any;
    postCreator:any;
    reacts!:any


}