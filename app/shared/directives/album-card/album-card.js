System.register(['angular2/core', './../../services/subular-service', 'rxjs/add/operator/map', '../../services/player-service'], function(exports_1) {
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
    var core_1, subular_service_1, player_service_1;
    var AlbumCard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
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
                            if (document.body.getAttribute('style') === '') {
                                document.body.setAttribute('style', "\n\t\t\t\t\t\tbackground: -webkit-linear-gradient(" + _this.getBrightBGColor(palettes) + ", #101010, #080808);\n\t\t\t\t\t\tbackground: -o-linear-gradient(" + _this.getBrightBGColor(palettes) + ", #101010, #080808);\n\t\t\t\t\t\tbackground: linear-gradient(" + _this.getBrightBGColor(palettes) + ", #101010, #080808);\n\t\t\t\t\t\t");
                            }
                            button.setAttribute('style', 'color:' + _this.getRGBString(palettes[4]));
                        });
                    }
                };
                AlbumCard.prototype.getRGBString = function (palette) {
                    return 'rgb(' + palette[0] + ',' + palette[1] + ',' + palette[2] + ')';
                };
                AlbumCard.prototype.getBrightBGColor = function (palettes, tolerance) {
                    tolerance = tolerance == null ? 199 : tolerance;
                    var brightPallet = palettes[0];
                    palettes.forEach(function (palette) {
                        if ((palette[0] > tolerance || palette[1] > tolerance || palette[2] > tolerance) && (palette[0] < (tolerance - (tolerance / 3)) || palette[1] < (tolerance - (tolerance / 3)) || palette[2] < (tolerance - (tolerance / 3)))) {
                            brightPallet = palette;
                        }
                    });
                    if (brightPallet[0] < tolerance && brightPallet[1] < tolerance && brightPallet[2] < tolerance) {
                        return this.getBrightBGColor(palettes, tolerance - 15);
                    }
                    else {
                        return this.getRGBString(brightPallet);
                    }
                };
                AlbumCard.prototype.playAlbum = function (id) {
                    var songsList = this._dataService.getSongsByArtistIdAlbumId(this.album.parent, id);
                    this.playerService.clearSongs();
                    this.playerService.addSongs(songsList);
                };
                AlbumCard = __decorate([
                    core_1.Component({
                        selector: 'album-card',
                        templateUrl: '/app/shared/directives/album-card/album-card.html',
                        inputs: ['id', 'album', 'playerService', 'click'],
                        styles: ["\n\t.card{\n\n\t}\n\ti.fa {\n\t\tposition: absolute;\n\t\tfont-size: 55px;\n\t\tbottom: 0;\n\t\tright: -4;\n\t\tcolor: #fff;\n\t\tmargin-right:1%;\n\t\t/*text-shadow: black 0.1em 0.1em 0.2em*/\n\t}\n\t.album-card\n\t{\n\t\tdisplay:block;\n\t\tbackground-color: #fff;\n\t\twidth: 90%;\n\t\tmargin: 0 auto;\n\t\tpadding-top:1%;\n\t}\n\timg {\n\t\tdisplay:block;\n\t\twidth:98%;\n\t\tmin-height:162px;\n\t\tmargin:0 auto 0;\n\t}\n\t.album-card-footer{\n\t\tmargin: 0 auto;\n\t\twidth: 90%;\n\t\theight: 35px;\n\t\tbackground-color: #fff;\n\t\tmargin-bottom: 10px;\n\t\tpadding:2px 33px 0 5px;\n\t\tfont-size:1.7vh;\n\t\tline-height:14px;\n\t\tborder-bottom-left-radius: 5px;\n\t\tborder-bottom-right-radius: 5px;\n\t\tfont-weight:700;\n\t\tcolor:#101010;\n\t}\n\ti.fa:hover{\n\t\tcolor:#9d9d9d !important;\n\t}\n"]
                    }),
                    __param(2, core_1.Inject(player_service_1.PlayerService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService, core_1.ElementRef, player_service_1.PlayerService])
                ], AlbumCard);
                return AlbumCard;
            })();
            exports_1("AlbumCard", AlbumCard);
        }
    }
});
//# sourceMappingURL=album-card.js.map