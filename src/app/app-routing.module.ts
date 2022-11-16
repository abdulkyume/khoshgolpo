import { AddfriendsComponent } from './addfriends/addfriends.component';
import { FriendsComponent } from './friends/friends.component';
import { ChatComponent } from './chat/chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'addfriend', component: AddfriendsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
