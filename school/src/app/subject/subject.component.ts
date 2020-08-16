import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../shared/services/department.service';
import { SubjectService } from '../shared/services/subject.service';
import { StudentService } from '../shared/services/student.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  form: FormGroup;
  subjects: any = [];
  constructor(private _departmentService: DepartmentService,
    private _subjectService: SubjectService,
    private _studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      
    }

 ngOnInit(): void {
  this.subjects = this.route.snapshot.data.data.subject;
   this.form = this.formBuilder.group({
     name: new FormControl('', [Validators.required])
   });
 }

 save() {
   this._subjectService.save(this.form.value).subscribe(
     (result:any) => {
      this.subjects.push(result);
       this.form.reset();
     },
     error => {

     }
   );
 }

}
