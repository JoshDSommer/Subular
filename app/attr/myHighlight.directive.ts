import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
	selector: '[myHighlight]',
	host: {
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()'
	}
})
export class HighlightDirective {
	constructor(private el: ElementRef) { }

	onMouseEnter() { this._highlight("yellow"); }
	onMouseLeave() { this._highlight(null); }

	private _highlight(color: string) {
		this.el.nativeElement.style.backgroundColor = color;

	}
}
