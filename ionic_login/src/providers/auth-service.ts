import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


export class User {
    email: string;
    password: string;

    constructor(email: string, password: string) {
      this.email = email;
      this.password  = password;
    }
}

@Injectable()
export class AuthService {

  currentUser: User;

  public login(credentials) {
    if(!credentials.email || !credentials.password) {
      return  Observable.throw("Please insert credentials");
    } else {
      return  Observable.create((observer) => {
        let loginSuccess = (credentials.password == "admin" && credentials.email == "admin")
        this.currentUser = new User("admin", "admin");
        observer.next(loginSuccess)
        observer.complete()
      });
    }
  }

  public register(credentials) {

    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {

    return this.currentUser;
  }
 
  public logout() {

    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}