import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumpostService } from 'src/app/Services/forumpost.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-ajouter-post',
  templateUrl: './ajouter-post.component.html',
  styleUrls: ['./ajouter-post.component.scss']
})
export class AjouterPostComponent {
user:any
  constructor(private service:ForumpostService,private router:Router,private serviceUser:UsersService){}
  post = {
    title: '',
    postContent: '',
    imageUrl:''


  };
  ngOnInit():void{

    this.getUserById()
    
  }
  isUserBanned: boolean = false; 
  getUserById(){
    this.serviceUser.getUser().subscribe((res)=>{this.user=res;
    
    console.log(res)});
  }
IMG : any = ""  
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    console.log(file)
    // Process the selected image file as needed
    console.log('Selected Image:', file);

    // Assuming you have a method in your service to handle image upload
    this.service.uploadImage(file).subscribe(
      (imageUrl: string) => {
        // Update the post object with the received image URL
        this.post.imageUrl = imageUrl;
        this.IMG=imageUrl
        console.log('Image uploaded successfully:', imageUrl);
      },
      err => {
        console.error('Error uploading image:', err);
      }
    );
  }
msg = ""
  ajouterPost() {
    this.service.AddPost(this.post).subscribe(
      res => {
        
        this.post = {
          title: '',
          postContent: '',
          imageUrl: this.IMG
        };
        console.log(res);
        if(res == 'Post is added successfully!'){
          this.router.navigate(['']);
        }
        else {
          
          alert(res)
          if(res == "You have been banned for 1 hour"){
            this.router.navigate(['']);
          }
        }
   //     
      },
      err => {
     //   if(err.error.error)
        console.log(err.error.error);
      }
    );
  }
  buttonRetour(){
    this.router.navigate(['']);
  }
}
