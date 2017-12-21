import { Observable } from 'rxjs/Observable';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

export function RouterParamObservable<T>(route: ActivatedRoute, router: Router, paramName: string): Observable<T> {
	if (route && route.snapshot && route.snapshot.params) {
		return router.events
				.filter(value => value instanceof NavigationEnd)
				.map(() => route.snapshot.params[paramName])
				.startWith(route.snapshot.params[paramName]);
	}
	return Observable.empty();
}


export function RouterResolverDataObservable<T>(route: ActivatedRoute, router: Router, paramName: string): Observable<T> {
	// if (route && route.firstChild && route.firstChild.snapshot && route.firstChild.snapshot.params) {
	return router.events
			.filter(value => value instanceof NavigationEnd)
			.map(() => route.snapshot.data[paramName])
			.startWith(route.snapshot.data[paramName]);
	//
}


export function replace<T>(array: T[], targetItem: T, comparator: (listItem: T, targetItem: T) => boolean = defaultComparer): T[] {
	return array.map(listItem => {
		if (comparator(listItem, targetItem)) {
			return targetItem;
		}
		return listItem;
	});
}

export function defaultComparer<T>(x: T, y: T): boolean {
	if (x && y) {
		return (x as any).id === (y as any).id;
	}
	return x == y;
}
