System.register(['angular2/core', './../../services/settings-service', './../../services/subular-service'], function(exports_1) {
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
    var core_1, settings_service_1, subular_service_1;
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
            }],
        execute: function() {
            Settings = (function () {
                function Settings(_settings, _dataService) {
                    this._settings = _settings;
                    this._dataService = _dataService;
                    this.server = this._settings.ServerAddress;
                    this.username = this._settings.Username;
                    this.password = this._settings.Password;
                }
                Settings.prototype.refreshData = function () {
                    this._settings.ServerAddress = this.server;
                    this._settings.Username = this.username;
                    this._settings.Password = this.password;
                    this._dataService.buildServerData();
                };
                Settings = __decorate([
                    core_1.Component({
                        selector: 'settings',
                        templateUrl: '/app/components/settings/settings.html',
                        styles: ["\n\t\t.form-group{\n\t\t\tmargin-left:10px;\n\t\t}\n\t\t"],
                        inputs: ['server', 'username', 'password'],
                        providers: [settings_service_1.SettingsService]
                    }), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService, subular_service_1.SubularService])
                ], Settings);
                return Settings;
            }());
            exports_1("Settings", Settings);
        }
    }
});
//# sourceMappingURL=settings.js.map