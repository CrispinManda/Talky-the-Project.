import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { LikePostComponent } from './like-post/like-post.component';
import { LikeCommentComponent } from './like-comment/like-comment.component';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PeopleYouMayKnowComponent } from './people-you-may-know/people-you-may-know.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TalkyComponent } from './talky/talky.component';
import { PhotoUploadDialogComponent } from './photo-upload-dialog/photo-upload-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCreateModalComponent } from './post-create-modal/post-create-modal.component';
import {  HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './pipes/search.pipe';
import { ProfilIdComponent } from './profil-id/profil-id.component';
import { UpdateComponent } from './update/update.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    EditProfileComponent,
    PostListComponent,
    PostCreateComponent,
    CommentListComponent,
    CommentCreateComponent,
    LikePostComponent,
    LikeCommentComponent,
    FollowButtonComponent,
    SidebarComponent,
    PeopleYouMayKnowComponent,
    ProfileComponent,
    NotFoundComponent,
    TalkyComponent,
    PhotoUploadDialogComponent,
    PostCreateModalComponent,
    SearchPipe,
    ProfilIdComponent,
    UpdateComponent,
    UpdateprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
