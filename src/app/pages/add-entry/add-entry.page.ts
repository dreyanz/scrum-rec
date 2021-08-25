import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

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
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private storageService: StorageService
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
  }
}
