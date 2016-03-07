import {Component, ElementRef, Inject, OnInit, OnChanges } from 'angular2/core';
import {SubularService} from './../shared/services/subular-service';
import {SettingsService} from './../shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {IArtist} from './../shared/models/artist';
import {AlbumList} from '../shared/directives/album-list/album-list';
import {PlayerService} from '../shared/services/player-service';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'artist-list',
	templateUrl: '/app/artist-list/artist-list.html',
	providers: [SubularService, SettingsService],
	inputs: ['artists', 'selectedArtist', 'playerService', 'i'],
	styles: [`

`],
	directives: [AlbumList]
})
export class ArtistList implements OnInit, OnChanges {
	items: Array<any>;
	public artists: IArtist[];
	public selectedArtist: IArtist;
	public playerService: PlayerService;
	private search: string = '';
	private searchTimeout: NodeJS.Timer;
	private gotoClick: any;
	public i: number = 0;

	ngOnInit(): void {
		if (this.routerParams.get('id') != null) {
			this.selectedArtist = this.artists.find((artist: IArtist) => {
				return artist.id.toString() === this.routerParams.get('id');
			});
		}
	}

	ngOnChanges(): void {

	}

	constructor(
		@Inject(SubularService) private _dataService: SubularService,
		@Inject(ElementRef) private _elementRef: ElementRef,
		@Inject(PlayerService) playerService: PlayerService,
		@Inject(Router) private router: Router,
		@Inject(RouteParams) private routerParams: RouteParams) {

		this.playerService = playerService;
		this.artists = this._dataService.getArtists();

		if (this.artists != null && this.artists.length > 0) {

			this.selectedArtist = this.artists[0];
			let el = <HTMLElement>this._elementRef.nativeElement;
			let artistList = document.getElementsByClassName('subular-list-item');
			document.addEventListener('keydown', (event: any) => {

				let key = this.key(event.code).toLowerCase();

				if (key === 'arrowdown') {

					return;
				} else if (key === 'arrowup') {

					return;
				}
				// if there isa search time out clear it.
				if (this.searchTimeout) {
					clearTimeout(this.searchTimeout);
				}
				// create a new timeout
				this.searchTimeout = setTimeout(() => {
					this.search = '';
				}, 500);

				this.search = this.search + (key === 'space' ? ' ' : key);
				for (let i = 0; i < artistList.length; i++) {
					let artistName = (<HTMLElement>artistList[i]).innerHTML.trim().toLowerCase();
					if (artistName.startsWith(this.search)) {
						clearTimeout(this.gotoClick);
						this.gotoClick = setTimeout(() => {
							(<HTMLElement>artistList[i]).click();
							this.scrollTo(<HTMLElement>artistList[i]);
						}, 500);
						this.scrollTo(<HTMLElement>artistList[i]);
						return;
					}
				}
			});
			let element = document.getElementById(this.selectedArtist.name.replace(' ', '-'));
			this.scrollTo(element);
		} else {
			this.router.navigate(['Settings']);
		}

	}
	scrollTo(element: HTMLElement): void {
		if (element != null) {
			var topPos = element.offsetTop;
			let oldies = document.getElementsByClassName("active");
			for (var i = 0; i < oldies.length; i++) {
				let artistItem = oldies.item(i);
				artistItem.className = artistItem.className.replace('active', '');
			}

			document.getElementById('artist-list').scrollTop = topPos - 100;
			element.className += ' active';
		}
	}
	key(code: string): string {
		return code.toLowerCase().replace('key', '');
	}
	onSelect(artist: IArtist) {
		this.router.navigate(['ArtistAlbums', { id: artist.id }]);
		//this.selectedArtist = artist;
		// let element = document.getElementById(artist.name.replace(' ', '-'));
		// this.scrollTo(element);
	}
}
