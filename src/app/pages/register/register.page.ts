import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userInfo : User = {
    email: "",
    displayName: "",
  }

  constructor(
    private authenticationService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  register() {
    console.log("user info ", this.userInfo);
    this.authenticationService.registerUser(this.userInfo).then((data)=>{
      if(data){
        this.userInfo.uid = data.user.uid;
        this.authenticationService.setUserData(this.userInfo).then((data)=> {
          console.log("saving to db ", data);
          this.location.back();
        }, (error) => {
          console.log("error saving db ", error );
        })
      }
    },(error)=> {
      console.log("error registering ", error);
    })
  }

}
