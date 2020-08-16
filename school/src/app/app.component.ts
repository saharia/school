import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ACTION_LOGOUT } from './shared/store/actions/appActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'student';
  authUser: any = null;
  pageData: any;
  subscriber: any = {};

  constructor(private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) {
    
    this.subscriber['userDetails'] = this.auth.getUserDetails().subscribe(state => {
      let data = state && state.login ? state.user : null;
      // console.log(data);
      if(data) {
        var copy = Object.assign({}, data);
        this.authUser = copy;
      }
    });

    
  }

  ngOnInit() {
  }

  logout() {
    this.auth.updateState({
      action: ACTION_LOGOUT,
      payload: null
    });
    this.auth.logout();
    // this.router.navigate(['/auth/login']);
    window.location.href = 'auth/login';
  }
}
