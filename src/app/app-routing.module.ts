import { BannerComponent } from './Front/body/banner/banner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateComponent } from './Front/all-template/all-template.component';
import { TrainingsComponent } from './Front/body/trainings/trainings.component';
import { ClassComponent } from './Front/body/class/class.component';
import { ShowsComponent } from './Front/body/shows/shows.component';
import { ShortCodeComponent } from './Front/body/short-code/short-code.component';
import { ContactComponent } from './Front/body/contact/contact.component';
import { AdminAllComponent } from './Back/admin-all/admin-all.component';
import { AdminHomeComponent } from './Back/admin/admin-home/admin-home.component';
import { ForumpostComponent } from './Front/forumpost/forumpost.component';
import { AjouterPostComponent } from './Front/ajouter-post/ajouter-post.component';
import { UpdatePostComponent } from './Front/update-post/update-post.component';
import { AllForumPostComponent } from './Back/all-forum-post/all-forum-post.component';

const routes: Routes = [
  { path:'', component:AllTemplateComponent,
  children:[
    {path:'', component:ForumpostComponent},
    {path:'ajouterPost', component:AjouterPostComponent},
    {path:'updatePost/:id', component:UpdatePostComponent},
    {path:'home', component: BannerComponent},
    {path:'trainings', component: TrainingsComponent},
    {path: 'class', component:ClassComponent},
    {path: 'shows', component: ShowsComponent},
    {path: 'shortcode', component:ShortCodeComponent},
    {path: 'contact', component:ContactComponent},
    
  ]
},
{path: 'admin', component:AdminAllComponent,
children:[
  {path:'body', component:AdminHomeComponent},
  {path:'allForumPost', component:AllForumPostComponent},
  
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
