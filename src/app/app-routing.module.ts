import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {PartnerComponent} from './partner/partner.component';


const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'partner', component: PartnerComponent},
];

@NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
export class AppRoutingModule {
}
