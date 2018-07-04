import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum } from '@Subular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SLIDE_RIGHT_ANIMATION } from '../../../animations/animations';
import { SubularMobileService } from '../../../services/subularMobile.service';
import { screen } from 'platform';


@Component({
	moduleId: module.id,
	selector: 'albums',
	templateUrl: 'albums.component.html',
	styleUrls: ['albums.component.css'],
})

export class AlbumsComponent implements OnInit {
	albums: IAlbum[];

	animateOptions = SLIDE_RIGHT_ANIMATION
	imageHeightWidth = (screen.mainScreen.widthDIPs / 12) * 5;
	imageSideMargins = (screen.mainScreen.widthDIPs / 18);

	constructor(private route: ActivatedRoute,
		private router: Router,
		private nsRouter: RouterExtensions,
		public subular: SubularMobileService) {
	}

	getAlbumsText(albums: IAlbum[]) {
		return `${albums.length} album${albums.length > 1 ? 's' : ''}`;
	}

	back() {
		this.nsRouter.back();
	}
	ngOnInit() {
		this.albums = this.route.snapshot.data['albums'] as IAlbum[];
		this.router.events.subscribe(() => {
			this.albums = this.route.snapshot.data['albums'] as IAlbum[];
		});
	}
	getCoverArt(song) {
		return this.subular.subsonicGetAlbumCoverUrl(song);
	}
}