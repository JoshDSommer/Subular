System.register(['angular2/core', '../folder-info', '../../services/player-service', '../subular-item-menu/subular-item-menu', './../../services/subular-service'], function(exports_1, context_1) {
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
    var core_1, folder_info_1, player_service_1, subular_item_menu_1, subular_service_1;
    var SubularListItem;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            },
            function (player_service_1_1) {
                player_service_1 = player_service_1_1;
            },
            function (subular_item_menu_1_1) {
                subular_item_menu_1 = subular_item_menu_1_1;
            },
            function (subular_service_1_1) {
                subular_service_1 = subular_service_1_1;
            }],
        execute: function() {
            SubularListItem = (function () {
                function SubularListItem(playerService, dataService) {
                    this.dataService = dataService;
                    this.playerService = playerService;
                    this.nowPlayingSong = {
                        id: 0,
                        title: '',
                        artist: '',
                        parent: 0,
                    };
                }
                SubularListItem.prototype.ngOnInit = function () {
                };
                SubularListItem.prototype.ngOnChanges = function () {
                    var songs = this.songs;
                    this.songs = [];
                    this.songs = songs;
                };
                SubularListItem.prototype.rowNum = function (index) {
                    return index + 1;
                };
                SubularListItem.prototype.formatDuration = function (duration) {
                    var min = Math.floor(duration / 60);
                    var seconds = duration - min * 60;
                    var returnTime = min + ':' + (seconds <= 9 ? '0' + seconds : seconds);
                    return returnTime;
                };
                SubularListItem.prototype.playSongFromList = function (index) {
                    this.playerService.songList = this.songs;
                    this.playerService.playSong(index);
                };
                SubularListItem.prototype.removeSong = function (playlistId, songId) {
                    var songIndex = this.songs.map(function (val) { return val.id; }).indexOf(songId);
                    this.dataService.removeSongFromPlaylist(playlistId, songId);
                    this.songs.splice(songIndex, 1);
                };
                SubularListItem = __decorate([
                    core_1.Component({
                        selector: 'subular-list-item',
                        templateUrl: folder_info_1.path + 'subular-list-item/subular-list-item.html',
                        inputs: ['songs', 'number', 'nowPlayingSong', 'removeFromPlaylist', 'playlistId'],
                        directives: [subular_item_menu_1.SubularMenuItem],
                        styleUrls: [folder_info_1.path + 'subular-list-item/subular-list-item.css'],
                    }),
                    __param(0, core_1.Inject(player_service_1.PlayerService)),
                    __param(1, core_1.Inject(subular_service_1.SubularService)), 
                    __metadata('design:paramtypes', [player_service_1.PlayerService, subular_service_1.SubularService])
                ], SubularListItem);
                return SubularListItem;
            }());
            exports_1("SubularListItem", SubularListItem);
        }
    }
});
//# sourceMappingURL=subular-list-item.js.map