export interface User {
  username: string;
  password: string;
  isLoggedIn: boolean;
}

export interface CreditCard {
  accountHolderName: string;
  accountAddress1: string;
  accountCity: string;
  accountState: string;
  accountPostalCode: string;
  accountCountryCode: string;
  creditCardNumber: string;
  creditCardType: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  mailAddress: string;
}
