import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UpdateData } from 'src/app/shared/user';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss'],
})
export class UpdateItemComponent implements OnInit {

  @Input() updateData;

  @Output() editSelected = new EventEmitter<any>();
 
  constructor() {
    if(this.updateData === null){
      this.updateData = {
        didDo: "",
        plan: "",
        blockers: "",
        date: ""
      }
    }
  }

  ngOnInit() {}

  editClicked() {
    console.log("edit clicked");
    this.editSelected.next(this.updateData);
  }

}
