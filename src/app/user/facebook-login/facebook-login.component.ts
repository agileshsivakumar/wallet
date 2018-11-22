import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from 'src/app/common-util/_services/alert.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss']
})
export class FacebookLoginComponent {

  facebookLoginFormGroup: FormGroup;
  isFacebookLoginFormLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.createFacebookLoginForm();
  }

  createFacebookLoginForm() {
    this.facebookLoginFormGroup = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get username() {
    return this.facebookLoginFormGroup.get('username');
  }
  get password() {
    return this.facebookLoginFormGroup.get('password');
  }

  public onFacebookLoginFormSubmit() {
    if (this.facebookLoginFormGroup.invalid) {
      return;
    }
    this.isFacebookLoginFormLoading = true;
    this.userService
      .authenticateUser(this.username.value, this.password.value)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.alertService.success('ACI wallet will use your name and email id from Facebook', true);
          this.router.navigate(['/register']);
        }
        this.isFacebookLoginFormLoading = false;
      });
  }

}
