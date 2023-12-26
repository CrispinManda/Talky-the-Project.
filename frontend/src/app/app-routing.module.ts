import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeopleYouMayKnowComponent } from './people-you-may-know/people-you-may-know.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TalkyComponent } from './talky/talky.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PostCreateModalComponent } from './post-create-modal/post-create-modal.component';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { ProfilIdComponent } from './profil-id/profil-id.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: TalkyComponent },
  { path: 'people', component: PeopleYouMayKnowComponent },
  {
    path: 'profile/11cbb3f2-5841-4f7a-b8eb-2eb439e41ec',
    component: ProfileComponent,
  },
  { path: 'profile-edit', component: EditProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: PostCreateComponent },
  { path: 'modal-create', component: PostCreateModalComponent },
  { path: 'comment', component: CommentCreateComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile/11cbb3f2-5841-4f7a-b8eb-2eb439e41ec9',
    component: ProfileComponent,
  },
  {
    path: 'profile/11cbb3f2-5841-4f7a-b8eb-2eb439e',
    component: ProfilIdComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
