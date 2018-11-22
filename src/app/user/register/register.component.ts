import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from 'src/app/common-util/_services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationFormGroup: FormGroup;
  isRegistrationFormLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationFormGroup = this.formBuilder.group({
      firstName: new FormControl({value: 'Agilesh', disabled: true}, [
        Validators.required,
        Validators.minLength(3)
      ]),
      lastName: new FormControl({value: 'Sivakumar', disabled: true}, Validators.required),
      emailId: new FormControl({value: 'agileshsivakumar@gmail.com', disabled: true}, Validators.required),
      username: new FormControl({value: 'agilesh', disabled: true}, Validators.required),
      password: new FormControl({value: 'password', disabled: true}, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get firstName() {
    return this.registrationFormGroup.get('firstName');
  }
  get lastName() {
    return this.registrationFormGroup.get('lastName');
  }
  get emailId() {
    return this.registrationFormGroup.get('emailId');
  }
  get username() {
    return this.registrationFormGroup.get('username');
  }
  get password() {
    return this.registrationFormGroup.get('password');
  }

  onRegistrationFormSubmit() {
    if (this.registrationFormGroup.invalid) {
      return;
    }
    this.isRegistrationFormLoading = true;
  }

  onSubmit() {
    this.userService.registerUser(this.registrationFormGroup.value).subscribe(
      data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['']);
      },
      error => {
        this.alertService.error(error);
        this.isRegistrationFormLoading = false;
      }
    );
  }
}
