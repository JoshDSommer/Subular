import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	providers: [AuthenticationService]
})
export class AppComponent {
	title = 'app works!';

	constructor() {
	}
}
