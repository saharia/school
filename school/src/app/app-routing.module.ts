import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubjectComponent } from './subject/subject.component';
import { DepartmentComponent } from './department/department.component';
import { StudentComponent } from './student/student.component';
import { SubjectResolver } from './shared/resolver/subject.resolver';
import { StudentResolver } from './shared/resolver/student.resolver';
import { RegisterResolver } from './shared/resolver/register.resolver';
import { DepartmentResolver } from './shared/resolver/department.resolver';
import { AuthGuard } from './shared/auth/auth.guard';
import { GuestGuard } from './shared/auth/guest.guard';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeResolver } from './shared/resolver/home.resolver';
import { AuthComponent } from './auth/auth.component';
import { StaffComponent } from './staff/staff.component';
import { StaffResolver } from './shared/resolver/staff.resolver';
import { MarkComponent } from './mark/mark.component';
import { MarkResolver } from './shared/resolver/mark.resolver';

const routes: Routes = [
    { path: 'auth', canActivate: [ GuestGuard ], component: AuthComponent, children: [
      { path: 'login', canActivate: [ GuestGuard ], component: LoginComponent },
      { path: 'register', canActivate: [ GuestGuard ], component: SignupComponent, resolve: { data: RegisterResolver } },
    ] },
    { path: 'subject', canActivate: [ AuthGuard ], component: SubjectComponent, resolve: { data: SubjectResolver }, data: { role: [ "staff", "admin" ] } },
    { path: 'department', canActivate: [ AuthGuard ], component: DepartmentComponent, resolve: { data: DepartmentResolver }, data: { role: [ "staff", "admin" ] } },
    { path: '', pathMatch: 'full', canActivate: [ AuthGuard ], component: HomeComponent, resolve: { data: HomeResolver } },
    { path: 'student', canActivate: [ AuthGuard ], component: StudentComponent, resolve: { data: StudentResolver }, data: { role: [ "staff", "admin" ] } },
    { path: 'staff', canActivate: [ AuthGuard ], component: StaffComponent, resolve: { data: StaffResolver }, data: { role: [ "admin" ] } },
    { path: 'mark', canActivate: [ AuthGuard ], component: MarkComponent, resolve: { data: MarkResolver }, data: { role: [ "admin", "staff" ] } },
    { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent, resolve: { data: HomeResolver } },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }