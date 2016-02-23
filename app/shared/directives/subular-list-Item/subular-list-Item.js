System.register(['angular2/core', '../folder-info', '../../services/player-service', '../subular-item-menu/subular-item-menu'], function(exports_1) {
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
    var core_1, folder_info_1, player_service_1, subular_item_menu_1;
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
            }],
        execute: function() {
            SubularListItem = (function () {
                function SubularListItem(playerService) {
                    this.playerService = playerService;
                    this.nowPlayingSong = {
                        id: 0,
                        title: '',
                        artist: '',
                        parent: 0,
                    };
                }
                SubularListItem.prototype.ngOnInit = function () {
                    var _this = this;
                    this.playerService.playingSong.subscribe(function (song) {
                        _this.nowPlayingSong = song;
                        _this.songs = _this.playerService.songList;
                    });
                };
                SubularListItem.prototype.rowNum = function (index) {
                    return index + 1;
                };
                SubularListItem.prototype.playSongFromList = function (index) {
                    this.playerService.playSong(index);
                };
                SubularListItem = __decorate([
                    core_1.Component({
                        selector: 'subular-list-item',
                        templateUrl: folder_info_1.path + 'subular-list-Item/subular-list-Item.html',
                        inputs: ['songs', 'number', 'nowPlayingSong'],
                        directives: [subular_item_menu_1.SubularMenuItem],
                        styles: ["\n\t\t\ttd{\n\t\t\t\tfont-size:14px;\n\t\t\t\tline-height:22px;\n\t\t\t}\n\n\t\t\ttable{\n\t\t\t\twidth:98%;\n\t\t\t\tmargin:0 auto;\n\t\t\t}\n\t\t\t.row-artist{\n\t\t\t\tpadding:0 10px;\n\t\t\t}\n\t\t\t.row-song{\n\t\t\t\tmax-width:45%;\n\t\t\t\toverflow:hidden;\n\t\t\t}\n\t\t\t.row-track{\n\t\t\t\twidth: 19px;\n\t\t\t}\n\t\t\t.row-num{\n\t\t\t\tpadding-right:5px;\n\t\t\t}\n\t\t\ttr{\n\t\t\t\tborder-bottom: 1px #efefef solid;\n\t\t\t\tcursor:hand;\n\t\t\t}\n\t\t\ttd, th{\n\t\t\t\toverflow:hidden;\n\t\t\t\tpadding:0 5px;\n\t\t\t}\n\t\t\ttr td:first-child{\n\t\t\t\tpadding-left:10px;\n\t\t\t}\n\t\t\ttr td:last-child{\n\t\t\t\tpadding-right:10px;\n\t\t\t}\n\t\t\ttr:hover{\n\t\t\t\tcolor:#fff;\n\t\t\t\tbackground-color:#9d9d9d;\n\t\t\t}\n\t\t\t.rowPlaying{\n\t\t\t\tbackground: -webkit-linear-gradient(#4B0082,#4B0082);\n\t\t\t\tfont-weight:700;\n\t\t\t\tcolor:#fff;\n\t\t\t}"],
                    }), 
                    __metadata('design:paramtypes', [player_service_1.PlayerService])
                ], SubularListItem);
                return SubularListItem;
            }());
            exports_1("SubularListItem", SubularListItem);
        }
    }
});
//# sourceMappingURL=subular-list-item.js.map