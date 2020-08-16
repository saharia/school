import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/auth/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscriber: any = {};
  data: [] = [];
  authUser: any = null;

  constructor(private auth: AuthenticationService,
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

  ngOnInit(): void {
    this.data = this.route.snapshot.data.data.data;
  }

}
