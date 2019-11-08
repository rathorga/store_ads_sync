import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
  private authState$: Observable<firebase.User>;
  private currentUser:
      firebase.User = null;
  storeAdsUser$ = new BehaviorSubject({user: {}, loggedIn: false});

  constructor(public afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
  }

  getAuthState() {
    return this.authState$;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider());
  }
}
