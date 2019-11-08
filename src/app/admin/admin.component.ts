import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: any = {};
  dealId = '';
  fileName = '';
  invalidForm = false;
  selectedFile:any = {};
  uploadPercent!:number;
  showLoader = false;

  constructor(private auth: AuthService, private router: Router, private fs: AngularFireStorage) {}

  ngOnInit() {
    this.auth.getStoreAdsUser$.subscribe((userData) => {
      if (!userData.loggedIn) {
        return;
      }
      this.user = userData.user;
    });
  }

  grabImage(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.dealId || !this.fileName) {
      this.invalidForm = true;
      return;
    }
    if (this.selectedFile && this.selectedFile.name) {
      this.showLoader = false;
      const filePath = `images/${this.user.brand}/${this.selectedFile.name}`;
      const fileRef = this.fs.ref(filePath);
      const task = this.fs.upload(filePath, this.selectedFile);
      task.percentageChanges().subscribe((percentage) => {
        this.uploadPercent = percentage;
        if (percentage < 100) {
          this.showLoader = true;
        }
        if(percentage == 100) {
          this.showLoader = false;
          this.dealId = '';
          this.fileName = '';
          this.invalidForm = false;
        }
      });
    }
  }
}
