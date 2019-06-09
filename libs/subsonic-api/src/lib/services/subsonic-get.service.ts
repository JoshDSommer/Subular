import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SubsonicAuthenticationService } from '../subsonic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SubsonicGetService {
  constructor(
    private http: HttpClient,
    private authentication: SubsonicAuthenticationService
  ) {}

  get(method: string, additionalParams?: string): Observable<any> {
    const url = additionalParams
      ? this.authentication.getServerURl(method) + additionalParams
      : this.authentication.getServerURl(method);
    if (url === '' || url === additionalParams) {
      return of(false);
    }
    return this.http.get<any>(url).pipe(
      map(data => data['subsonic-response']),
      catchError(() => of(false))
    );
  }
}
