import { Injectable } from '@angular/core';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ISong } from '../interfaces';

@Injectable()
export class SubsonicService {

	constructor(private authentication: SubsonicAuthenticationService, private http: Http) { }

	pingServer(): Observable<boolean> {
		return this.subsonicGet('ping')
			.map(data => data.subresp.status === 'ok')
			.catch(() => Observable.of(false));
	}

	getSongs(albumId: number): Observable<ISong[]> {
		return this.subsonicGet('getAlbum', `&id=${albumId}`).do(console.log);
	}

	getTopSongs(artistName): Observable<ISong[]> {
		return this.subsonicGet('getTopSongs', `&artist=${artistName}`)
	}

	subsonicGetCoverUrl(id: number): string {
		return this.authentication.getServerURl('getCoverArt') + `&id=${id}&size=274`;
	}

	subsonicGet(method: string);
	subsonicGet(method: string, additionalParams: string);
	subsonicGet(method: string, additionalParams?: string) {
		const url = additionalParams ? this.authentication.getServerURl(method) + additionalParams : this.authentication.getServerURl(method);
		if (url == '' || url == additionalParams) {
			return Observable.of(false);
		}


		return this.http.get(url)
			.map(response => response.json())
			.map(data => JSON.parse(JSON.stringify(data).replace('subsonic-response', 'subresp')));
	}
}