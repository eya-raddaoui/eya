import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForumpostService } from 'src/app/Services/forumpost.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent {
  post:any
  id:any
  
constructor(private service:ForumpostService,private router:Router,private activatedRoute:ActivatedRoute){}
routeSub!: Subscription;
ngOnInit(): void {

  this.post={
    postId:null,
    title:null,
    postContent:null,
    imageUrl:''


  }
  this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id']; });
   
   this.service.getpost(this.id).subscribe(p =>{
    console.log(p);
    this.post = p;
  
  });

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
updatePost(){
  this.service.updatePost(this.post).subscribe(
    res => {
      this.post = {
        title: '',
        postContent: "",
        imageUrl: this.IMG

      
      };
      console.log(res)
      this.router.navigate(['']);

    },
    err => {
      console.log(err); 
    }
  );


  }
  buttonRetour(){
    this.router.navigate(['']);
  }

}
