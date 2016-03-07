System.register(['angular2/core', './../shared/services/subular-service', './../shared/services/settings-service', '../shared/directives/album-list/album-list', '../shared/services/player-service', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, subular_service_1, settings_service_1, album_list_1, player_service_1, router_1;
    var ArtistList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (album_list_1_1) {
                album_list_1 = album_list_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ArtistList = (function () {
                function ArtistList(_dataService, _elementRef, playerService, router, routerParams) {
                    var _this = this;
                    this._dataService = _dataService;
                    this._elementRef = _elementRef;
                    this.router = router;
                    this.routerParams = routerParams;
                    this.search = '';
                    this.i = 0;
                    this.playerService = playerService;
                    this.artists = this._dataService.getArtists();
                    if (this.artists != null && this.artists.length > 0) {
                        this.selectedArtist = this.artists[0];
                        var el = this._elementRef.nativeElement;
                        var artistList_1 = document.getElementsByClassName('subular-list-item');
                        document.addEventListener('keydown', function (event) {
                            var key = _this.key(event.code).toLowerCase();
                            if (key === 'arrowdown') {
                                return;
                            }
                            else if (key === 'arrowup') {
                                return;
                            }
                            // if there isa search time out clear it.
                            if (_this.searchTimeout) {
                                clearTimeout(_this.searchTimeout);
                            }
                            // create a new timeout
                            _this.searchTimeout = setTimeout(function () {
                                _this.search = '';
                            }, 500);
                            _this.search = _this.search + (key === 'space' ? ' ' : key);
                            var _loop_1 = function(i) {
                                var artistName = artistList_1[i].innerHTML.trim().toLowerCase();
                                if (artistName.startsWith(_this.search)) {
                                    clearTimeout(_this.gotoClick);
                                    _this.gotoClick = setTimeout(function () {
                                        artistList_1[i].click();
                                        _this.scrollTo(artistList_1[i]);
                                    }, 500);
                                    _this.scrollTo(artistList_1[i]);
                                    return { value: void 0 };
                                }
                            };
                            for (var i = 0; i < artistList_1.length; i++) {
                                var state_1 = _loop_1(i);
                                if (typeof state_1 === "object") return state_1.value;
                            }
                        });
                        var element = document.getElementById(this.selectedArtist.name.replace(' ', '-'));
                        this.scrollTo(element);
                    }
                    else {
                        this.router.navigate(['Settings']);
                    }
                }
                ArtistList.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.routerParams.get('id') != null) {
                        this.selectedArtist = this.artists.find(function (artist) {
                            return artist.id.toString() === _this.routerParams.get('id');
                        });
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
                        providers: [subular_service_1.SubularService, settings_service_1.SettingsService],
                        inputs: ['artists', 'selectedArtist', 'playerService', 'i'],
                        styles: ["\n\n"],
                        directives: [album_list_1.AlbumList]
                    }),
                    __param(0, core_1.Inject(subular_service_1.SubularService)),
                    __param(1, core_1.Inject(core_1.ElementRef)),
                    __param(2, core_1.Inject(player_service_1.PlayerService)),
                    __param(3, core_1.Inject(router_1.Router)),
                    __param(4, core_1.Inject(router_1.RouteParams)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef, player_service_1.PlayerService, router_1.Router, router_1.RouteParams])
                ], ArtistList);
                return ArtistList;
            }());
            exports_1("ArtistList", ArtistList);
        }
    }
});
//# sourceMappingURL=artist-list.js.map