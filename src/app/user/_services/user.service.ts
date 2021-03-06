import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, CreditCard } from '../_models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {
  private _user: User;

  constructor(private http: HttpClient) {}

  public setUserDetails(user: User) {
    this._user = user;
  }

  public getIsUserLoggedIn() {
    return this._user ? this._user.isLoggedIn || false : false;
  }

  public authenticateUser(username: string, password: string) {
    return this.http.get('assets/users.json').pipe(
      map((users: User[]) => {
        users.forEach(user => {
          if (user.username === username && user.password === password) {
            user.isLoggedIn = true;
            this.setUserDetails(user);
          }
        });
        return this._user ? this._user.isLoggedIn || false : false;
      })
    );
  }

  public registerUser(creditCard: CreditCard) {
    return this.http
      .post(
       'http://BLRDL-CKVMJC2.am.tsacorp.com:8080/ARPayment/payapi/myresource/credit/',
        creditCard,
        httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
