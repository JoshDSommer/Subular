import { Injectable } from '@angular/core';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class SubsonicService {

	constructor(private authentication: SubsonicAuthenticationService, private http: Http) { }

	pingServer(): Observable<boolean> {
		return this.subsonicGet('ping')
			.map(data => data.subresp.status === 'ok')
			.catch(() => Observable.of(false));
	}

	subsonicGet(method: string, additionalParams?: string) {
		const url = additionalParams ? this.authentication.getServerURl(method) + additionalParams : this.authentication.getServerURl(method);
		return this.http.get(url)
			.map(response => response.json())
			.map(data => JSON.parse(JSON.stringify(data).replace('subsonic-response', 'subresp')));
	}
}