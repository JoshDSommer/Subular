System.register(['angular2/core', '../folder-info', '../../services/player-service', './../../services/subular-service'], function(exports_1) {
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
    var core_1, folder_info_1, player_service_1, subular_service_1;
    var SubularMenuItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            }],
        execute: function() {
            SubularMenuItem = (function () {
                function SubularMenuItem(_elementRef, dataService, _playerService) {
                    this._elementRef = _elementRef;
                    this.dataService = dataService;
                    this._playerService = _playerService;
                    this.showMenu = false;
                    this.showPlaylists = false;
                    this.playlists = this.dataService.getPlaylists();
                }
                SubularMenuItem.prototype.ngOnInit = function () {
                    var _this = this;
                    var el = this._elementRef.nativeElement;
                    var menu = el.getElementsByClassName('ul-play-menu')[0];
                    var hideMenu;
                    menu.addEventListener('mouseout', function (event) {
                        var e = event.toElement || event.relatedTarget;
                        if (e.parentNode === menu || e === menu) {
                            clearTimeout(hideMenu);
                            return;
                        }
                        hideMenu = setTimeout(function () {
                            _this.showMenu = false;
                        }, 2000);
                    });
                };
                SubularMenuItem.prototype.menuClick = function () {
                    this.showMenu = true;
                };
                SubularMenuItem.prototype.playNext = function () {
                    if (this._playerService.songList == null) {
                        this._playerService.songList = [];
                        this._playerService.songList.push(this.song);
                    }
                    else {
                        this._playerService.songList.splice(this._playerService.currentIndex + 1, 0, this.song);
                    }
                    this.showMenu = false;
                };
                SubularMenuItem.prototype.playNow = function () {
                    if (this._playerService.songList == null) {
                        this._playerService.songList = [];
                        this._playerService.songList.push(this.song);
                        this._playerService.playSong(0);
                    }
                    else {
                        this._playerService.songList.splice(this._playerService.currentIndex + 1, 0, this.song);
                        this._playerService.playSong(this._playerService.currentIndex + 1);
                    }
                    this.showMenu = false;
                };
                SubularMenuItem.prototype.addToPlaylist = function (playlistId, songId) {
                    this.dataService.addSongToPlaylist(playlistId, songId);
                };
                SubularMenuItem = __decorate([
                    core_1.Component({
                        selector: 'subular-item-menu',
                        templateUrl: folder_info_1.path + 'subular-item-menu/subular-item-menu.html',
                        // styleUrls: ['./components/app/app.css'],
                        encapsulation: core_1.ViewEncapsulation.None,
                        inputs: ['showMenu', 'song'],
                        styles: ["\n\ti.fa{\n\t\tpadding:0 5px;\n\t}\n\ti.fa:hover{\n\t\tbackground-color:#efefef;\n\t}\n\t.ul-play-menu{\n\t\tpadding: 10px 20px;\n\t\tz-index: 99;\n\t\tbackground-color: #fff;\n\t\tborder: 1px solid #000;\n\t\tlist-style-type: none;\n\t\tposition: absolute;\n\t\tmargin-left: -120;\n\t}\n\t.ul-play-menu li{\n\t\tpadding:5px 6px;\n\t\tborder-bottom:1px solid #eee !important;\n\t\tcolor:#010101;\n\t}\n\t.ul-play-menu li:hover{\n\t}\n\t"]
                    }),
                    __param(0, core_1.Inject(core_1.ElementRef)),
                    __param(1, core_1.Inject(subular_service_1.SubularService)),
                    __param(2, core_1.Inject(player_service_1.PlayerService)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, subular_service_1.SubularService, player_service_1.PlayerService])
                ], SubularMenuItem);
                return SubularMenuItem;
            }());
            exports_1("SubularMenuItem", SubularMenuItem);
        }
    }
});
//# sourceMappingURL=subular-item-menu.js.map