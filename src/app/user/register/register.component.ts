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
import { CreditCard } from '../_models/user.model';

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
      ]),
      cardNumber: new FormControl('', Validators.required),
      expiration: new FormControl('', Validators.required),
      securityCode: new FormControl('', Validators.required),
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
  get cardNumber() {
    return this.registrationFormGroup.get('cardNumber');
  }
  get expiration() {
    return this.registrationFormGroup.get('expiration');
  }
  get securityCode() {
    return this.registrationFormGroup.get('securityCode');
  }

  onRegistrationFormSubmit() {
    if (this.registrationFormGroup.invalid) {
      return;
    }
    this.isRegistrationFormLoading = true;
  }

  onSubmit() {
    const creditCardDetails: CreditCard = {
      accountHolderName : `${this.firstName.value} ${this.lastName.value}`,
      accountAddress1: '5 James Park',
      accountCity: 'Sydney',
      accountPostalCode: '4000',
      accountState: 'NSW',
      accountCountryCode: 'AUS',
      creditCardNumber: this.cardNumber.value,
      creditCardType: 'VISA',
      expirationMonth: this.expiration.value.split('/')[0],
      expirationYear: this.expiration.value.split('/')[1],
      securityCode: this.securityCode.value,
      mailAddress: this.emailId.value
    };
    this.userService.registerUser(creditCardDetails).subscribe(
      (data: any) => {
        this.alertService.success(`Registration successful! Your customer code is ${data.customerID}`, true);
        this.router.navigate(['']);
      },
      error => {
        this.alertService.error(error);
        this.isRegistrationFormLoading = false;
      }
    );
  }
}
