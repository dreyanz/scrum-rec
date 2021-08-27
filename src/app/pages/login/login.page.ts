import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { LoginCred } from 'src/app/shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credential : LoginCred = {
    emailAddress: "",
    password: ""
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fireStorage: FireStorageService,
  ) { }

  ngOnInit() {
    this.authenticationService.signOut();
  }

  login() {
    console.log(JSON.stringify(this.credential));
    this.authenticationService.signInWithEmailPass(this.credential.emailAddress, 
      this.credential.password)
      .then((data)=>{
        this.credential = {emailAddress: "", password: ""};
        console.log("display name ", data.user.displayName);
        this.redirectToHome(data);
      },(error)=>{
        alert("invalid credential");
        console.log("error signing in", JSON.stringify(error));
      })
  }

  redirectToHome(user) {

    this.fireStorage.getUserData(user.user.uid).subscribe((data)=> {
      
      console.log(data.payload.data());

      let navigationExtras: NavigationExtras = {
        queryParams: {
          displayName: data.payload.data()["displayName"]
        }
      };
  
      this.router.navigate(['/home'], navigationExtras);
    })

    
  }

  register() {
    this.router.navigate(['/register']);
  }
}
