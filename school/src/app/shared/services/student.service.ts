import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  save(data) {
    // console.log(environment);
    let url = `${environment.apiUrl}users/student/create`;
    return this.http.post(url, data);
  }

  delete(id) {
    let url = `${environment.apiUrl}users/student/delete/${id}`;
    return this.http.delete(url);
  }

  saveStaff(data) {
    // console.log(environment);
    let url = `${environment.apiUrl}users/staff/create`;
    return this.http.post(url, data);
  }

  deleteStaff(id) {
    // console.log(environment);
    let url = `${environment.apiUrl}users/staff/delete/${id}`;
    return this.http.delete(url);
  }

  getAll() {
    // console.log(environment);
    let url = `${environment.apiUrl}users/students`;
    return this.http.get(url).pipe(
      catchError((error) => {
      return empty();
      }));
  }

  getAllStaff() {
    // console.log(environment);
    let url = `${environment.apiUrl}users/staffs`;
    return this.http.get(url).pipe(
      catchError((error) => {
      return empty();
      }));
  }

  getHome() {
    // console.log(environment);
    let url = `${environment.apiUrl}users/home`;
    return this.http.get(url).pipe(
      catchError((error) => {
      return empty();
      }));
  }

  getRegisterDetails() {
    // console.log(environment);
    let url = `${environment.apiUrl}users/registerDetails`;
    return this.http.get(url).pipe(
      catchError((error) => {
      return empty();
      }));
  }
}
