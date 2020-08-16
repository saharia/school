import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { DepartmentComponent } from './department/department.component';
import { StudentComponent } from './student/student.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/store/reducers';
import { TokenInterceptorService } from './shared/auth/token-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { StaffComponent } from './staff/staff.component';
import { MarkComponent } from './mark/mark.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    DepartmentComponent,
    StudentComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AuthComponent,
    StaffComponent,
    MarkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
