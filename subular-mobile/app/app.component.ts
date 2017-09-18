import { Component } from "@angular/core";
import { SubsonicAuthenticationService } from 'subular';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    constructor(private subsonicAuthenticationService: SubsonicAuthenticationService) {

    }
}
