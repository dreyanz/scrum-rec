import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HTTP) { }

  getUpdates(userId: string) : Promise<any> {
    return this.http.get("https://612480656f375a001756eec6.mockapi.io/updates", {}, {})
  }

  saveUpdate(data) : Promise<HTTPResponse> {
    return this.http.post("", {}, {});
  }

}
