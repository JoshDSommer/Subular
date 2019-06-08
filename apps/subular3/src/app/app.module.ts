import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SubsonicApiModule } from '@subular3/subsonic-api';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SubsonicApiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
