import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private loginUrl = 'https://connectmedev.onpassive.com/connectme/authenticate';

  constructor(
    private http: HttpClient
    ,private store: Store<any>
    ,private route: ActivatedRoute
  ) { }



  login(params) {
    // console.log(environment);
    let url = environment.apiUrl + 'users/login';
    return this.http.post(url, params);
  }

  register(params) {
    // console.log(environment);
    let url = environment.apiUrl + 'users/register';
    return this.http.post(url, params);
  }

  getUserDetails () {
    return this.store.select('appReducer');
  }

  
  updateState (obj) {
    this.store.dispatch({
      type: obj.action,
      payload: obj.payload
    })
  }

  isLoggedIn(): Promise<any> {
    let url = environment.apiUrl + 'users/authDetails';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
