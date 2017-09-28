import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { NativeScriptUISideDrawerModule } from 'nativescript-telerik-ui/sidedrawer/angular/side-drawer-directives';

import { LOCALSTORAGE_PROVIDER, SubularSharedModule } from 'subular';

import { LOCALSTORAGE_SERVICE } from './providers/localstorage.service';
import { MD5_SERVICE } from './providers/md5.service';
import { LoginComponent } from './views/login/login.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { SubularAppComponent } from './views/subular-app/subular-app.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        SubularSharedModule.forRoot(LOCALSTORAGE_SERVICE, MD5_SERVICE),
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SubularAppComponent
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA

    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
