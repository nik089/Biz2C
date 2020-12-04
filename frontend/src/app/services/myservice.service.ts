import { Injectable } from '@angular/core';
import{ URL } from '../url';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor(private http: HttpClient) { }

  regData(data) {
    return this.http.post(`${URL}registration`, data);
  }
  logIn(data) {
    return this.http.post(`${URL}userlogin`, data);
  }
  createnewData(data)
  {
    return this.http.post(`${URL}createnewuser`, data);

  }
  newuserData() {
    return this.http.get(`${URL}userlist`);
  }
  delData(data) {
    return this.http.post(`${URL}datadelete`, data);
  }
  
  editData(data) {
    return this.http.post(`${URL}dataedit`, data);
  }

}
