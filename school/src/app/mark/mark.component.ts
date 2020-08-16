import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../shared/services/department.service';
import { SubjectService } from '../shared/services/subject.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { MarkService } from '../shared/services/mark.service';
import { StudentService } from '../shared/services/student.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  form: FormGroup;
  id: String = null;
  marks: any = [];
  subjects: [] = [];
  students: [] = [];
  constructor(private _departmentService: DepartmentService,
    private _studentService: StudentService,
    private _subjectService: SubjectService,
    private route: ActivatedRoute,
    private _markService: MarkService,
    private formBuilder: FormBuilder) { 
      
      this._subjectService.getAll().subscribe((response:any) => {
        this.subjects = response.subject;
      });

      this._studentService.getAll().subscribe((response:any) => {
        console.log(response);
        this.students = response.students;
      });
  }

  ngOnInit(): void {
    this.marks = this.route.snapshot.data.data.mark;
    this.form = this.formBuilder.group({
      mark: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      student: new FormControl('', [Validators.required]),
    });
  }

  edit(data) {
    this.id = data._id;
    let formData = {
      mark: data.mark,
      subject: data.subject._id,
      student: data.student._id
    };
    this.form.setValue(formData);
  }

  delete(data) {
    if(confirm('Are u sure to delete?')) {
      this._markService.delete(data._id).subscribe(
        (result:any) => {
          let index = this.marks.findIndex(student => student._id == data._id );
          this.marks.splice(index, 1);
        },
        error => {
  
        }
      );
    }
  }

  save() {
    let data = this.form.value;
    data.id = this.id;
    this._markService.save(data).subscribe(
      (result:any) => {
        if(this.id) {
          let index = this.marks.findIndex(staff => staff._id == this.id );
          this.marks[index] = result;
        } else {
          this.marks.push(result);
        }
        this.id = null;
        this.form.reset();
      },
      error => {

      }
    );
  }

}
