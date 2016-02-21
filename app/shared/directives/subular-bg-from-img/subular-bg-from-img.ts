import {Directive, ElementRef, Input, OnInit} from 'angular2/core';
declare let ColorThief: any;

@Directive({
	selector: '[subularBgFromImg]',
	host: {
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()'
	}
})

export class BgImageDirective implements OnInit {
	private _hover: boolean;

	@Input() set hover(hoverStatus: boolean) {
		this._hover = hoverStatus;
	}
	constructor(private el: ElementRef) { }
	private hoverColor: string;
	private defaultColor: string;
	private element: HTMLElement;

	ngOnInit() {
		this.element = <HTMLElement>this.el.nativeElement;
		let img = this.element.getElementsByClassName('img-sample')[0];
		if (img != null)
			img.addEventListener('load', (): void => {
				let colorThief = new ColorThief();
				let palettes = colorThief.getPalette(img, 8);
				this.hoverColor = this.rgbString(palettes[2]);
				this.defaultColor = this.rgbString(palettes[4])
				this.element.setAttribute('style', 'background-color:' + this.defaultColor);
			});
	}

	onMouseEnter() {
		if (this._hover)
			this.element.setAttribute('style', 'background-color:' + this.hoverColor);
	}
	onMouseLeave() {
		if (this._hover)
			this.element.setAttribute('style', 'background-color:' + this.defaultColor);
	}
	/**
	 * returns the string rbg valud from a palette;
	 */
	rgbString(palette: number[]): string {
		return 'rgb(' + palette[0] + ',' + palette[1] + ',' + palette[2] + ');';
	}
}
