import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private nativeStorage: NativeStorage) { 

  }

  saveData(key, value) {
    this.nativeStorage.setItem(key, value);
  }  

  getData(key) {
    this.nativeStorage.getItem(key).then((data) => {
      console.log(data);
    }
    )
  }

}
