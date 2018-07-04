import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { SubsonicService } from './services/subsonic.service';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class SubsonicGuard implements CanActivate {
  constructor(private subsonic: SubsonicService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.subsonic.pingServer().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
        return authenticated;
      })
    );
  }
}
