import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule, PasswordModule, ButtonModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { SubularBrandComponent } from './components/subular-brand/subular-brand.component';

import { SubsonicAuthenticationService } from '../shared-services/subsonic-authentication.service';
import { SubsonicService } from '../shared-services/subsonic.service';
import { LOCALSTORAGE_SERVICE } from './providers/localstorage.service';
import { SubularAppComponent } from './views/subular-app/subular-app.component';
import { RandomAlbumsComponent } from './views/random-albums/random-albums.component';
import { HttpModule } from '@angular/http';
import { SharedServicesModule } from '../shared-services/shared-services.module';
import { ArtistListComponent } from './components/artist-list/artist-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistListComponent,
    LoginComponent,
    RandomAlbumsComponent,
    SubularBrandComponent,
    SubularAppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    HttpModule,
    PasswordModule,
    ReactiveFormsModule,
    SharedServicesModule
  ],
  providers: [
    LOCALSTORAGE_SERVICE,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
