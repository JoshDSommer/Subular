System.register(['angular2/core', './../../services/subular-service', './../../services/settings-service', 'rxjs/add/operator/map', '../../services/player-service'], function(exports_1) {
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
    var core_1, subular_service_1, settings_service_1, player_service_1;
    var AlbumCard;
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
            function (_1) {},
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            }],
        execute: function() {
            AlbumCard = (function () {
                function AlbumCard(_dataService, _elementRef, playerService) {
                    this._dataService = _dataService;
                    this._elementRef = _elementRef;
                    this.playerService = playerService;
                }
                AlbumCard.prototype.imgUrl = function (id) {
                    var url = this._dataService.getCoverUrl(id);
                    return url;
                };
                AlbumCard.prototype.ngOnInit = function () {
                    var _this = this;
                    var el = this._elementRef.nativeElement;
                    var img = el.getElementsByClassName('artist-album')[0];
                    var button = el.getElementsByClassName('play-button')[0];
                    var footer = el.getElementsByClassName('album-card-footer')[0];
                    var colorThief = new ColorThief();
                    var alt = document.getElementById('album-list-artist');
                    if (img != null) {
                        img.crossOrigin = 'Anonymous';
                        img.addEventListener("load", function () {
                            var palettes = colorThief.getPalette(img, 8);
                            alt.setAttribute('style', 'color:#fefefe;border-bottom:2px ' + _this.getRGBString(palettes[6]) + 'solid;');
                            // alt.setAttribute('style', 'color:' + this.getRGBString(palettes[6]) + ';border-bottom:2px ' + this.getRGBString(palettes[6]) + 'solid;');
                            // document.body.setAttribute('style', 'background-color:' + this.getRGBString(palettes[5]));
                            if (document.body.getAttribute('style') === '') {
                                document.body.setAttribute('style', 'background: -webkit-linear-gradient(' + _this.getRGBString(palettes[1]) + ',' + _this.getRGBString(palettes[6]) + ');');
                            }
                            //footer.setAttribute('style', 'background: ' + this.getRGBString(palettes[6]) + '; color:' + this.getRGBString(palettes[1]) + ';');
                            //alv.setAttribute('style', 'background-color:' + this.getRGBString(palettes[5]));
                            button.setAttribute('style', 'color:' + _this.getRGBString(palettes[1]));
                        });
                    }
                };
                AlbumCard.prototype.getRGBString = function (palette) {
                    return 'rgb(' + palette[0] + ',' + palette[1] + ',' + palette[2] + ')';
                };
                AlbumCard.prototype.playAlbum = function (id) {
                    var songsList = this._dataService.getSongsByArtistIdAlbumId(this.album.parent, id);
                    this.playerService.clearSongs();
                    this.playerService.addSongs(songsList);
                };
                AlbumCard = __decorate([
                    core_1.Component({
                        selector: 'album-card',
                        templateUrl: '/app/components/album-card/album-card.html',
                        providers: [subular_service_1.SubularService, settings_service_1.SettingsService],
                        inputs: ['id', 'album', 'playerService'],
                        styles: ["\n\t\t.card{\n\n\t\t}\n\t\ti.fa {\n\t\t\tposition: absolute;\n\t\t\tfont-size: 55px;\n\t\t\tbottom: 0;\n\t\t\tright: 0;\n\t\t\tcolor: #fff;\n\t\t\tmargin-right:1%;\n\t\t}\n\t\t.album-card\n\t\t{\n\t\t\tdisplay:block;\n\t\t\tbackground-color: #fff;\n\t\t\twidth: 90%;\n\t\t\tmargin: 0 auto;\n\t\t\tpadding-top:1%;\n\t\t}\n\t\timg {\n\t\t\tdisplay:block;\n\t\t\twidth:98%;\n\t\t\tmargin:0 auto 0;\n\t\t}\n\t\t.album-card-footer{\n\t\t\tmargin: 0 auto;\n\t\t\twidth: 90%;\n\t\t\theight: 35px;\n\t\t\tbackground-color: #fff;\n\t\t\tmargin-bottom: 10px;\n\t\t\tpadding:2px 33px 0 5px;\n\t\t\tfont-size:13px;\n\t\t\tline-height:14px;\n    \t\tborder-bottom-left-radius: 5px;\n\t\t\tfont-weight:700;\n\t\t}\n\t\ti.fa:hover{\n\t\t\tcolor:#9d9d9d !important;\n\t\t}\n\t"]
                    }),
                    __param(2, core_1.Inject(player_service_1.PlayerService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef, player_service_1.PlayerService])
                ], AlbumCard);
                return AlbumCard;
            }());
            exports_1("AlbumCard", AlbumCard);
        }
    }
});
//# sourceMappingURL=album-card.js.map