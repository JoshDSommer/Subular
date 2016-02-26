System.register(['angular2/core', './../shared/services/subular-service', './../shared/services/settings-service', '../shared/directives/album-list/album-list', '../shared/services/player-service', 'angular2/router'], function(exports_1) {
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
                function ArtistList(_dataService, _elementRef, playerService, _router) {
                    var _this = this;
                    this._dataService = _dataService;
                    this._elementRef = _elementRef;
                    this._router = _router;
                    this.search = '';
                    this.i = 0;
                    this.playerService = playerService;
                    this.artists = this._dataService.getArtists();
                    if (this.artists != null && this.artists.length > 0) {
                        this.selectedArtist = this.artists[0];
                        var el = this._elementRef.nativeElement;
                        var artistList_1 = document.getElementsByClassName('artist-list-item');
                        document.addEventListener('keydown', function (event) {
                            var key = _this.key(event.code).toLowerCase();
                            if (key === 'arrowdown') {
                                return;
                            }
                            else if (key === 'arrowup') {
                                return;
                            }
                            //if there isa search time out clear it.
                            if (_this.searchTimeout) {
                                clearTimeout(_this.searchTimeout);
                            }
                            //create a new timeout
                            _this.searchTimeout = setTimeout(function () {
                                _this.search = '';
                            }, 1500);
                            _this.search = _this.search + (key === 'space' ? ' ' : key);
                            console.log(_this.search);
                            for (var i = 0; i < artistList_1.length; i++) {
                                var artistName = artistList_1[i].innerHTML.trim().toLowerCase();
                                if (artistName.startsWith(_this.search)) {
                                    artistList_1[i].click();
                                    _this.scrollTo(artistList_1[i]);
                                    return;
                                }
                            }
                        });
                    }
                    else {
                        this._router.navigate(['Settings']);
                    }
                }
                ArtistList.prototype.scrollTo = function (element) {
                    var topPos = element.offsetTop;
                    document.getElementById('artist-list').scrollTop = topPos - 100;
                };
                ArtistList.prototype.key = function (code) {
                    return code.toLowerCase().replace('key', '');
                };
                ArtistList.prototype.onSelect = function (artist) {
                    this.selectedArtist = artist;
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
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef, player_service_1.PlayerService, router_1.Router])
                ], ArtistList);
                return ArtistList;
            }());
            exports_1("ArtistList", ArtistList);
        }
    }
});
//# sourceMappingURL=artist-list.js.map