import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    console.log(JSON.stringify(this.credential));
    this.authenticationService.signInWithEmailPass(this.credential.emailAddress, 
      this.credential.password)
      .then((data)=>{
        console.log(data.user.uid);
        this.router.navigate(['/home']);
      },(error)=>{
        alert("invalid credential");
        console.log("error signing in", JSON.stringify(error));
      })
  }
}
