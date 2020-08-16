import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DepartmentService } from '../services/department.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentResolver implements Resolve<any> {
  authUser: any;
  constructor(private _departmentService: DepartmentService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._departmentService.getAll();
  }
}