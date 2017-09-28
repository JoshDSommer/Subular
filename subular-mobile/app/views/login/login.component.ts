import { Component, OnInit } from '@angular/core';
import { SubsonicAuthenticationService, SubsonicService } from 'subular';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {


	constructor(private subsonic: SubsonicService, private authentication: SubsonicAuthenticationService, private router: Router) { }

	ngOnInit() {
		this.subsonic.pingServer().subscribe(authenticated => {
			if (authenticated) {
				//this.router.navigate(['/app'])
			}
		});
	}

	submitLogin(server, username, password) {
		this.authentication.saveAuthenticationInfo(server, username, password);

		this.subsonic.pingServer().subscribe(authenticated => {
			console.log('AUTHENTICATEDAADFASD ', authenticated)
			if (authenticated) {
				this.router.navigate(['/app'])
			}
		}, failed => {
			// todo replace with something like ngx-toastr
		});

	}
}