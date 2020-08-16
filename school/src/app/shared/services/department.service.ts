import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  save(data) {
    // console.log(environment);
    let url = `${environment.apiUrl}departments/create`;
    return this.http.post(url, data);
  }

  getAll() {
    // console.log(environment);
    let url = `${environment.apiUrl}departments`;
    return this.http.get(url).pipe(
      catchError((error) => {
      return empty();
      }));;
  }
}
