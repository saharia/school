import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SubjectService } from '../services/subject.service';


@Injectable({
  providedIn: 'root'
})
export class SubjectResolver implements Resolve<any> {
  constructor(private _subjectService: SubjectService) { 
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._subjectService.getAll();
  }
}