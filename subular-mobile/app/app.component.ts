import { Component } from "@angular/core";
import { SubsonicAuthenticationService } from 'subular';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    providers: [SubsonicAuthenticationService]
})

export class AppComponent {
    constructor(private subsonicAuthenticationService: SubsonicAuthenticationService) {
        console.log(subsonicAuthenticationService.test);
    }
}
