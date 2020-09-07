import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule}  from '@angular/material/button';
import { LoginComponent } from './login/login.component'
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AngularMaterialModule } from './material/material-module';
import {UsersService } from './services/users.service';
import {UserCheckAuthenticationService } from './services/user-check-authentication.service';
import { ActivateGuard } from './_guard/activate.guard';
import { ActivatechildGuard } from './_guard/activatechild.guard';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationVerifyComponent } from './registration-verify/registration-verify.component';
import { GuestsSignupComponent } from './guests-signup/guests-signup.component';
import { AdmitLayoutComponent } from './_layout/admit-layout/admit-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListGuestComponent } from './list-guest/list-guest.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationVerifyComponent,
    GuestsSignupComponent,
    AdmitLayoutComponent,
    AdminDashboardComponent,
    ListGuestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AngularMaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes),
  ],
  entryComponents: [],

  providers: [CookieService,UsersService,UserCheckAuthenticationService, ActivatechildGuard,
    ActivateGuard,{ provide: LocationStrategy, useClass: PathLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
