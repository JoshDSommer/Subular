System.register(['angular2/core', './../shared/services/subular-service', './../shared/services/settings-service', '../shared/directives/album-list/album-list', '../shared/services/player-service', '../shared/directives/subular-list-item/subular-list-item'], function(exports_1, context_1) {
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
    var core_1, subular_service_1, settings_service_1, album_list_1, player_service_1, subular_list_item_1;
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
            function (subular_list_item_1_1) {
                subular_list_item_1 = subular_list_item_1_1;
            }],
        execute: function() {
            Playlists = (function () {
                function Playlists(dataService, playerService) {
                    this.dataService = dataService;
                    this.playerService = playerService;
                    this.playlists = this.dataService.getPlaylists();
                    this.songs = [];
                    if (this.playlists != null && this.playlists.length > 0) {
                        this.selectedplaylist = this.playlists[0];
                        this.onSelect(this.selectedplaylist);
                    }
                }
                Playlists.prototype.onSelect = function (playlist) {
                    var _this = this;
                    var playlistString;
                    var playlistSongs;
                    this.dataService.getPlaylist(playlist.id).subscribe(function (data) { return playlistString = _this.dataService.cleanSubsonicResponse(data); }, function (error) { return console.log(error); }, function () {
                        playlistSongs = JSON.parse(playlistString).subresp.playlist.entry;
                        _this.songs = playlistSongs;
                    });
                    this.selectedplaylist = playlist;
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
                        providers: [subular_service_1.SubularService, settings_service_1.SettingsService],
                        inputs: ['playlists', 'selectedplaylist', 'songs'],
                        styles: ["\n\t\t.playlist-list{\n\t\t\theight:calc(100% - 115px);\n\t\t\tlist-style-type: none;\n\t\t\tpadding:5px 0px;\n\t\t\toverflow-y:auto;\n\t\t\tborder-right:1px solid #BBB !important;\n\t\t}\n\t\t.playlist-list::-webkit-scrollbar {\n\t\t\t\tbackground: transparent !important;\n\t\t}\n\t\t.playlist-list-item{\n\t\t\tpadding:5px 6px;\n\t\t\tborder-bottom:1px solid #eee !important;\n\t\t}\n\t\t.playlist-list-item:hover{\n\t\t\tcolor:#fff;\n\t\t\tbackground-color:#9d9d9d;\n\t\t}\n\t\t.playlist-container{\n\t\t\tbackground-color: white;\n\t\t\topacity: 0.85;\n\t\t\theight:calc(100% - 115px);\n\t\t\toverflow:auto;\n\t\t}\n\t"],
                        directives: [album_list_1.AlbumList, subular_list_item_1.SubularListItem]
                    }), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, player_service_1.PlayerService])
                ], Playlists);
                return Playlists;
            }());
            exports_1("Playlists", Playlists);
        }
    }
});
//# sourceMappingURL=playlists.js.map