import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumpostService } from 'src/app/Services/forumpost.service';
import { UsersService } from 'src/app/Services/users.service';
import { Comment } from 'src/app/model/Comment';
import { ForumPost } from 'src/app/model/ForumPost';
import { user } from 'src/app/model/user';

@Component({
  selector: 'app-forumpost',
  templateUrl: './forumpost.component.html',
  styleUrls: ['./forumpost.component.scss']
})
export class ForumpostComponent {
listforum!:ForumPost[]
listcomment!:Comment[]
reacts!:any[]
listSousComment:any
selectedPostId!: number;
id:any

imageUrl:any
comment = {
  commentId:0,
  content: '',


};

 isIdInList(targetId: any, objectList: any[]): boolean {
  return objectList.some(obj => obj.user.userId === targetId);
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
buttonAjouter(){
  this.router.navigate(['/ajouterPost'])
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
react= {
  liked: false,
  dislike: false
}

likePost(id:any){
  this.service.PostLike(id,this.react).subscribe((r)=>{
    console.log( r.liked)
    
    this.getallforum()
    this.react.liked = r.liked ;
  this.react.dislike = r.dislike;})
}



dislikePost(id:any){
  this.service.PostdisLike(id,this.react).subscribe(()=>this.getallforum())
}
activeCommentInputIndex: number | null = null;

toggleCommentInput(index: number) {
  this.activeCommentInputIndex =
    this.activeCommentInputIndex === index ? null : index;
}

isCommentInputVisible(index: number): boolean {
  return this.activeCommentInputIndex === index;
}
addComment(id:any){
  
  this.service.addComment(id,this.comment).subscribe( () => {
    this.comment = {
      commentId:0,
      content: "",

    
    };
    console.log('ddddddddddddddd')
    this.getallforum();
  })
  }
  addSousComment(id:any){
    this.service.addSousComment(id,this.souscomment).subscribe( () => {
      this.souscomment = {
        scommentId:0,
        content: "",

      };
      this.getallforum();
    })
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
buttonUpdate(id:any){
  this.router.navigate(['updatePost/'+id])
}
editingCommentId: number | null = null;
editedCommentContent = '';

startEditingComment(commentId: number, content: string): void {
  this.updateComment.commentId = commentId;
  this.updateComment.content = content;
}
souscomment={
  scommentId:0,
  content:''
}
updatesouscomment={
  scommentId:0,
  content:''
}
startEditingSousComment(scommentId: number, content: string):void{
  this.updatesouscomment.scommentId = scommentId;
  this.updatesouscomment.content = content;
}
updateComment={
  commentId:0,
  content: "",
}
saveEditedComment(): void {
  
  this.service.updateComment(this.updateComment).subscribe( () => {
    console.log(this.updateComment)
    this.updateComment = {
      commentId:0,
      content: "",

    
    };
    this.getallforum();
  })

}
saveEditedSousComment(): void {
  
  this.service.updateSousComment(this.updatesouscomment).subscribe( () => {
    console.log(this.updatesouscomment)
    this.updatesouscomment = {
      scommentId:0,
      content: "",

    
    };
    this.getallforum();
  })

}
deleteSousComment(commentId:any){
  this.service.deleteSousComment(commentId).subscribe((res)=>{
  console.log(res)
  this.getallforum()})
 
}
mot:any
recherche (){
  this.service.recherche(this.mot).subscribe((r)=>{
    this.listforum=r;
  })

  
}
}
