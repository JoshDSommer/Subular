System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var BgImageDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BgImageDirective = (function () {
                function BgImageDirective(el) {
                    this.el = el;
                }
                BgImageDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    var el = this.el.nativeElement;
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
                                document.body.setAttribute('style', "\n\t\t\t\t\t\tbackground: -webkit-linear-gradient(" + _this.getRGBString(palettes[1]) + ", #101010);\n\t\t\t\t\t\tbackground: -o-linear-gradient(" + _this.getRGBString(palettes[1]) + ", #101010);\n\t\t\t\t\t\tbackground: linear-gradient(" + _this.getRGBString(palettes[1]) + ", #101010;\n\t\t\t\t\t\t");
                            }
                        });
                    }
                };
                BgImageDirective.prototype.getRGBString = function (palette) {
                    return 'rgb(' + palette[0] + ',' + palette[1] + ',' + palette[2] + ')';
                };
                BgImageDirective = __decorate([
                    core_1.Directive({
                        selector: '[subular-bg-from-img]',
                        host: {}
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BgImageDirective);
                return BgImageDirective;
            })();
            exports_1("BgImageDirective", BgImageDirective);
        }
    }
});
//# sourceMappingURL=subular-bg-from-img.js.map