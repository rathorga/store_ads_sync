import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../shared/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user = {};

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getAuthState().subscribe((user) => {
      if (user && user.emailVerified) {
        this.user = user;
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
