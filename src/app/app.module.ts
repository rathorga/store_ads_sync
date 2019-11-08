import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import {environment} from '../environments/environment';

import {AdminComponent} from './admin/admin.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import { PartnerComponent } from './partner/partner.component';


@NgModule({
  declarations: [AppComponent, AdminComponent, LoginComponent, PartnerComponent],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSidenavModule,
    MatIconModule, MatToolbarModule, MatListModule, MatCardModule, FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, AngularFireDatabaseModule, MatButtonModule,
    CommonModule, MatFormFieldModule, MatInputModule, AngularFireStorageModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
