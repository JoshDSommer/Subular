import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { SubularCoreModule } from '@Subular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HeartComponent } from './heart/heart.component';
import { SongListHeaderComponent } from './song-list-header/song-list-header.component';
import { ArtistImageComponent } from './artist-image/artist-image.component';

const COMPONENTS = [
  HeartComponent,
  SongListHeaderComponent,
  ArtistImageComponent
];

@NgModule({
  imports: [
    SubularCoreModule,
    NativeScriptModule,
    NativeScriptHttpModule,
    HttpClientModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class ComponentModule {}
