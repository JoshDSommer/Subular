import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubsonicAuthenticationService } from '../../../shared-services/index';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.css']
})
export class LoginComponent {

	public loginForm = this.formBuilder.group({
		server: ["", Validators.required],
		username: ["", Validators.required],
		password: ["", Validators.required]
	});

	constructor(public formBuilder: FormBuilder, private subsonicAuthenticationService: SubsonicAuthenticationService, private router: Router) { }

	submitLogin(event) {
		console.log(event);
		console.log(this.loginForm.value);
		this.subsonicAuthenticationService.saveAuthenticationInfo(this.loginForm.value.server, this.loginForm.value.username, this.loginForm.value.password);
		this.router.navigate(['/app'])
	}
}