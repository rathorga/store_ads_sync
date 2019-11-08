import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class AuthService {
  private authState$: Observable<firebase.User>;
  private currentUser:
      firebase.User = null;
  getStoreAdsUser$ = new BehaviorSubject({user: {}, loggedIn: false});

  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    this.afAuth.authState.subscribe(this.navigateBasedOnLoginStatus.bind(this));
  }

  navigateBasedOnLoginStatus(user) {
      if (user && user.emailVerified) {
        this.getUserFromStoreAdsDb(user);
      } else {
        this.getStoreAdsUser$.next({user: user, loggedIn: false});
        this.router.navigate(['login']);
      }
    }

  getUserFromStoreAdsDb(user) {
    const userObs$ = this.afs.doc(`users/${user.uid}`);
    userObs$.valueChanges().subscribe((data: any) => {
      if (data && data.role) {
        user.role = data.role;
        user.brand = data.brand;
        this.getStoreAdsUser$.next({user: user, loggedIn: true});
      } else {
        this.addUserToStoreAdsDb(user);
      }
    })
  }

  addUserToStoreAdsDb(user) {
    const userscollection = this.afs.collection('users');
      userscollection.doc(user.uid).set({
      brand: 'coke',
      email: user.email,
      name: user.displayName,
      role: 'Advertiser',
    });
  }

  // getAuthState() {
  //   return this.authState$;
  // }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider());
  }
}
