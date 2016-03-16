System.register(['angular2/core', '../album-card/album-card', '../../services/subular-service', '../../services/player-service', '../folder-info', '../subular-list-item/subular-list-item', 'angular2/router'], function(exports_1) {
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
    var core_1, album_card_1, subular_service_1, player_service_1, folder_info_1, subular_list_item_1, router_1;
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
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            },
            function (subular_list_item_1_1) {
                subular_list_item_1 = subular_list_item_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AlbumList = (function () {
                function AlbumList(dataService, playerService, router, routerParams) {
                    this.dataService = dataService;
                    this.router = router;
                    this.routerParams = routerParams;
                    this.artist = {
                        id: 0,
                        name: ''
                    };
                    this.playerService = playerService;
                    this.nowPlayingSong = {};
                }
                AlbumList.prototype.ngOnChanges = function () {
                    if (this.artist != null) {
                        this.albums = this.dataService.getAlbums(this.artist.id);
                    }
                };
                AlbumList.prototype.ngOnInit = function () {
                    var _this = this;
                    this.getSongs();
                    document.body.setAttribute('style', '');
                    this.playerService.playingSong.subscribe(function (song) {
                        _this.nowPlayingSong = song;
                    });
                };
                AlbumList.prototype.getSongs = function () {
                    if (this.artist != null) {
                        var artistSongs = this.dataService.getSongs(this.artist.name);
                        if (artistSongs.length === 0)
                            this.dataService.buildSongsListForArtist(this.artist.id);
                    }
                };
                AlbumList.prototype.getAlbumSongs = function (album) {
                    this.router.navigate(['ArtistAlbum', { id: this.artist.id, albumId: album.id }]);
                };
                AlbumList.prototype.playArtist = function () {
                    var songs;
                    songs = this.dataService.getSongs(this.artist.name);
                    this.playerService.clearSongs();
                    this.playerService.addSongs(songs);
                    this.playerService.shuffleSongs();
                    this.playerService.playSong();
                };
                AlbumList = __decorate([
                    core_1.Component({
                        selector: 'album-list',
                        templateUrl: folder_info_1.path + 'album-list/album-list.html',
                        directives: [album_card_1.AlbumCard, subular_list_item_1.SubularListItem, router_1.ROUTER_DIRECTIVES],
                        inputs: ['albums', 'artist', 'playerService', 'songs'],
                        styles: ["\n\t\talbum-card{\n\t\t\tcursor:hand;\n\t\t}\n\t\t.album-list{\n\t\t\theight:calc(100% - 180px);\n\t\t\toverflow-y:auto;\n\t\t\tpadding-left:5px;\n\t\t}\n\t\t.album-list::-webkit-scrollbar {\n\t\t\t\t\tbackground: transparent !important;\n\t\t}\n\t\t.album-list::-webkit-scrollbar {\n\t\t\tbackground: transparent !important;\n\t\t}\n\t\th2{\n\t\t\tpadding:0 25px;\n\t\t\tmargin-bottom: 0;\n\t\t}\n\t\ti.fa:hover{\n\t\t\tcolor:#9d9d9d !important;\n\t\t}\n\t\t.album-song-list{\n\t\t\tbackground-color: white;\n\t\t\topacity: 0.85;\n\t\t\theight:calc(100% - 170px);\n\t\t\toverflow:auto;\n\t\t}\n\t\t#album-list-artist a{\n\t\t\tcolor:inherit;\n\t\t}\n\t\th2{\n\t\t\tcolor:#fff;\n\t\t}\n\t"]
                    }),
                    __param(0, core_1.Inject(subular_service_1.SubularService)),
                    __param(1, core_1.Inject(player_service_1.PlayerService)),
                    __param(2, core_1.Inject(router_1.Router)),
                    __param(3, core_1.Inject(router_1.RouteParams)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, player_service_1.PlayerService, router_1.Router, router_1.RouteParams])
                ], AlbumList);
                return AlbumList;
            })();
            exports_1("AlbumList", AlbumList);
        }
    }
});
//# sourceMappingURL=album-list.js.map