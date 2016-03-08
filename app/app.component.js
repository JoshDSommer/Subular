System.register(['angular2/core', './shared/services/subular-service', './shared/directives/subular-player/subular-player', './shared/directives/subular-list-box/subular-list-box.component', './artist-list/artist-list', './settings/settings', 'angular2/router', './playlists/playlists'], function(exports_1) {
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
    var core_1, subular_service_1, subular_player_1, subular_list_box_component_1, artist_list_1, settings_1, router_1, playlists_1;
    var SubularApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            },
            function (subular_player_1_1) {
                subular_player_1 = subular_player_1_1;
            },
            function (subular_list_box_component_1_1) {
                subular_list_box_component_1 = subular_list_box_component_1_1;
            },
            function (artist_list_1_1) {
                artist_list_1 = artist_list_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (playlists_1_1) {
                playlists_1 = playlists_1_1;
            }],
        execute: function() {
            //enableProdMode();
            SubularApp = (function () {
                function SubularApp(_dataService) {
                    this._dataService = _dataService;
                    this.page = 1;
                    if (this._dataService.getArtists() != null && this._dataService.getArtists().length == 0)
                        this._dataService.buildServerData();
                }
                SubularApp.prototype.ngOnInit = function () {
                };
                SubularApp = __decorate([
                    core_1.Component({
                        selector: 'subular',
                        templateUrl: '/app/app.html',
                        inputs: ['imgUrl', 'albums', 'nowPlaying', 'playerService', 'page'],
                        styles: ["\n\t\t.card-dark{\n\t\t\tbackground:rgb(34, 34, 34);\n\t\t},\n\t\t.container{\n\t\t\tbackground:#fff;\n\t\t}\n\t\t.settings-button{\n\t\t\tcolor: #9d9d9d;\n\t\t\tfont-size: 30px;\n\t\t\tline-height: 50px;\n\t\t}\n\t\t.settings-button:hover{\n\t\t\tcolor:#fff;\n\t\t}\n\t"],
                        directives: [subular_player_1.SubularPlayer, artist_list_1.ArtistList, settings_1.Settings, playlists_1.Playlists, router_1.ROUTER_DIRECTIVES, subular_list_box_component_1.SubularListBox]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Landing', component: artist_list_1.ArtistList, useAsDefault: true },
                        { path: '/artist', name: 'ArtistList', component: artist_list_1.ArtistList },
                        { path: '/artist/:id', name: 'ArtistAlbums', component: artist_list_1.ArtistList },
                        { path: '/artist/:id/:albumId', name: 'ArtistAlbum', component: artist_list_1.ArtistList },
                        { path: '/settings', name: 'Settings', component: settings_1.Settings },
                        { path: '/playlists', name: 'Playlists', component: playlists_1.Playlists },
                    ]), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService])
                ], SubularApp);
                return SubularApp;
            }());
            exports_1("SubularApp", SubularApp);
        }
    }
});
//# sourceMappingURL=app.component.js.map