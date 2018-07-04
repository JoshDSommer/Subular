import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { SubularCoreModule } from '@Subular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), SubularCoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
