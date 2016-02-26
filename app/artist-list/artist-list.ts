import {Component, ElementRef, Inject} from 'angular2/core';
import {SubularService} from './../shared/services/subular-service';
import {SettingsService} from './../shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Artist} from './../shared/models/artist';
import {AlbumList} from '../shared/directives/album-list/album-list'
import {PlayerService} from '../shared/services/player-service';
import {Router}              from 'angular2/router';

@Component({
	selector: 'artist-list',
	templateUrl: '/app/artist-list/artist-list.html',
	providers: [SubularService, SettingsService],
	inputs: ['artists', 'selectedArtist', 'playerService', 'i'],
	styles: [`

`],
	directives: [AlbumList]
})
export class ArtistList {
	items: Array<any>;
	public artists: Artist[];
	public selectedArtist: Artist;
	public playerService: PlayerService;
	private search: string = '';
	private searchTimeout: NodeJS.Timer;
	public i: number = 0;
	constructor(private _dataService: SubularService, private _elementRef: ElementRef, playerService: PlayerService, private _router: Router) {
		this.playerService = playerService;
		this.artists = this._dataService.getArtists();
		if (this.artists != null && this.artists.length > 0) {

			this.selectedArtist = this.artists[0];
			let el = <HTMLElement>this._elementRef.nativeElement;
			let artistList = document.getElementsByClassName('artist-list-item');
			document.addEventListener('keydown', (event: any) => {

				let key = this.key(event.code).toLowerCase();

				if (key === 'arrowdown') {

					return;
				} else if (key === 'arrowup') {

					return;
				}
				//if there isa search time out clear it.
				if (this.searchTimeout) {
					clearTimeout(this.searchTimeout);
				}
				//create a new timeout
				this.searchTimeout = setTimeout(() => {
					this.search = '';
				}, 1500)

				this.search = this.search + (key === 'space' ? ' ' : key);
				console.log(this.search);
				for (var i = 0; i < artistList.length; i++) {
					let artistName = (<HTMLElement>artistList[i]).innerHTML.trim().toLowerCase();
					if (artistName.startsWith(this.search)) {
						(<HTMLElement>artistList[i]).click();
						this.scrollTo(<HTMLElement>artistList[i]);
						return;
					}
				}
			});
		} else {
			this._router.navigate(['Settings']);
		}

	}
	scrollTo(element: HTMLElement): void {
		var topPos = element.offsetTop;
		document.getElementById('artist-list').scrollTop = topPos - 100;
	}
	key(code: string): string {
		return code.toLowerCase().replace('key', '');
	}
	onSelect(artist: Artist) {
		this.selectedArtist = artist;
	}
}
