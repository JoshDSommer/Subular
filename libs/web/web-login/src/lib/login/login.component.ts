import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SubsonicHealthCheckService,
  SubsonicAuthenticationService
} from '@subular3/subsonic-api';

@Component({
  selector: 'subular3-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = this.formBuilder.group({
    server: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    public formBuilder: FormBuilder,
    private subsonicHealthCheck: SubsonicHealthCheckService,
    private authentication: SubsonicAuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subsonicHealthCheck.pingServer().subscribe(authenticated => {
      if (authenticated) {
        const link = [
          'app',
          {
            outlets: {
              lists: ['artists']
            }
          }
        ];
        this.router.navigate(link);
      }
    });
  }

  submitLogin(event) {
    this.authentication.saveAuthenticationInfo(
      this.loginForm.value.server,
      this.loginForm.value.username,
      this.loginForm.value.password
    );

    this.subsonicHealthCheck.pingServer().subscribe(
      authenticated => {
        if (authenticated) {
          this.router.navigate(['/app']);
        }
      },
      failed => {
        // todo replace with something like ngx-toastr
        window.alert('Login failed');
      }
    );
  }
}
