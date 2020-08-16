import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../shared/services/department.service';
import { SubjectService } from '../shared/services/subject.service';
import { StudentService } from '../shared/services/student.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  form: FormGroup;
  departments: any = [];
  constructor(private _departmentService: DepartmentService,
    private _subjectService: SubjectService,
    private _studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      
     }

  ngOnInit(): void {
    this.departments = this.route.snapshot.data.data.department;
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required])
    });
  }

  save() {
    this._departmentService.save(this.form.value).subscribe(
      (result:any) => {
        this.departments.push(result);
        this.form.reset();
      },
      error => {

      }
    );
  }
}
