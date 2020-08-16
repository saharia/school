import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http: HttpClient) { }

  save(data) {
    // console.log(environment);
    let url = `${environment.apiUrl}marks/create`;
    return this.http.post(url, data);
  }

  delete(id) {
    let url = `${environment.apiUrl}marks/delete/${id}`;
    return this.http.delete(url);
  }


  getAll() {
    // console.log(environment);
    let url = `${environment.apiUrl}marks`;
    return this.http.get(url).pipe(
      catchError((error) => {
      return empty();
      }));
  }

}
