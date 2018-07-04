import { Component } from '@angular/core';
import { SubsonicService } from '@Subular/core';
@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private sub: SubsonicService) {
    console.log(this.sub);
  }
}
