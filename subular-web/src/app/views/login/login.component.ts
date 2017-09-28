import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubsonicAuthenticationService } from '../../../subular-shared/subsonic-authentication.service';
import { SubsonicService } from '../../../subular-shared/subsonic.service';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

	public loginForm = this.formBuilder.group({
		server: ["", Validators.required],
		username: ["", Validators.required],
		password: ["", Validators.required]
	});

	constructor(public formBuilder: FormBuilder, private subsonic: SubsonicService, private authentication: SubsonicAuthenticationService, private router: Router) { }

	ngOnInit() {
		this.subsonic.pingServer().subscribe(authenticated => {
			if (authenticated) {
				this.router.navigate(['/app'])

			}
		});
	}

	submitLogin(event) {
		this.authentication.saveAuthenticationInfo(this.loginForm.value.server, this.loginForm.value.username, this.loginForm.value.password);

		this.subsonic.pingServer().subscribe(authenticated => {
			if (authenticated) {
				this.router.navigate(['/app'])
			}
		}, failed => {
			// todo replace with something like ngx-toastr
			window.alert('Login failed');
		});

	}
}