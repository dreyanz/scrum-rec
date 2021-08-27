import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CalendarComponent, CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';
import { ApiService } from '../../services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { UpdateData } from 'src/app/shared/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  today = new Date();
  firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  date: string;
  type: 'string';
  isTodaySelected: boolean = false;
  selectedDate: string;
  optionsMulti : CalendarComponentOptions = {
    from: this.firstDay,
    to: new Date()
  }

  selectedUpdateData : UpdateData = null;
  displayName: string = "";
  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.route.queryParams.subscribe((params)=>{
      if(params){
        this.displayName = params.displayName;
      }
    });
  }

  onChange($event) {
    this.selectedDate = $event.format("YYYY-MM-DD");
    let now = moment(moment().format("YYYY-MM-DD"));
    
    let selected = moment(this.selectedDate);
    
    this.isTodaySelected = now.isSame(selected);

    /*this.apiService.getUpdates("id").then((data)=>{
      console.log(JSON.parse(data.data));
    });*/

    this.storageService.getData(this.selectedDate).then((data)=>{
      console.log("update data ", data);
      if(data){
        this.selectedUpdateData = JSON.parse(JSON.stringify(data));
        this.selectedUpdateData.date = this.selectedDate;
      }
      else
        this.selectedUpdateData = null;
    });

  }

  goToAddEntry(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        date: this.selectedDate,
        isEdit: false
      }
    };
    this.router.navigate(['/add-entry'], navigationExtras);
  }

  editSelected($event){
    console.log("edit selected value ", $event);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        date: this.selectedDate,
        updateData: JSON.stringify($event),
        isEdit: true, 
      }
    };
    this.router.navigate(['/add-entry'], navigationExtras);
  }

  logout(){
    this.authenticationService.signOut().then(()=>{
      this.router.navigate(['/login']);
    });
  }

}
