import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class OkeDeploymentService {
  localhost_URL: any;
  httpOptions: any;
  constructor(public http: HttpClient) {
    console.log('backend service');
    this.localhost_URL = 'http://localhost:3000';
    const headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
   

  }


  uploadOciKey(file): Observable<any> {
    console.log('file upload', file);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data'
      })
    };
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData, this.httpOptions);
    return this.http.post(`${this.localhost_URL}/api/upload`, formData);
  }


}
