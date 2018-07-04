import { Injectable } from '@angular/core';
import { connectionType as ConnectionType, getConnectionType, startMonitoring } from "tns-core-modules/connectivity";
import { Observable } from 'rxjs/Observable';

export { connectionType as ConnectionType } from "tns-core-modules/connectivity";

@Injectable()
export class CurrentConnectionService {
	connectionType$: Observable<ConnectionType>;

	constructor() {
		this.connectionType$ = new Observable<ConnectionType>(observer => {
			startMonitoring(connection => {
				observer.next(connection);
			});
		}).startWith(getConnectionType());
	}
}