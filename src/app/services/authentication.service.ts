import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { User } from '../shared/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: firebase.User;


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

    getLoggedInUser() : firebase.User {
      return this.userData;
    }

    signInWithEmailPass(email, password) {
      return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    registerUser(userInfo : User) {
      return this.ngFireAuth.auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    }

    setUserData(user) {
      const userRef: AngularFirestoreDocument <any> = this.afStore.doc(`users/${user.uid}`);
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: "",
        emailVerified: false
      }

      console.log("userRef ", userRef);
      return userRef.set(userData, {
        merge: true
      })
    }
  
     IsLoggedIn(): Promise<boolean> {

        return new Promise((resolve, reject) =>
          {
            this.ngFireAuth.auth.onAuthStateChanged(
              user => {
                if (user) {
                  console.log("user is signed in");
                  // User is signed in.
                  resolve(true)
                } else {
                  console.log("user is not signed in");
                  this.router.navigate(['/login'])
                  // No user is signed in.
                  resolve(false)
                }
              },
              // Prevent console error
              error => resolve(false)
            )
          }
        )
      
    }

    signOut() {
      return this.ngFireAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        //this.router.navigate(['login']);
      })
    }
    
}
