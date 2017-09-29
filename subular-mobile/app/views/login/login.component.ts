import { Component, OnInit } from '@angular/core';
import { SubsonicAuthenticationService, SubsonicService } from 'subular';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {


	constructor(private subsonic: SubsonicService,
		private authentication: SubsonicAuthenticationService,
		private router: RouterExtensions
	) { }

	ngOnInit() {
		this.subsonic.pingServer().subscribe(authenticated => {
			if (authenticated) {
				this.redirectToMainApplication();
			}
		});
	}

	submitLogin(server, username, password) {
		this.authentication.saveAuthenticationInfo(server, username, password);

		this.subsonic.pingServer().subscribe(authenticated => {
			if (authenticated) {
				this.redirectToMainApplication();
			}
		}, failed => {

		});
	}

	redirectToMainApplication() {
		this.router.navigate(['/app/artists'], { clearHistory: true });
	}
}