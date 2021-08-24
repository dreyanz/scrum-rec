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
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { 
    this.route.queryParams.subscribe((params)=>{
      if(params && params.date){
        this.date = params.date;
        console.log("date is", this.date);
      }
    });
  }

  ngOnInit(){
    
  }
  
  save(){
    console.log(this.updateForm.value);
    console.log("selected date", this.date);
    this.storageService.saveData(this.date, this.updateForm.value);
  }
}
