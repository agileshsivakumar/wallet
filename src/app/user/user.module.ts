import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './_services/user.service';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgbModule],
  declarations: [LoginComponent, RegisterComponent, FacebookLoginComponent],
  providers: [UserService],
  exports: [LoginComponent]
})
export class UserModule {}
