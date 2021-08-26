import { Component, OnInit } from '@angular/core';
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

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {
    console.log("user info ", this.userInfo);
    this.authenticationService.registerUser(this.userInfo).then((data)=>{
      if(data){
        this.userInfo.uid = data.user.uid;
        this.authenticationService.setUserData(this.userInfo).then((data)=> {
          console.log("saving to db ", data);
        }, (error) => {
          console.log("error saving db ", error );
        })
      }
    },(error)=> {
      console.log("error registering ", error);
    })
  }

}
