System.register(['angular2/core'], function(exports_1) {
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
                Object.defineProperty(BgImageDirective.prototype, "hover", {
                    set: function (hoverStatus) {
                        this._hover = hoverStatus;
                    },
                    enumerable: true,
                    configurable: true
                });
                BgImageDirective.prototype.ngOnInit = function () {
                    var _this = this;
                    this.element = this.el.nativeElement;
                    var img = this.element.getElementsByClassName('img-sample')[0];
                    if (img != null)
                        img.addEventListener('load', function () {
                            var colorThief = new ColorThief();
                            var palettes = colorThief.getPalette(img, 8);
                            _this.hoverColor = _this.rgbString(palettes[2]);
                            _this.defaultColor = _this.rgbString(palettes[4]);
                            _this.element.setAttribute('style', 'background-color:' + _this.defaultColor);
                        });
                };
                BgImageDirective.prototype.onMouseEnter = function () {
                    if (this._hover)
                        this.element.setAttribute('style', 'background-color:' + this.hoverColor);
                };
                BgImageDirective.prototype.onMouseLeave = function () {
                    if (this._hover)
                        this.element.setAttribute('style', 'background-color:' + this.defaultColor);
                };
                /**
                 * returns the string rbg valud from a palette;
                 */
                BgImageDirective.prototype.rgbString = function (palette) {
                    return 'rgb(' + palette[0] + ',' + palette[1] + ',' + palette[2] + ');';
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], BgImageDirective.prototype, "hover", null);
                BgImageDirective = __decorate([
                    core_1.Directive({
                        selector: '[subularBgFromImg]',
                        host: {
                            '(mouseenter)': 'onMouseEnter()',
                            '(mouseleave)': 'onMouseLeave()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BgImageDirective);
                return BgImageDirective;
            }());
            exports_1("BgImageDirective", BgImageDirective);
        }
    }
});
//# sourceMappingURL=subular-bg-from-img.js.map