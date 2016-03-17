System.register(['angular2/core', './../shared/services/subular-service', './../shared/services/settings-service', '../shared/directives/album-list/album-list', '../shared/services/player-service', 'angular2/router', '../shared/directives/subular-list-item/subular-list-item', '../shared/directives/subular-list-box/subular-list-box.service', 'lodash'], function(exports_1, context_1) {
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
    var core_1, subular_service_1, settings_service_1, album_list_1, player_service_1, router_1, subular_list_item_1, subular_list_box_service_1, _;
    var Playlists;
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
            },
            function (subular_list_item_1_1) {
                subular_list_item_1 = subular_list_item_1_1;
            },
            function (subular_list_box_service_1_1) {
                subular_list_box_service_1 = subular_list_box_service_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            Playlists = (function () {
                function Playlists(dataService, playerService, router, routerParams, subularService, settings) {
                    var _this = this;
                    this.dataService = dataService;
                    this.playerService = playerService;
                    this.router = router;
                    this.routerParams = routerParams;
                    this.subularService = subularService;
                    this.settings = settings;
                    this.playlists = this.dataService.getPlaylists();
                    this.songs = [];
                    if (this.routerParams.get('id') == null) {
                        subularService.setItems(this.playlists);
                        subularService.ItemSelectFunction = function (playlist) {
                            _this.router.navigate(['Playlist', { id: playlist.id }]);
                        };
                        this.router.navigate(['Playlist', { id: this.playlists[0].id }]);
                    }
                    this.settings.defaultBackground();
                }
                Playlists.prototype.getCover = function (albumId) {
                    return this.dataService.getCoverUrl(albumId);
                };
                Playlists.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.routerParams.get('id') != null) {
                        var albumId = +this.routerParams.get('id');
                        this.selectedPlaylist(albumId);
                    }
                    this.playerService.playingSong.subscribe(function (song) {
                        _this.currentSong = song;
                    });
                };
                Playlists.prototype.selectedPlaylist = function (playlistId) {
                    var _this = this;
                    var playlistString;
                    var playlistSongs;
                    this.songs = [];
                    this.albums = [];
                    this.dataService.getPlaylist(playlistId).subscribe(function (data) { return playlistString = _this.dataService.cleanSubsonicResponse(data); }, function (error) { return console.log(error); }, function () {
                        playlistSongs = JSON.parse(playlistString).subresp.playlist.entry;
                        _this.songs = playlistSongs;
                        _.forEach(_this.songs, function (song) {
                            var albumSong = _this.albums.filter(function (albumSong) {
                                return albumSong.parent === song.parent;
                            });
                            if (albumSong.length == 0) {
                                _this.albums.push(song);
                            }
                        });
                    });
                    this.selectedplaylist = this.dataService.getPlaylists().filter(function (playlist) {
                        return playlist.id == playlistId;
                    })[0];
                };
                Playlists.prototype.playPlaylist = function () {
                    this.playerService.clearSongs();
                    this.playerService.addSongs(this.songs);
                    this.playerService.shuffleSongs();
                    this.playerService.playSong();
                };
                Playlists = __decorate([
                    core_1.Component({
                        selector: 'playlists',
                        templateUrl: 'app/playlists/playlists.html',
                        inputs: ['playlists', 'selectedplaylist', 'songs'],
                        styles: ["\n\t\th2{\n\t\t\tcolor:#fff;\n\t\t\twidth:95%;\n\t\t},\n\t\tsubular-list-item {\n\t\t}\n\t\t.album-images{\n\t\t\theight:45px;\n\t\t}\n\t"],
                        directives: [album_list_1.AlbumList, subular_list_item_1.SubularListItem, router_1.ROUTER_DIRECTIVES]
                    }),
                    __param(2, core_1.Inject(router_1.Router)),
                    __param(3, core_1.Inject(router_1.RouteParams)),
                    __param(4, core_1.Inject(subular_list_box_service_1.SubularListBoxService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, player_service_1.PlayerService, router_1.Router, router_1.RouteParams, subular_list_box_service_1.SubularListBoxService, settings_service_1.SettingsService])
                ], Playlists);
                return Playlists;
            }());
            exports_1("Playlists", Playlists);
        }
    }
});
//# sourceMappingURL=playlists.js.map