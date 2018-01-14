import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import { PanGestureEventData } from 'tns-core-modules/ui/gestures';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Directive({
	selector: '[collapse]'
})
export class CollapseDirective implements AfterViewInit {

  private subscription: Subscription;

	@Input() collapse: ElementRef;

	get view(): View {
		return this.element.nativeElement;
	}

	get listView(): View {
		return this.collapse.nativeElement;
	}

	constructor(private element: ElementRef) { }

	ngAfterViewInit() {
		const emptyFunction = () => { };
		const panEvent$ = fromEvent(this.listView, 'pan')
			.map((event: PanGestureEventData) => event.deltaY);

		this.subscription = panEvent$
			.filter(x => {
				// filter out out events that are just starting
				if (x < -10) {
					return true;
				}
				if (x > 10) {
					return true;
				}
				return false;
			})
			.map(x => {
				return x > 0 ? 1 : 0;
			})
			.distinctUntilChanged()
			.subscribe((x) => {
				if (x > 0) {
					this.view.animate({
						translate: { x: 0, y: 0 },
						duration: 400
					}).then(emptyFunction, emptyFunction);
					this.listView.translateY = 0;
				} else {
					this.view.animate({
						translate: { x: 0, y: -100 },
						duration: 600
					}).then(emptyFunction, emptyFunction);
					this.listView.animate({
						translate: { x: 0, y: -100 },
						duration: 600
					}).then(emptyFunction, emptyFunction);
				}
			});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}