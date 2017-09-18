import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

	constructor(public formBuilder: FormBuilder) { }

	submitLogin(event) {
		console.log(event);
		console.log(this.loginForm.value);
	}
}