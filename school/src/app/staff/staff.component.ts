import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from '../shared/services/department.service';
import { SubjectService } from '../shared/services/subject.service';
import { StudentService } from '../shared/services/student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  form: FormGroup;
  id: String = null;
  @Input() staffs: any = [];
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
    let routeData = this.route.snapshot.data.data.staffs;
    if(routeData && Array.isArray(routeData)) {
      this.staffs = routeData;
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
          let index = this.staffs.findIndex(student => student._id == data._id );
          this.staffs.splice(index, 1);
        },
        error => {
  
        }
      );
    }
  }

  save() {
    let data = this.form.value;
    data.id = this.id;
    this._studentService.saveStaff(data).subscribe(
      (result:any) => {
        if(this.id) {
          let index = this.staffs.findIndex(staff => staff._id == this.id );
          this.staffs[index] = result;
        } else {
          this.staffs.push(result);
        }
        this.id = null;
        this.form.reset();
      },
      error => {

      }
    );
  }

}
