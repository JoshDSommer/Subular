import { Injectable } from '@angular/core';
import {
  connectionType as ConnectionType,
  getConnectionType,
  startMonitoring,
  stopMonitoring
} from 'tns-core-modules/connectivity';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

export {
  connectionType as ConnectionType
} from 'tns-core-modules/connectivity';

@Injectable()
export class CurrentConnectionService {
  connectionType$: Observable<ConnectionType>;

  constructor() {
    this.connectionType$ = new Observable<ConnectionType>(observer => {
      observer.add(() => {
        stopMonitoring();
      });
      startMonitoring(connection => {
        observer.next(connection);
      });
    }).pipe(startWith(getConnectionType()));
  }
}
