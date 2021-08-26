import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;

  constructor(
        public afStore: AngularFirestore,
        public ngFireAuth: AngularFireAuth,
        public router: Router,  
        public ngZone: NgZone ) {

      this.ngFireAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
    
    }

    signInWithEmailPass(email, password) {
      return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    registerUser(email, password ) {
      return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }
}
