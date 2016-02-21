System.register(['angular2/core', './../../shared/services/settings-service', './../../shared/services/subular-service', 'angular2/router'], function(exports_1) {
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
    var core_1, settings_service_1, subular_service_1, router_1;
    var Settings;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Settings = (function () {
                function Settings(_settings, _dataService, _router) {
                    this._settings = _settings;
                    this._dataService = _dataService;
                    this._router = _router;
                    this.loading = false;
                    this.server = this._settings.ServerAddress;
                    this.username = this._settings.Username;
                    this.password = this._settings.Password;
                }
                Settings.prototype.refreshData = function () {
                    var _this = this;
                    this._settings.ServerAddress = this.server;
                    this._settings.Username = this.username;
                    this._settings.Password = this.password;
                    this._dataService.buildServerData();
                    this.loading = true;
                    setTimeout(function () {
                        _this._router.navigate(['ArtistList']);
                    }, 15000);
                };
                Settings = __decorate([
                    core_1.Component({
                        selector: 'settings',
                        templateUrl: '/app/components/settings/settings.html',
                        styles: ["\n\t.form-group{\n\t\tmargin-left:10px;\n\t}\n\t"],
                        inputs: ['server', 'username', 'password', 'loading'],
                        providers: [settings_service_1.SettingsService]
                    }), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService, subular_service_1.SubularService, router_1.Router])
                ], Settings);
                return Settings;
            }());
            exports_1("Settings", Settings);
        }
    }
});
//# sourceMappingURL=settings.js.map