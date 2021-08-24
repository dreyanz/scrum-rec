import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { CalendarComponent, CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';

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

  constructor(
    private nativeStorage: NativeStorage,
    private router: Router
  ) {

  }

  onChange($event) {
    this.selectedDate = $event.format("YYYY-MM-DD");
    let now = moment(moment().format("YYYY-MM-DD"));
    
    let selected = moment(this.selectedDate);

    console.log(now);
    console.log(selected);

    if(now.isSame(selected)){
      console.log("yes");

    }else{
      console.log("no");
    }
    
    this.isTodaySelected = now.isSame(selected);
  }

  goToAddEntry(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        date: this.selectedDate 
      }
    };
    this.router.navigate(['/add-entry'], navigationExtras);
  }

}
