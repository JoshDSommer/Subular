import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule, PasswordModule, ButtonModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { SubularBrandComponent } from './components/subular-brand/subular-brand.component';

import { SubsonicAuthenticationService } from '../shared-services';
import { LOCALSTORAGE_SERVICE } from './providers/localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubularBrandComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule
  ],
  providers: [
    LOCALSTORAGE_SERVICE,
    SubsonicAuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
