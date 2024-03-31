import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumpostService } from 'src/app/Services/forumpost.service';
import { UsersService } from 'src/app/Services/users.service';
import { Comment } from 'src/app/model/Comment';
import { ForumPost } from 'src/app/model/ForumPost';

@Component({
  selector: 'app-all-forum-post',
  templateUrl: './all-forum-post.component.html',
  styleUrls: ['./all-forum-post.component.scss']
})
export class AllForumPostComponent {
  listforum!:ForumPost[]
  listcomment!:Comment[]
  listSousComment:any
  selectedPostId!: number;
  id:any
  
  imageUrl:any
  comment = {
    commentId:0,
    content: '',
  
  
  };
  
  react= {
    liked:1
  }
  user:any
  idUser : any=""
    constructor(private service:ForumpostService,private router : Router,private serviceUser:UsersService){
      this.idUser = localStorage.getItem('idUser');
    }
  ngOnInit():void{
    this.getallforum();
    this.getUserById()
    
  }
  imgselect(s : any ):  string {
    return "C:Users/ihebg/OneDrive/Bureau/projet_eya/demo/uploads/"+  s
  }
  getUserById(){
    this.serviceUser.getUser().subscribe((res)=>{this.user=res;
    console.log(res)});
  }
  getallforum() {
    this.service.getall().subscribe(
      (forum: ForumPost[]) => {
        console.log(forum);
        this.listforum = forum;
  
        
        
        
      },
      (error) => {
        console.error('Error fetching forum:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
      }
    );
  }
  isIdInList(targetId: any, objectList: any[]): boolean {
    return objectList.some(obj => obj.user.userId === targetId);
  }
  getallcomments(id:any) {
    this.service.getComments(id).subscribe(
      (comments: Comment[]) => {
        console.log(comments);
        this.listcomment = comments;
      },
      (error) => {
        console.error('Error fetching forum:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
      }
    );
  }


  activeCommentInputIndex: number | null = null;
  
  toggleCommentInput(index: number) {
    this.activeCommentInputIndex =
      this.activeCommentInputIndex === index ? null : index;
  }
  
  isCommentInputVisible(index: number): boolean {
    return this.activeCommentInputIndex === index;
  }


  deletePost(id:any){
    this.service.deletePost(id).subscribe((res)=>{
    console.log(res)
    this.getallforum()})
   
  }
  deleteComment(commentId:any){
    this.service.deleteComment(commentId).subscribe((res)=>{
    console.log(res)
    this.getallforum()})
   
  }

  deleteSousComment(commentId:any){
    this.service.deleteSousComment(commentId).subscribe((res)=>{
    console.log(res)
    this.getallforum()})
   
  }
}
