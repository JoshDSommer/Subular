import { Component } from '@angular/core';
import { SubsonicAuthenticationService } from '@Subular/core';
import { ARTIST_LIST_CACHE_KEY } from './views/subular-app/artist-list/artist-list.component';
import { setNumber } from 'application-settings';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {
    constructor() {
        setNumber(ARTIST_LIST_CACHE_KEY, 0)
    }
}
