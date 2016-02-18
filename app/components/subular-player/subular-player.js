System.register(['angular2/core', './../../services/subular-service', './../../services/settings-service', '../subular-list-Item/subular-list-Item'], function(exports_1) {
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
    var core_1, subular_service_1, settings_service_1, subular_list_Item_1;
    var SubularPlayer;
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
            function (subular_list_Item_1_1) {
                subular_list_Item_1 = subular_list_Item_1_1;
            }],
        execute: function() {
            SubularPlayer = (function () {
                function SubularPlayer(_dataService, _elementRef) {
                    this._dataService = _dataService;
                    this._elementRef = _elementRef;
                    this.playing = false;
                    this.playingSongs = false;
                    this.imgUrl = this._dataService.getCoverUrl(19);
                    this.albums = this._dataService.getAlbums(19);
                    this.songs = [];
                    this.nowPlayingSong = {
                        id: 0,
                        title: '',
                        artist: '',
                        parent: 0,
                    };
                }
                SubularPlayer.prototype.nextSong = function () {
                    this.playerService.playSong(this.playerService.currentIndex + 1);
                    this.nowPlayingSong = this.playerService.currentSong();
                    this.songs = this.playerService.songList;
                };
                SubularPlayer.prototype.previousSong = function () {
                    this.playerService.playSong(this.playerService.currentIndex - 1);
                    this.nowPlayingSong = this.playerService.currentSong();
                };
                SubularPlayer.prototype.pauseSong = function () {
                    console.log('pause songs');
                    this.playerService.pauseSong();
                };
                SubularPlayer.prototype.playSong = function () {
                    this.playerService.resumeSong();
                };
                SubularPlayer.prototype.ngOnChanges = function (changes) {
                };
                SubularPlayer.prototype.rowNum = function (index) {
                    return index + 1;
                };
                SubularPlayer.prototype.ngOnInit = function () {
                    var _this = this;
                    this.gutterProgress = this._elementRef.nativeElement.getElementsByClassName("gutter-progress")[0];
                    this.playerService.playingSong.subscribe(function (song) {
                        _this.nowPlayingSong = song;
                        _this.songs = _this.playerService.songList;
                    });
                    this.playerService.currentPosition.subscribe(function (info) {
                        _this.gutterProgress.setAttribute('style', 'width:' + info.position + '%;');
                    });
                    this.playerService.currentlyPlaying.subscribe(function (playing) {
                        _this.playing = playing;
                    });
                };
                SubularPlayer.prototype.playSongFromList = function (index) {
                    this.playerService.playSong(index);
                };
                SubularPlayer = __decorate([
                    core_1.Component({
                        selector: 'subular-player',
                        templateUrl: '/app/components/subular-player/subular-player.html',
                        providers: [subular_service_1.SubularService, settings_service_1.SettingsService],
                        directives: [subular_list_Item_1.SubularListItem],
                        inputs: ['imgUrl', 'albums', 'playerService', 'nowPlayingSong', 'time', 'song', 'playingSongs'],
                        styles: ["\n\t.card-dark{\n\t\t\tbackground:rgb(34, 34, 34);\n\t\t}\n\t.playing-footer{\n\t\t\t\tposition:fixed;\n\t\t\t\twidth:100%;\n\t\t\t\theight:65px;\n\t\t\t\tbottom:0;\n\t\t\t\tbackground:#ffffff;\n\t\t\t\tborder-top:1px #101010;\n\t\t\t\tbox-shadow: 5px -1px 5px #888888;\n\t\t\t}\n\t\t\ti.fa{\n\t\t\t\tcolor: #101010;\n\t\t\t\tline-height: 60px !important;\n\t\t\t\tfont-size: 46px !important;\n\n\t\t\t}\n\t\t\tdiv.ff-rw i, div.heart i{\n\t\t\t\tfont-size: 28px !important;\n\t\t\t\tmargin-right:15px;\n\t\t\t}\n\n\t\t\t.gutter{\n\t\t\t\tbackground-color:#101010;\n\t\t\t\tmargin:0 !important;\n\t\t\t\theight:4px;\n\t\t\t\tpadding:0;\n\t\t\t}\n\t\t\t.gutter-progress{\n\t\t\t\tbackground: -webkit-linear-gradient(#4B0082,#EED2EE);\n\t\t\t\theight:4px;\n    \t\t\tdisplay: inline-block;\n\t\t\t}\n\t\t\t.title{\n\t\t\t\twidth: 100%;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tfont-size: 20px;\n\t\t\t\tmargin-top:5px;\n\t\t\t}\n\t\t\t.album{\n\t\t\t\tfont-size: 13px;\n\t\t\t\tmargin-left: 10px;\n\t\t\t}\n\t\t\t.artist{\n\t\t\t\tfont-weight:700;\n\t\t\t}\n\t\t\ti.fa:hover{\n\t\t\t\tcolor:#9d9d9d;\n\t\t\t}\n\t\t\t#now-playing-list{\n\t\t\t\tposition:absolute;\n\t\t\t\tbottom:75px;\n\t\t\t\ttop:75px;\n\t\t\t\tright:35px;\n\t\t\t\tbackground-color:#fff;\n\t\t\t\twidth:79%;\n\t\t\t\toverflow-y:auto;\n\t\t\t\tborder-radius:2px;\n    \t\t\tz-index: 99;\n\t\t\t\tpadding:5px 0px 10px;\n\t\t\t\tborder:1px #efefef solid;\n\t\t\t}\n\t\t\t#now-playing-list td{\n\t\t\t\tfont-size:14px;\n\t\t\t\tline-height:22px;\n\t\t\t}\n\t\t\t#now-playing-modal{\n\t\t\t\tposition:absolute;\n\t\t\t\ttop:0;\n\t\t\t\tleft:0;\n\t\t\t\tright:0;\n\t\t\t\tbottom:65px;\n\t\t\t\tbackground:#000;\n\t\t\t\topacity:0.5;\n\t\t\t}\n\t\t\t#now-playing-list table{\n\t\t\t\twidth:95%;\n\t\t\t\tmargin:0 auto;\n\t\t\t}\n\t\t\t.row-artist{\n\t\t\t\tpadding:0 10px;\n\t\t\t}\n\t\t\t.row-song{\n\t\t\t\tmax-width:45%;\n\t\t\t\toverflow:hidden;\n\t\t\t}\n\t\t\t.row-track{\n\t\t\t\twidth: 19px;\n\t\t\t}\n\t\t\t.row-num{\n\t\t\t\tpadding-right:5px;\n\t\t\t}\n\t\t\ttr{\n\t\t\t\tborder-bottom: 1px #efefef solid;\n\t\t\t\tcursor:hand;\n\t\t\t}\n\t\t\ttd, th{\n\t\t\t\toverflow:hidden;\n\t\t\t}\n\t\t\ttr:hover{\n\t\t\t\tcolor:#fff;\n\t\t\t\tbackground-color:#9d9d9d;\n\t\t\t}\n\t\t\t.rowPlaying{\n\t\t\t\tbackground: -webkit-linear-gradient(#4B0082,#4B0082);\n\t\t\t\tfont-weight:700;\n\t\t\t\tcolor:#fff;\n\t\t\t}\n\t"]
                    }), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef])
                ], SubularPlayer);
                return SubularPlayer;
            }());
            exports_1("SubularPlayer", SubularPlayer);
        }
    }
});
//# sourceMappingURL=subular-player.js.map