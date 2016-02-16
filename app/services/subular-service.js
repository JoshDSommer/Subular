System.register(['./settings-service', 'angular2/http', 'angular2/core', 'rxjs/add/operator/map'], function(exports_1) {
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
    var settings_service_1, http_1, core_1;
    var SubularService;
    return {
        setters:[
            function (settings_service_1_1) {
                settings_service_1 = settings_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            SubularService = (function () {
                function SubularService(_settings, _http) {
                    this._settings = _settings;
                    this._http = _http;
                    this.buildServerData();
                }
                SubularService.prototype.buildServerData = function () {
                    if (this._settings.ServerAddress != 'null') {
                        if (!window.localStorage.getItem('subular-albums')) {
                            window.localStorage.setItem('subular-albums', JSON.stringify([]));
                            window.localStorage.setItem('subular-artists', JSON.stringify([]));
                            window.localStorage.setItem('subular-playlist', JSON.stringify([]));
                            this.buildArtistDatabase();
                            this.buildPlayListDatabase();
                            this.buildAlbumDatabase();
                        }
                    }
                };
                SubularService.prototype.getCoverUrl = function (id) {
                    return this._settings.getServerURl('getCoverArt') + '&id=' + id + '&size=274';
                };
                SubularService.prototype.getStreamUrl = function (id) {
                    return this._settings.getServerURl('stream') + '&id=' + id;
                };
                //returns and observable of all the songs.
                SubularService.prototype.getSongsByAlbumId = function (parentId) {
                    var address = this._settings.getServerURl('getMusicDirectory') + '&id=' + parentId;
                    var songs;
                    return this._http.get(address).map(function (resp) { return resp.json(); });
                };
                SubularService.prototype.getSongsByArtistIdAlbumId = function (id, parentId) {
                    return this.getSongs(id).filter(function (song) {
                        return song.parent === parentId;
                    });
                };
                SubularService.prototype.getSongs = function (id) {
                    var songs = window.localStorage.getItem('subular-songs-' + id);
                    if (songs != null) {
                        return JSON.parse(songs);
                    }
                    return [];
                };
                SubularService.prototype.getAlbums = function (parentId) {
                    if (parentId == null) {
                        return JSON.parse(window.localStorage.getItem('subular-albums'));
                    }
                    else {
                        var albums = JSON.parse(window.localStorage.getItem('subular-albums'));
                        var result = [];
                        if (albums != null) {
                            result = albums.filter(function (album) {
                                return album.parent == parentId;
                            });
                        }
                        return result;
                    }
                };
                SubularService.prototype.getalbum = function (id) {
                    var albums = JSON.parse(window.localStorage.getItem('subular-albums'));
                    var result = albums.filter(function (album) {
                        return album.id == id;
                    });
                    return result[0];
                };
                SubularService.prototype.getArtists = function () {
                    return JSON.parse(window.localStorage.getItem('subular-artists'));
                };
                SubularService.prototype.getPlaylists = function () {
                    return JSON.parse(window.localStorage.getItem('subular-playlist'));
                };
                SubularService.prototype.buildPlayListDatabase = function () {
                    var _this = this;
                    var playlistString;
                    var address = this._settings.getServerURl('getPlaylists');
                    this._http.get(address).map(function (resp) { return resp.json(); }).subscribe(function (data) { return playlistString = _this.cleanSubsonicResponse(data); }, function (error) { return alert(error); }, function () {
                        var playlists = JSON.parse(playlistString).subresp.playlists.playlist;
                        window.localStorage.setItem('subular-playlist', JSON.stringify(playlists));
                    });
                };
                SubularService.prototype.buildArtistDatabase = function () {
                    var _this = this;
                    var artistString;
                    var address = this._settings.getServerURl('getIndexes');
                    this._http.get(address).map(function (resp) { return resp.json(); }).subscribe(function (data) { return artistString = _this.cleanSubsonicResponse(data); }, function (error) { return alert(error); }, function () {
                        var artistList = [];
                        ;
                        var artists = JSON.parse(artistString).subresp.indexes.index;
                        artists.forEach(function (value, index) {
                            artistList = artistList.concat(value.artist);
                        });
                        window.localStorage.setItem('subular-artists', JSON.stringify(artistList));
                    });
                };
                SubularService.prototype.buildAlbumDatabase = function (offset) {
                    var _this = this;
                    var albumString;
                    offset = (!offset ? 0 : offset);
                    var address = this._settings.getServerURl('getAlbumList') + '&type=newest&size=500&offset=' + offset;
                    this._http.get(address).map(function (resp) { return resp.json(); }).subscribe(function (data) { return albumString = _this.cleanSubsonicResponse(data); }, function (error) { return alert(error); }, function () {
                        var albums = JSON.parse(albumString).subresp.albumList.album;
                        if (albums.length === 500) {
                            _this.buildAlbumDatabase(offset + 500);
                        }
                        var newAlbums = _this.getAlbums().concat(albums);
                        window.localStorage.setItem('subular-albums', JSON.stringify(newAlbums));
                    });
                };
                SubularService.prototype.buildSongsListForArtist = function (id) {
                    var _this = this;
                    var albums = this.getAlbums(id);
                    window.localStorage.setItem('subular-songs-' + id, JSON.stringify([]));
                    albums.forEach(function (album) {
                        var songs;
                        _this.getSongsByAlbumId(album.id).subscribe(function (data) { return songs = _this.cleanSubsonicResponse(data); }, function (error) { return alert(error); }, function () {
                            var songsList = JSON.parse(songs).subresp.directory.child;
                            songsList = _this.getSongs(id).concat(songsList);
                            window.localStorage.setItem('subular-songs-' + id, JSON.stringify(songsList));
                        });
                    });
                };
                SubularService.prototype.cleanSubsonicResponse = function (data) {
                    return JSON.stringify(data).replace('subsonic-response', 'subresp');
                };
                SubularService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(settings_service_1.SettingsService)),
                    __param(1, core_1.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [settings_service_1.SettingsService, http_1.Http])
                ], SubularService);
                return SubularService;
            }());
            exports_1("SubularService", SubularService);
        }
    }
});
//# sourceMappingURL=subular-service.js.map