System.register(['angular2/core', 'angular2/router', '../shared/services/subular-service', '../shared/services/player-service', '../shared/directives/subular-list-box/subular-list-box.service', './../shared/services/settings-service', './../shared/directives/subular-list-item/subular-list-item'], function(exports_1) {
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
    var core_1, router_1, subular_service_1, player_service_1, subular_list_box_service_1, settings_service_1, subular_list_item_1;
    var AlbumComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (subular_list_box_service_1_1) {
                subular_list_box_service_1 = subular_list_box_service_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (subular_list_item_1_1) {
                subular_list_item_1 = subular_list_item_1_1;
            }],
        execute: function() {
            AlbumComponent = (function () {
                function AlbumComponent(dataService, playerService, router, routerParams, subularService, settings) {
                    this.dataService = dataService;
                    this.playerService = playerService;
                    this.router = router;
                    this.routerParams = routerParams;
                    this.subularService = subularService;
                    this.settings = settings;
                    this.songs = [];
                }
                AlbumComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //this.settings.defaultBackground();
                    this.artists = this.dataService.getArtists();
                    this.subularService.setItems(this.artists);
                    this.subularService.ItemSelectFunction = function (artist) {
                        _this.router.navigate(['ArtistAlbums', { id: artist.id }]);
                    };
                    if (this.routerParams.get('albumId') != null) {
                        var albumId = +this.routerParams.get('albumId');
                        this.songs = this.dataService.getSongsByArtistIdAlbumId(0, albumId);
                    }
                    if (this.routerParams.get('id') != null) {
                        this.artist = this.artists.find(function (artist) {
                            return artist.id.toString() === _this.routerParams.get('id');
                        });
                        this.subularService.setSelectedItem(this.artist);
                    }
                    this.playerService.playingSong.subscribe(function (song) {
                        _this.currentSong = song;
                    });
                    if (document.body.getAttribute('style') == null || document.body.getAttribute('style') == '') {
                        this.settings.defaultBackground();
                    }
                };
                AlbumComponent.prototype.imgUrl = function (id) {
                    var url = this.dataService.getCoverUrl(id);
                    return url;
                };
                AlbumComponent = __decorate([
                    core_1.Component({
                        selector: 'album',
                        templateUrl: 'app/album/album.html',
                        directives: [subular_list_item_1.SubularListItem],
                        styles: ["\n\t\t.album-song-list{\n\t\t\theight:calc(100% - 170px);\n\t\t\toverflow:auto;\n\t\t}\n\t"],
                        styleUrls: ['app/shared/directives/subular-list-item/subular-list-item-light.css'],
                    }),
                    __param(0, core_1.Inject(subular_service_1.SubularService)),
                    __param(1, core_1.Inject(player_service_1.PlayerService)),
                    __param(2, core_1.Inject(router_1.Router)),
                    __param(3, core_1.Inject(router_1.RouteParams)),
                    __param(4, core_1.Inject(subular_list_box_service_1.SubularListBoxService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, player_service_1.PlayerService, router_1.Router, router_1.RouteParams, subular_list_box_service_1.SubularListBoxService, settings_service_1.SettingsService])
                ], AlbumComponent);
                return AlbumComponent;
            }());
            exports_1("AlbumComponent", AlbumComponent);
        }
    }
});
//# sourceMappingURL=album.component.js.map