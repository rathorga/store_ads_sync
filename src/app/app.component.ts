import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
// import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs';

import {AuthService} from './shared/auth.service';

var VIEW_CONFIG = {
  'advertiser': {
    'title': 'Upload creative',
    'sidebarItems': [
      {
        'label': 'Upload creative',
        'routerLink': 'admin',
        'icon': 'star',
      },
    ],
  }
};

var loggedInUser = {
  'userName': 'rathor@google.com',
  'role': 'advertiser',
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
      private auth: AuthService,
      public db: AngularFireDatabase,
      private router: Router,
  ) {}

  title = 'store-ads-cms';
  viewConfig = {};
  user = {};

  ngOnInit() {
    this.auth.getAuthState().subscribe((user) => {
      if (user && user.emailVerified) {
        this.user = user;
        // this.router.navigate(['admin']);
        this.setUpViewForUser(loggedInUser);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  setUpViewForUser(user) {
    var role = user['role'];
    if (role == 'advertiser') {
      this.viewConfig = VIEW_CONFIG[role];
    }
  }
}
