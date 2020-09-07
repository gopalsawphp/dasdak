import { Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { ActivatechildGuard } from './_guard/activatechild.guard'
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationVerifyComponent } from './registration-verify/registration-verify.component';
import { GuestsSignupComponent } from './guests-signup/guests-signup.component';
import { AdmitLayoutComponent } from './_layout/admit-layout/admit-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListGuestComponent } from './list-guest/list-guest.component';
export const AppRoutes: Routes = [
  {
    path: 'admin',
  canActivateChild: [ActivatechildGuard],
    component: AdmitLayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'guest-details/:id', component: ListGuestComponent },
    ],
  },



  { path: '', redirectTo: '/guest-signup', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'signup-verify', component: RegistrationVerifyComponent },
  { path: 'guest-signup', component: GuestsSignupComponent },
 { path: '**', component: GuestsSignupComponent },
];
