import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user.model';

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

  public registerUser(registeredUser: User) {
    return this.http.get('assets/users.json').pipe(
      map((users: User[]) => {
        users.forEach(user => {
          if (user.username === registeredUser.username && user.password === registeredUser.password) {
            user.isLoggedIn = true;
            this.setUserDetails(user);
          }
        });
        return this._user.isLoggedIn;
      })
    );
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
