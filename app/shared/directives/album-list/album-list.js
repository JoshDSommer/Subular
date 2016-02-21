System.register(['angular2/core', '../album-card/album-card', '../../services/subular-service', '../subular-bg-from-img/subular-bg-from-img', '../../services/player-service', '../folder-info'], function(exports_1) {
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
    var core_1, album_card_1, subular_service_1, subular_bg_from_img_1, player_service_1, folder_info_1;
    var AlbumList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (album_card_1_1) {
                album_card_1 = album_card_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (subular_bg_from_img_1_1) {
                subular_bg_from_img_1 = subular_bg_from_img_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            }],
        execute: function() {
            AlbumList = (function () {
                function AlbumList(_dataService, playerService) {
                    this._dataService = _dataService;
                    this.artist = {
                        id: 0,
                        name: ''
                    };
                    this.playerService = playerService;
                }
                AlbumList.prototype.ngOnChanges = function () {
                    if (this.artist != null) {
                        this.albums = this._dataService.getAlbums(this.artist.id);
                        document.body.setAttribute('style', '');
                        this.getSongs();
                    }
                };
                AlbumList.prototype.ngOnInit = function () {
                    this.getSongs();
                };
                AlbumList.prototype.getSongs = function () {
                    if (this.artist != null) {
                        this._dataService.buildSongsListForArtist(this.artist.id);
                    }
                };
                AlbumList.prototype.playArtist = function () {
                    var songs = this._dataService.getSongs(this.artist.id);
                    this.playerService.clearSongs();
                    this.playerService.addSongs(songs);
                    this.playerService.shuffleSongs();
                    this.playerService.playSong();
                    console.log("playArtist");
                };
                AlbumList = __decorate([
                    core_1.Component({
                        selector: 'album-list',
                        templateUrl: folder_info_1.path + 'album-list/album-list.html',
                        directives: [album_card_1.AlbumCard, subular_bg_from_img_1.BgImageDirective],
                        inputs: ['albums', 'artist', 'playerService'],
                        styles: ["\n\t\t.album-list{\n\t\t\theight:calc(100% - 180px);\n\t\t\toverflow-y:auto;\n\t\t\tpadding-left:5px;\n\t\t}\n\t\t.album-list::-webkit-scrollbar {\n\t\t\t\t\tbackground: transparent !important;\n\t\t}\n\t\t.album-list::-webkit-scrollbar {\n\t\t\tbackground: transparent !important;\n\t\t}\n\t\th2{\n\t\t\tpadding:0 25px;\n\t\t}\n\t\ti.fa:hover{\n\t\t\tcolor:#9d9d9d !important;\n\t\t}\n\t"]
                    }),
                    __param(1, core_1.Inject(player_service_1.PlayerService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, player_service_1.PlayerService])
                ], AlbumList);
                return AlbumList;
            }());
            exports_1("AlbumList", AlbumList);
        }
    }
});
//# sourceMappingURL=album-list.js.map