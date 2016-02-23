System.register(['angular2/core', '../folder-info'], function(exports_1) {
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
    var core_1, folder_info_1;
    var SubularMenuItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            }],
        execute: function() {
            SubularMenuItem = (function () {
                function SubularMenuItem() {
                    this.showMenu = false;
                }
                SubularMenuItem.prototype.menuClick = function () {
                    this.showMenu = true;
                };
                SubularMenuItem = __decorate([
                    core_1.Component({
                        selector: 'subular-item-menu',
                        templateUrl: folder_info_1.path + 'subular-item-menu/subular-item-menu.html',
                        // styleUrls: ['./components/app/app.css'],
                        encapsulation: core_1.ViewEncapsulation.None,
                        inputs: ['showMenu'],
                        styles: [".ul-play-menu{\n\t\tposition:relative;\n\t\tz-index:99;\n\t}"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SubularMenuItem);
                return SubularMenuItem;
            }());
            exports_1("SubularMenuItem", SubularMenuItem);
        }
    }
});
//# sourceMappingURL=subular-item-menu.js.map