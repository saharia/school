import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MarkService } from '../services/mark.service';


@Injectable({
  providedIn: 'root'
})
export class MarkResolver implements Resolve<any> {
  authUser: any;
  constructor(private _markService: MarkService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._markService.getAll();
  }
}