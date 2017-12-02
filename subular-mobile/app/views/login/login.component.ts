import { Component, OnInit } from '@angular/core';
import { SubsonicAuthenticationService, SubsonicService, SUBULAR_CACHED_ARTISTS, SUBULAR_CACHED_ALBUMS } from 'subular';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { setString } from 'tns-core-modules/application-settings/application-settings';

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
				setString(SUBULAR_CACHED_ARTISTS, '');
				setString(SUBULAR_CACHED_ALBUMS, '');
				this.redirectToMainApplication();
			}
		}, failed => {

		});
	}

	redirectToMainApplication() {
		this.router.navigate(['/app/artists'], { clearHistory: true });
	}
}