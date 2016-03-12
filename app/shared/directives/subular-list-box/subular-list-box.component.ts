import {Component, ElementRef, Inject, OnInit, OnChanges, EventEmitter } from 'angular2/core';
import {SubularService} from './../../services/subular-service';
import {SettingsService} from './../../services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {IArtist} from './../../models/artist';
import {AlbumList} from '../../directives/album-list/album-list';
import {PlayerService} from '../../services/player-service';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {path} from '../folder-info';
import {ISubularItems, SubularListBoxService} from './subular-list-box.service';

@Component({
	selector: 'subular-list-box',
	templateUrl: path + 'subular-list-box/subular-list-box.html',
	inputs: ['items', 'itemSelectEvent', 'selectedItem'],
	styleUrls: [path + 'subular-list-box/subular-list-box.css'],
	directives: []
})



export class SubularListBox implements OnInit, OnChanges {
	public items: ISubularItems[];
	public selectedItem: ISubularItems;
	// public currentPosition: EventEmitter<IAudioPlayingInfo>;
	private subularService: SubularListBoxService;
	private searchTimeout: NodeJS.Timer;
	private search: string = '';
	private gotoClick: any;

	constructor( @Inject(ElementRef) private _elementRef: ElementRef, @Inject(Router) private router: Router,
		@Inject(SubularListBoxService) subularService: SubularListBoxService) {
		this.subularService = subularService;

		if (this.items != null && this.items.length > 0) {

			let el = <HTMLElement>this._elementRef.nativeElement;
			let artistList = document.getElementsByClassName('subular-list-box-item');
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
			let element = document.getElementById(this.selectedItem.name.replace(' ', '-'));
			this.scrollTo(element);
		}
	}

	scrollTo(element: HTMLElement): void {
		if (element != null) {
			var topPos = element.offsetTop;
			let oldies = document.getElementsByClassName('active');
			for (var i = 0; i < oldies.length; i++) {
				let artistItem = oldies.item(i);
				artistItem.className = artistItem.className.replace('active', '');
			}

			document.getElementById('item-list').scrollTop = topPos - 100;
			element.className += ' active';
		}
	}
	key(code: string): string {
		return code.toLowerCase().replace('key', '');
	}

	ngOnInit(): void {
		this.subularService.items.subscribe((items) => {
			this.items = items;
			this.selectedItem = this.items[0];
		});
		this.subularService.item.subscribe((item) => {
			this.selectedItem = item;
		});

	}

	ngOnChanges(): void {

	}
	onSelect(item: ISubularItems) {
		this.selectedItem = item;
		// this.router.navigate(['ArtistAlbums', { id: item.id }]);
		//this.selectedArtist = artist;
		// let element = document.getElementById(artist.name.replace(' ', '-'));
		// this.scrollTo(element);
		this.subularService.ItemSelectFunction(item);
	}
}