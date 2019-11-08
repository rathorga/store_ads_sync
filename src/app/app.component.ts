import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
// import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs';

import {AuthService} from './shared/auth.service';

var VIEW_CONFIG = {
  'Advertiser': {
    'title': 'Upload creative',
    'sidebarItems': [
      {
        'label': 'Upload creative',
        'routerLink': 'admin',
        'icon': 'star',
      },
    ],
  },
  'Partner': {
    'title': 'Create Package',
    'sidebarItems': [
      {
        'label': 'Create Package',
        'routerLink': 'partner',
        'icon': 'star',
      },
    ],
  }
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
    this.auth.getStoreAdsUser$.subscribe((userData) => {
      if (!userData.loggedIn) {
        return;
      }
      this.user = userData.user;
      this.setUpViewForUser(userData.user);
      this.router.navigate(['admin']);
    });
  }

  setUpViewForUser(user) {
    var role = user['role'];
    if (role == 'Advertiser') {
      this.viewConfig = VIEW_CONFIG[role];
    } else if (role == 'Partner') {
      this.viewConfig = VIEW_CONFIG[role];
    }
  }
}
