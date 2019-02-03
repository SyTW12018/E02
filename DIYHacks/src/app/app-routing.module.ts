import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
// Guard Service
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate: [AuthguardService]},
  {path: 'profile/:id', component:ProfileComponent},
  {path: 'create', component:CreatepostComponent},
  {path: 'explore', component:ExploreComponent},
  {path: 'signup', component:SignupComponent},
  {path: '**', pathMatch:'full', redirectTo:'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
