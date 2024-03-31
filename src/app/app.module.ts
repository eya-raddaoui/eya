import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateComponent } from './Front/all-template/all-template.component';
import { HeaderComponent } from './Front/header/header.component';
import { FooterComponent } from './Front/footer/footer.component';
import { BodyComponent } from './Front/body/body.component';
import { TrainingsComponent } from './Front/body/trainings/trainings.component';
import { BannerComponent } from './Front/body/banner/banner.component';
import { ClassComponent } from './Front/body/class/class.component';
import { ShowsComponent } from './Front/body/shows/shows.component';
import { ShortCodeComponent } from './Front/body/short-code/short-code.component';
import { ContactComponent } from './Front/body/contact/contact.component';
import { AdminAllComponent } from './Back/admin-all/admin-all.component';
import { AdminFooterComponent } from './Back/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './Back/admin-header/admin-header.component';
import { AdminSideBarComponent } from './Back/admin-side-bar/admin-side-bar.component';
import { AdminHomeComponent } from './Back/admin/admin-home/admin-home.component';
import { ForumpostComponent } from './Front/forumpost/forumpost.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';
import { AjouterPostComponent } from './Front/ajouter-post/ajouter-post.component';
import { UpdatePostComponent } from './Front/update-post/update-post.component';
import { AllForumPostComponent } from './Back/all-forum-post/all-forum-post.component';





@NgModule({
  declarations: [
    AppComponent,
    AllTemplateComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    TrainingsComponent,
    BannerComponent,
    ClassComponent,
    ShowsComponent,
    ShortCodeComponent,
    ContactComponent,
    AdminAllComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminSideBarComponent,
    AdminHomeComponent,
    ForumpostComponent,
    AjouterPostComponent,
    UpdatePostComponent,
    AllForumPostComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
