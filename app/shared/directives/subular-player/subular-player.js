System.register(['angular2/core', './../../services/subular-service', '../../services/player-service', '../subular-list-item/subular-list-item', '../folder-info', 'angular2/router'], function(exports_1) {
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
    var core_1, subular_service_1, player_service_1, subular_list_item_1, folder_info_1, router_1;
    var SubularPlayer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (subular_list_item_1_1) {
                subular_list_item_1 = subular_list_item_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            SubularPlayer = (function () {
                function SubularPlayer(_dataService, _elementRef, playerService) {
                    this._dataService = _dataService;
                    this._elementRef = _elementRef;
                    this.playing = false;
                    this.playingSongs = false;
                    this.playerService = playerService;
                    this.songs = [];
                    this.currentSong = {
                        id: 0,
                        title: '',
                        artist: '',
                        parent: 0,
                    };
                }
                SubularPlayer.prototype.nextSong = function () {
                    this.playerService.playSong(this.playerService.currentIndex + 1);
                    this.currentSong = this.playerService.currentSong();
                    this.songs = this.playerService.songList;
                    this.getImgUrl();
                };
                SubularPlayer.prototype.previousSong = function () {
                    this.playerService.playSong(this.playerService.currentIndex - 1);
                    this.currentSong = this.playerService.currentSong();
                    this.getImgUrl();
                };
                SubularPlayer.prototype.pauseSong = function () {
                    this.playerService.pauseSong();
                };
                SubularPlayer.prototype.playSong = function () {
                    this.playerService.resumeSong();
                };
                SubularPlayer.prototype.ngOnChanges = function (changes) {
                    this.getImgUrl();
                };
                SubularPlayer.prototype.getImgUrl = function () {
                    if (this.currentSong != null && this.currentSong.id != 0) {
                        this.imgUrl = this._dataService.getCoverUrl(this.currentSong.parent);
                    }
                    return this.imgUrl;
                };
                SubularPlayer.prototype.ngOnInit = function () {
                    var _this = this;
                    this.gutterProgress = this._elementRef.nativeElement.getElementsByClassName("gutter-progress")[0];
                    this.playerService.playingSong.subscribe(function (song) {
                        _this.currentSong = song;
                        _this.songs = _this.playerService.songList;
                        _this.getImgUrl();
                        _this.currentArtist = _this._dataService.getArtist(_this.currentSong.artist);
                    });
                    this.playerService.currentPosition.subscribe(function (info) {
                        _this.gutterProgress.setAttribute('style', 'width:' + info.position + '%;');
                    });
                    this.playerService.currentlyPlaying.subscribe(function (playing) {
                        _this.playing = playing;
                    });
                };
                SubularPlayer = __decorate([
                    core_1.Component({
                        selector: 'subular-player',
                        templateUrl: folder_info_1.path + 'subular-player/subular-player.html',
                        directives: [subular_list_item_1.SubularListItem, router_1.ROUTER_DIRECTIVES],
                        inputs: ['imgUrl', 'albums', 'nowPlayingSong', 'time', 'song', 'playingSongs'],
                        styles: ["\n\t.card-dark{\n\t\t\tbackground:rgb(34, 34, 34);\n\t\t}\n\t.playing-footer{\n\t\t\t\tposition:fixed;\n\t\t\t\twidth:100%;\n\t\t\t\theight:65px;\n\t\t\t\tbottom:0;\n\t\t\t\tbackground:#ffffff;\n\t\t\t\tborder-top:1px #101010;\n\t\t\t\tbox-shadow: 5px -1px 5px #888888;\n\t\t\t}\n\t\t\ti.fa{\n\t\t\t\tcolor: #101010;\n\t\t\t\tline-height: 60px !important;\n\t\t\t\tfont-size: 46px !important;\n\t\t\t\tmargin-right:7px;\n\t\t\t}\n\t\t\ti.play-pause{\n\t\t\t\tmargin-right:20px;\n\t\t\t}\n\t\t\tdiv.ff-rw i, div.heart i{\n\t\t\t\tfont-size: 28px !important;\n\t\t\t\tmargin-right:10px;\n\t\t\t}\n\n\t\t\t.gutter{\n\t\t\t\tbackground-color:#101010;\n\t\t\t\tmargin:0 !important;\n\t\t\t\theight:4px;\n\t\t\t\tpadding:0;\n\t\t\t}\n\t\t\t.gutter-progress{\n\t\t\t\tbackground: -webkit-linear-gradient(#4B0082,#EED2EE);\n\t\t\t\theight:4px;\n    \t\t\tdisplay: inline-block;\n\t\t\t}\n\t\t\t.title, .album, .artist, .cover-img{\n\t\t\t\tcursor:hand;\n\t\t\t}\n\t\t\t.title{\n\t\t\t\twidth: 100%;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tfont-size: 20px;\n\t\t\t\tmargin-top:5px;\n\t\t\t}\n\t\t\t.album{\n\t\t\t\tfont-size: 13px;\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\t\t\t.artist{\n\t\t\t\tfont-weight:700;\n\t\t\t}\n\t\t\ti.fa:hover{\n\t\t\t\tcolor:#9d9d9d;\n\t\t\t}\n\t\t\t#now-playing-list{\n\t\t\t\tposition:absolute;\n\t\t\t\tbottom:75px;\n\t\t\t\ttop:75px;\n\t\t\t\tright:30px;\n\t\t\t\tbackground-color:#fff;\n\t\t\t\twidth:79%;\n\t\t\t\toverflow-y:auto;\n\t\t\t\tborder-radius:2px;\n\t\t\t\tz-index: 99;\n\t\t\t\tpadding:5px 0px 10px;\n\t\t\t\tborder:1px #4B0082 solid;\n\t\t\t}\n\t\t\t#now-playing-list h3{\n\t\t\t\tpadding:1px 15px;\n\t\t\t}\n\t\t\t.cover-img{\n\t\t\t\theight:63px;\n\t\t\t}\n\t"]
                    }),
                    __param(2, core_1.Inject(player_service_1.PlayerService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef, player_service_1.PlayerService])
                ], SubularPlayer);
                return SubularPlayer;
            })();
            exports_1("SubularPlayer", SubularPlayer);
        }
    }
});
//# sourceMappingURL=subular-player.js.map