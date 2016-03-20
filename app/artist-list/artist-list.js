System.register(['angular2/core', './../shared/services/subular-service', '../shared/directives/album-list/album-list', '../shared/services/player-service', 'angular2/router', '../shared/directives/subular-list-box/subular-list-box.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, subular_service_1, album_list_1, player_service_1, router_1, subular_list_box_service_1;
    var ArtistList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (album_list_1_1) {
                album_list_1 = album_list_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (subular_list_box_service_1_1) {
                subular_list_box_service_1 = subular_list_box_service_1_1;
            }],
        execute: function() {
            ArtistList = (function () {
                function ArtistList(_dataService, _elementRef, playerService, router, routerParams, subularService) {
                    var _this = this;
                    this._dataService = _dataService;
                    this._elementRef = _elementRef;
                    this.router = router;
                    this.routerParams = routerParams;
                    this.search = '';
                    this.i = 0;
                    this.subularService = subularService;
                    this.playerService = playerService;
                    this.artists = this._dataService.getArtists();
                    this.subularService.setItems(this.artists);
                    this.subularService.ItemSelectFunction = function (artist) {
                        _this.router.navigate(['ArtistAlbums', { id: artist.id }]);
                    };
                    // 		if (this.artists != null && this.artists.length > 0) {
                    //
                    // 			this.selectedArtist = this.artists[0];
                    // 			let el = <HTMLElement>this._elementRef.nativeElement;
                    // 			let artistList = document.getElementsByClassName('subular-list-item');
                    // 			document.addEventListener('keydown', (event: any) => {
                    //
                    // 				let key = this.key(event.code).toLowerCase();
                    //
                    // 				if (key === 'arrowdown') {
                    //
                    // 					return;
                    // 				} else if (key === 'arrowup') {
                    //
                    // 					return;
                    // 				}
                    // 				// if there isa search time out clear it.
                    // 				if (this.searchTimeout) {
                    // 					clearTimeout(this.searchTimeout);
                    // 				}
                    // 				// create a new timeout
                    // 				this.searchTimeout = setTimeout(() => {
                    // 					this.search = '';
                    // 				}, 500);
                    //
                    // 				this.search = this.search + (key === 'space' ? ' ' : key);
                    // 				for (let i = 0; i < artistList.length; i++) {
                    // 					let artistName = (<HTMLElement>artistList[i]).innerHTML.trim().toLowerCase();
                    // 					if (artistName.startsWith(this.search)) {
                    // 						clearTimeout(this.gotoClick);
                    // 						this.gotoClick = setTimeout(() => {
                    // 							(<HTMLElement>artistList[i]).click();
                    // 							this.scrollTo(<HTMLElement>artistList[i]);
                    // 						}, 500);
                    // 						this.scrollTo(<HTMLElement>artistList[i]);
                    // 						return;
                    // 					}
                    // 				}
                    // 			});
                    // 			let element = document.getElementById(this.selectedArtist.name.replace(' ', '-'));
                    // 			this.scrollTo(element);
                    // 		} else {
                    // 			this.router.navigate(['Settings']);
                    // 		}
                }
                ArtistList.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.routerParams.get('id') != null) {
                        this.selectedArtist = this.artists.find(function (artist) {
                            return artist.id.toString() === _this.routerParams.get('id');
                        });
                        this.subularService.setSelectedItem(this.selectedArtist);
                    }
                };
                ArtistList.prototype.ngOnChanges = function () {
                };
                ArtistList.prototype.scrollTo = function (element) {
                    if (element != null) {
                        var topPos = element.offsetTop;
                        var oldies = document.getElementsByClassName("active");
                        for (var i = 0; i < oldies.length; i++) {
                            var artistItem = oldies.item(i);
                            artistItem.className = artistItem.className.replace('active', '');
                        }
                        document.getElementById('artist-list').scrollTop = topPos - 100;
                        element.className += ' active';
                    }
                };
                ArtistList.prototype.key = function (code) {
                    return code.toLowerCase().replace('key', '');
                };
                ArtistList.prototype.onSelect = function (artist) {
                    this.router.navigate(['ArtistAlbums', { id: artist.id }]);
                    //this.selectedArtist = artist;
                    // let element = document.getElementById(artist.name.replace(' ', '-'));
                    // this.scrollTo(element);
                };
                ArtistList = __decorate([
                    core_1.Component({
                        selector: 'artist-list',
                        templateUrl: '/app/artist-list/artist-list.html',
                        inputs: ['artists', 'selectedArtist', 'playerService', 'i'],
                        styles: ["\n\n"],
                        directives: [album_list_1.AlbumList],
                    }),
                    __param(0, core_1.Inject(subular_service_1.SubularService)),
                    __param(1, core_1.Inject(core_1.ElementRef)),
                    __param(2, core_1.Inject(player_service_1.PlayerService)),
                    __param(3, core_1.Inject(router_1.Router)),
                    __param(4, core_1.Inject(router_1.RouteParams)),
                    __param(5, core_1.Inject(subular_list_box_service_1.SubularListBoxService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef, player_service_1.PlayerService, router_1.Router, router_1.RouteParams, subular_list_box_service_1.SubularListBoxService])
                ], ArtistList);
                return ArtistList;
            }());
            exports_1("ArtistList", ArtistList);
        }
    }
});
//# sourceMappingURL=artist-list.js.map