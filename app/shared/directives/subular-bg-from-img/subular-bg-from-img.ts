import {Directive, ElementRef, Input, OnInit} from 'angular2/core';
declare let ColorThief: any;

@Directive({
	selector: '[subular-bg-from-img]',
	host: {

	}
})

export class BgImageDirective implements OnInit {

	constructor(private el: ElementRef) { }
	private hoverColor: string;
	private defaultColor: string;
	private element: HTMLElement;

	ngOnInit():void {
		let el = this.el.nativeElement;
		let img = el.getElementsByClassName('artist-album')[0];
		let button = el.getElementsByClassName('play-button')[0];
		let footer = el.getElementsByClassName('album-card-footer')[0];
		let colorThief = new ColorThief()
		let alt = document.getElementById('album-list-artist');

		if (img != null) {
			img.crossOrigin = 'Anonymous';
			img.addEventListener("load", () => {
				let palettes: any[] = colorThief.getPalette(img, 8);
				alt.setAttribute('style', 'color:#fefefe;border-bottom:2px ' + this.getRGBString(palettes[6]) + 'solid;');
				if (document.body.getAttribute('style') === '') {
					document.body.setAttribute('style', `
						background: -webkit-linear-gradient(` + this.getRGBString(palettes[1]) + `, #101010);
						background: -o-linear-gradient(` + this.getRGBString(palettes[1]) + `, #101010);
						background: linear-gradient(` + this.getRGBString(palettes[1]) + `, #101010;
						`);
				}
				button.setAttribute('style', 'color:' + this.getRGBString(palettes[4]));
			});
		}
	}
	getRGBString(palette: any[]): string {
		return 'rgb(' + palette[0] + ',' + palette[1] + ',' + palette[2] + ')';
	}

}
