import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { StorageService } from 'src/app/services/storage.service';
import { UpdateData, User } from 'src/app/shared/user';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.page.html',
  styleUrls: ['./add-entry.page.scss'],
})
export class AddEntryPage implements OnInit {

  updateForm: FormGroup = new FormGroup({
    didDo: new FormControl(),
    plan: new FormControl(),
    blockers: new FormControl()
  })

  didDo: string = "";
  plan: string = "";
  blockers:string = "";
  date: string = "";

  isEdit = false;
  updateData = {
    didDo: "",
    plan: "",
    blockers: ""
  }

  title = "Add";

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private fireStorage: FireStorageService,
    private autenticationService: AuthenticationService
  ) { 
    this.route.queryParams.subscribe((params)=>{
      if(params){
        this.date = params.date;
        this.isEdit = params.isEdit;
        if(params.updateData){
          this.updateData = JSON.parse(params.updateData);
          this.title = "Update";
        }
        console.log("param update data", params.updateData)
      }
    });
  }

  ngOnInit(){
    
  }
  
  save(){
    console.log("data to be saved ", this.updateData);
    console.log("selected date", this.date);
    this.storageService.saveData(this.date, this.updateData);

    let user : User = {}
    let updateDate : UpdateData = {
      didDo: this.updateData.didDo,
      plan: this.updateData.plan,
      blockers: this.updateData.blockers,
      date: this.date
    }

    user.uid = this.autenticationService.getLoggedInUser().uid;

    console.log("update data")

    this.fireStorage.saveData(user, updateDate).then((data)=> {
      console.log("update data saved");
    }, (error)=> {
      console.log("error saving updates ", error);
    })
  }
}
