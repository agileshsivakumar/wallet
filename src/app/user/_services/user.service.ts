import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, CreditCard } from '../_models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/xml'
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/xml'
    });
    const creditCardRequest = `
        <?xml version="1.0" encoding="UTF-8"?>
        <creditcard>
            <accountHolderName>${
              creditCard.accountHolderName
            }</accountHolderName>
            <accountAddress1>${creditCard.accountAddress1}</accountAddress1>
            <accountCity>${creditCard.accountCity}</accountCity>
            <accountState>${creditCard.accountState}</accountState>
            <accountPostalCode>${
              creditCard.accountPostalCode
            }</accountPostalCode>
            <accountCountryCode>${
              creditCard.accountCountryCode
            }</accountCountryCode>
            <creditCardNumber>${creditCard.creditCardNumber}</creditCardNumber>
            <creditCardType>${creditCard.creditCardType}</creditCardType>
            <expirationMonth>${creditCard.expirationMonth}</expirationMonth>
            <expirationYear>${creditCard.expirationYear}</expirationYear>
            <securityCode>${creditCard.securityCode}</securityCode>
            <mailAddress>${creditCard.mailAddress}</mailAddress>
        </creditcard>
    `;
    const hdr = { headers: headers, body: creditCardRequest };
    return this.http
      .post('http://10.61.183.35:8080/ARPayment/payapi/myresource/credit/', hdr)
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
