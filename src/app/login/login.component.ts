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

    // console.log(users.get());

    // users.get().subscribe((data) => {
    //   data.forEach((entity) => console.log(entity));
    //   console.log('Docs', data.docs);
    // });

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
          this.getUserFromStoreAdsDb(user.user);
        },
        (e) => {console.log(
            'An error occurred, most probably signing again will fix this',
            e)});
  }


  getUserFromStoreAdsDb(user) {
    const userObs$ = this.afs.doc(`users/${user.uid}`);
    userObs$.valueChanges().subscribe((data: any) => {
      if (data && data.role) {
        // this.router.navigate(['admin']);
      } else {
        this.addUserToStoreAdsDb(user);
      }
    })
  }

  addUserToStoreAdsDb(user) {
    this.userscollection = this.afs.collection('users');
    this.userscollection.doc(user.uid).set({
      brand: 'coke',
      email: user.email,
      name: user.displayName,
      role: 'Advertiser',
    });
  }
}
