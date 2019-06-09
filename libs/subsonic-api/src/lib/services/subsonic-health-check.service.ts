import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SubsonicGetService } from './subsonic-get.service';

@Injectable({
  providedIn: 'root'
})
export class SubsonicHealthCheckService {
  constructor(private subsonicGetService: SubsonicGetService) {}

  pingServer(): Observable<boolean> {
    return this.subsonicGetService
      .get('ping')
      .pipe(map(data => data.status === 'ok'));
  }
}
