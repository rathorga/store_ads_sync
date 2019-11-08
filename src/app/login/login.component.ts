import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

import {AuthService} from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  storeAdsUser = {} as any;
  userscollection = {} as any;
  getUserDetails = new BehaviorSubject({name: '', ldap: ''});

  constructor(
      private auth: AuthService, private afs: AngularFirestore,
      private router: Router) {}

  ngOnInit() {
    var users = this.afs.collectionGroup('play_plans', ref => ref.where('deal_id', '==', '123'));

    const comments$ = this.afs.collectionGroup('play_plans', ref => ref.where('deal_id', '==', '123'))
                      .valueChanges();

    comments$.subscribe((data) => {
      console.log(data);
    })

  }

  loginWithGoogle() {
    const loginPromise = this.auth.loginWithGoogle();
    loginPromise.then(
        (user) => {
          this.auth.getUserFromStoreAdsDb(user.user);
        },
        (e) => {console.log(
            'An error occurred, most probably signing again will fix this',
            e)});
  }
}
