System.register(['angular2/core', './subular-service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var core_1, subular_service_1;
    var PlayerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            }],
        execute: function() {
            PlayerService = (function () {
                function PlayerService(_settingsService) {
                    this._settingsService = _settingsService;
                    this.playingSong = new core_1.EventEmitter();
                    this.currentlyPlaying = new core_1.EventEmitter();
                    this.currentPosition = new core_1.EventEmitter();
                }
                PlayerService.prototype.emitPlayingSongEvent = function () {
                    this.playingSong.emit(this.currentSong());
                };
                PlayerService.prototype.emitPlayingEvent = function (playing) {
                    this.currentlyPlaying.emit(playing);
                };
                PlayerService.prototype.getCurrentIndexChangeemitter = function () {
                    return this.playingSong;
                };
                PlayerService.prototype.clearSongs = function () {
                    this.songList = [];
                };
                PlayerService.prototype.addSong = function (ISong) {
                    this.songList = (!this.songList ? [] : this.songList);
                    this.songList.push(ISong);
                };
                PlayerService.prototype.addSongs = function (songs) {
                    var _this = this;
                    songs.forEach(function (ISong) {
                        _this.addSong(ISong);
                    });
                    this.playSong();
                };
                PlayerService.prototype.shuffleSongs = function () {
                    var currentIndex = this.songList.length, temporaryValue, randomIndex;
                    var shuffledSongs = [];
                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = this.songList[currentIndex];
                        this.songList[currentIndex] = this.songList[randomIndex];
                        this.songList[randomIndex] = temporaryValue;
                    }
                };
                PlayerService.prototype.playSong = function (index) {
                    var _this = this;
                    if (this.songList.length > 0) {
                        index = (!index ? 0 : index);
                        this.currentIndex = index;
                        this.emitPlayingSongEvent();
                        this.emitPlayingEvent(true);
                        if (this.audio != null)
                            this.audio.pause();
                        var streamUrl = this._settingsService.getStreamUrl(this.songList[index].id); // + '&maxBitRate=128';
                        this.audio = new Audio(streamUrl);
                        this.audio.play();
                        this.audio.addEventListener('timeupdate', function () {
                            var rem = _this.audio.duration - _this.audio.currentTime;
                            var pos = (_this.audio.currentTime / _this.audio.duration) * 100;
                            var mins = Math.floor(rem / 60);
                            var secs = rem - mins * 60;
                            _this.emitPlayingSongEvent();
                            _this.currentPosition.emit({
                                remainingTime: rem,
                                position: pos,
                                mins: mins,
                                secs: secs
                            });
                        });
                        this.audio.addEventListener('ended', function () {
                            if ((_this.currentIndex + 1) < _this.songList.length)
                                _this.playSong(_this.currentIndex + 1);
                        });
                    }
                    else {
                    }
                };
                PlayerService.prototype.pauseSong = function () {
                    this.audio.pause();
                    this.emitPlayingEvent(false);
                };
                PlayerService.prototype.resumeSong = function () {
                    this.audio.play();
                    this.emitPlayingEvent(true);
                };
                PlayerService.prototype.currentSong = function () {
                    return this.songList[this.currentIndex];
                };
                PlayerService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(subular_service_1.SubularService)), 
                    __metadata('design:paramtypes', [subular_service_1.SubularService])
                ], PlayerService);
                return PlayerService;
            }());
            exports_1("PlayerService", PlayerService);
        }
    }
});
//# sourceMappingURL=player-service.js.map