import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from '../shared/services/department.service';
import { SubjectService } from '../shared/services/subject.service';
import { StudentService } from '../shared/services/student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  form: FormGroup;
  id: String = null;
  @Input() students: any = [];
  subjects: [] = [];
  departments: [] = [];
  constructor(private _departmentService: DepartmentService,
    private _subjectService: SubjectService,
    private route: ActivatedRoute,
    private _studentService: StudentService,
    private formBuilder: FormBuilder) { 
      this._subjectService.getAll().subscribe((response:any) => {
        this.subjects = response.subject;
      });

      this._departmentService.getAll().subscribe((response:any) => {
        this.departments = response.department;
      });
  }

  ngOnInit(): void {
    let routeData = this.route.snapshot.data.data.students;
    if(routeData && Array.isArray(routeData)) {
      this.students = routeData;
    }
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', []),
      password: new FormControl('', []),
      department: new FormControl('', [Validators.required]),
    });
  }

  edit(data) {
    this.id = data._id;
    let formData = {
      name: data.name,
      email: data.email,
      mobileNo: data.mobileNo,
      password: '',
      department: data.department._id
    };
    this.form.setValue(formData);
  }

  delete(data) {
    if(confirm('Are u sure to delete?')) {
      this._studentService.deleteStaff(data._id).subscribe(
        (result:any) => {
          let index = this.students.findIndex(student => student._id == data._id );
          this.students.splice(index, 1);
        },
        error => {
  
        }
      );
    }
  }

  save() {
    let data = this.form.value;
    data.id = this.id;
    this._studentService.save(data).subscribe(
      (result:any) => {
        if(this.id) {
          let index = this.students.findIndex(student => student._id == this.id );
          this.students[index] = result;
        } else {
          this.students.push(result);
        }
        this.id = null;
        this.form.reset();
      },
      error => {

      }
    );
  }

}
