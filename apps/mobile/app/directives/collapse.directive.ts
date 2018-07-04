import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import { PanGestureEventData } from 'tns-core-modules/ui/gestures';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Directive({
	selector: '[collapse]'
})
export class CollapseDirective implements AfterViewInit {

	private subscription: Subscription;

    /**
     * listview view to watch scrolling events on.
     */
	@Input() collapse: ElementRef;

	private get view(): View {
		return this.element.nativeElement;
	}

	private get listView(): View {
		return this.collapse.nativeElement;
	}

	constructor(private element: ElementRef) {
	}

	ngAfterViewInit() {
		const panEvent$ = fromEvent(this.listView, 'pan')
			.map((event: PanGestureEventData) => event.deltaY);

		this.subscription = panEvent$
			.filter(deltaY => {
				// filter out out events that are just starting
				if (deltaY < -10) {
					return true;
				}
				if (deltaY > 10) {
					return true;
				}
				return false;
			})
            .map( deltaY => {
                // determine if we are moving up or not.
				return deltaY > 0 ? 1 : 0;
			})
			.distinctUntilChanged()
			.switchMap((up) => {
				const itemHeight = this.view.getMeasuredHeight();
				if (up) {
					return fromPromise(this.view.animate({
						translate: { x: 0, y: 0 },
						duration: 600
					}));

				} else {
					return fromPromise(this.view.animate({
						translate: { x: 0, y: -itemHeight },
						duration: 600
					}));
				}
			}).subscribe();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}