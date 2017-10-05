import { Observable } from "rxjs/Observable";
import { NavigationEnd, ActivatedRoute, Router } from "@angular/router";


export function RouterParamObservable<T>(route: ActivatedRoute, router: Router, paramName: string): Observable<T> {
	if (route && route.snapshot && route.snapshot.params) {
		return Observable.of(route.snapshot.params[paramName])
			.merge(router.events
				.filter(value => value instanceof NavigationEnd)
				.map(() => route.snapshot.params[paramName]));
	}
	return Observable.empty();
}


export function RouterResolverDataObservable<T>(route: ActivatedRoute, router: Router, paramName: string): Observable<T> {
	//	if (route && route.firstChild && route.firstChild.snapshot && route.firstChild.snapshot.params) {
	return Observable.of(route.snapshot.data[paramName])
		.merge(router.events
			.filter(value => value instanceof NavigationEnd)
			.map(() => route.snapshot.data[paramName]));
	//
}