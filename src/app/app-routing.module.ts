import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { AuthenticationGuard } from './common-util/_services/authentication.guard';
import { FacebookLoginComponent } from './user/facebook-login/facebook-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'facebookLogin',
    component: FacebookLoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
