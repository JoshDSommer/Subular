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
    var SettingsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SettingsService = (function () {
                function SettingsService() {
                    if (this.salt == null || this.salt === '')
                        this.salt = this.makeSalt();
                }
                Object.defineProperty(SettingsService.prototype, "salt", {
                    get: function () {
                        return window.localStorage['subsonic-salt'];
                    },
                    set: function (v) {
                        window.localStorage.setItem('subsonic-salt', v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SettingsService.prototype, "ServerAddress", {
                    get: function () {
                        return window.localStorage.getItem("server-address");
                    },
                    set: function (v) {
                        window.localStorage.setItem("server-address", v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SettingsService.prototype, "Username", {
                    get: function () {
                        return window.localStorage.getItem("server-username");
                    },
                    set: function (v) {
                        window.localStorage.setItem("server-username", v);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SettingsService.prototype, "Password", {
                    get: function () {
                        return window.localStorage.getItem("server-password");
                    },
                    set: function (v) {
                        window.localStorage.setItem("server-password", CryptoJS.MD5(v + this.salt).toString());
                    },
                    enumerable: true,
                    configurable: true
                });
                SettingsService.prototype.getServerURl = function (method) {
                    var serverUrl = this.ServerAddress + '/rest/' + method + '.view?u=' + this.Username + '&t=' + this.Password + '&s=' + this.salt + '&v=1.0.0&c=rest&f=json';
                    return serverUrl;
                };
                SettingsService.prototype.makeSalt = function () {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for (var i = 0; i < 15; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return text;
                };
                SettingsService.prototype.defaultBackground = function () {
                    document.body.setAttribute('style', "\n\t\t\t\t\t\tbackground: -webkit-linear-gradient(#4B0082,#101010);\n\t\t\t\t\t\tbackground: -o-linear-gradient(#4B0082,#101010);\n\t\t\t\t\t\tbackground: linear-gradient(#4B0082,#101010;\n\t\t\t\t\t\t");
                };
                SettingsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SettingsService);
                return SettingsService;
            }());
            exports_1("SettingsService", SettingsService);
        }
    }
});
//# sourceMappingURL=settings-service.js.map