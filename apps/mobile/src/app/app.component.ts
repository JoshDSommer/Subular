import { Component } from '@angular/core';
import { SubsonicAuthenticationService } from '@Subular/core';
import { ARTIST_LIST_CACHE_KEY } from './views/subular-app/artist-list/artist-list.component';
import { setNumber } from 'tns-core-modules/application-settings';

@Component({
  moduleId: module.id,
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor() {
    setNumber(ARTIST_LIST_CACHE_KEY, 0);
  }
}
