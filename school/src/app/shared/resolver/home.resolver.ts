import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StudentService } from '../services/student.service';


@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<any> {
  authUser: any;
  constructor(private _studentService: StudentService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._studentService.getHome();
  }
}