import {Directive, ElementRef, Input, OnInit} from 'angular2/core';
declare let ColorThief: any;

@Directive({
	selector: '[subular-bg-from-img]',
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
			img.crossOrigin = 'Anonymous';
			img.addEventListener("load", () => {
				let palettes: any[] = colorThief.getPalette(img, 8);
				alt.setAttribute('style', 'color:#fefefe;border-bottom:2px ' + this.getRGBString(palettes[6]) + 'solid;');
				// alt.setAttribute('style', 'color:' + this.getRGBString(palettes[6]) + ';border-bottom:2px ' + this.getRGBString(palettes[6]) + 'solid;');
				// document.body.setAttribute('style', 'background-color:' + this.getRGBString(palettes[5]));
				if (document.body.getAttribute('style') === '') {
					document.body.setAttribute('style', 'background: -webkit-linear-gradient(' + this.getRGBString(palettes[1]) + ',' + this.getRGBString(palettes[6]) + ');');
				}
				// footer.setAttribute('style', 'background: ' + this.getRGBString(palettes[6]) + '; color:' + this.getRGBString(palettes[1]) + ';');
				// alv.setAttribute('style', 'background-color:' + this.getRGBString(palettes[5]));
				button.setAttribute('style', 'color:' + this.getRGBString(palettes[1]));
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
