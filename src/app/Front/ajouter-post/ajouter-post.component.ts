import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForumpostService } from 'src/app/Services/forumpost.service';
import { UsersService } from 'src/app/Services/users.service';
import { FacebookServiceService } from 'src/app/Services/facebook-service.service';


declare const FB: any;

@Component({
  selector: 'app-ajouter-post',
  templateUrl: './ajouter-post.component.html',
  styleUrls: ['./ajouter-post.component.scss']
})
export class AjouterPostComponent {
user:any
  constructor(private service:ForumpostService,
    private router:Router,
    private serviceUser:UsersService,
    private facebookService: FacebookServiceService){}
  post = {
    title: '',
    postContent: '',
    imageUrl:''


  };
  ngOnInit():void{

    this.getUserById();
    this.getUserInfo();
    
  }
  getUserInfo(): void {
    FB.api('/me', function(res:any) {
      console.log('Informations de l\'utilisateur:', res);
    });
  }
 
  isUserBanned: boolean = false; 
  getUserById(){
    this.serviceUser.getUser().subscribe((res) => {
      this.user = res;
      console.log(res);
  
      // Appel pour récupérer les informations de l'utilisateur depuis Facebook
      FB.api('/me', function(response: any) { // Spécifier le type de response comme any
        console.log('Informations de l\'utilisateur Facebook:', response);
        // Ajoutez ici le code pour utiliser la réponse de l'API Facebook
      });
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
      if (res == 'Post is added successfully!') {
        // Appel pour publier sur la page Facebook
        this.facebookService.publishToFacebookPage('Nouveau post sur ma page !', '1626185464794061', 'EAAXHAc73y80BO0Xjzi4qYpQZC0pYv6L0hTj1CJ7oIqllt2UgZB8hO5ZBWnwP7AH0NswLkjekYu0c2LZC16BTIBmQkDZCY065lypltsryeIRrhyXBVkxN47EfDqQEGL9dzlfvoOEZCWjoBUpPD8WB5ZAxNhgKlqV5ScNeoAGsrl765xby3p2AKW4QUTORXU5mcDG1XDmAbrA4s2RY9ZB23KmN4eMBJ630kZAWiikDtWfNdVoYqhrwgxBilct8SZAxWhzgZDZD').subscribe(
          () => {
            console.log('Published to Facebook successfully!');
            this.router.navigate(['']);
          },
          error => {
            console.error('Error publishing to Facebook:', error);
            this.router.navigate(['']);
          }
        );
      } else {
        alert(res);
        if (res == "You have been banned for 1 hour") {
          this.router.navigate(['']);
        }
      }
    },
    err => {
      console.log(err.error.error);
    }
  );
}

  buttonRetour(){
    this.router.navigate(['']);
  }
}
