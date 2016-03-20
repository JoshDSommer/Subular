System.register(['angular2/core', 'angular2/router', '../folder-info', './subular-list-box.service'], function(exports_1) {
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
    var core_1, router_1, folder_info_1, subular_list_box_service_1;
    var SubularListBox;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (folder_info_1_1) {
                folder_info_1 = folder_info_1_1;
            },
            function (subular_list_box_service_1_1) {
                subular_list_box_service_1 = subular_list_box_service_1_1;
            }],
        execute: function() {
            SubularListBox = (function () {
                function SubularListBox(_elementRef, router, subularService) {
                    var _this = this;
                    this._elementRef = _elementRef;
                    this.router = router;
                    this.search = '';
                    this.subularService = subularService;
                    if (this.items != null && this.items.length > 0) {
                        var el = this._elementRef.nativeElement;
                        var artistList_1 = document.getElementsByClassName('subular-list-box-item');
                        document.addEventListener('keydown', function (event) {
                            var key = _this.key(event.code).toLowerCase();
                            if (key === 'arrowdown') {
                                return;
                            }
                            else if (key === 'arrowup') {
                                return;
                            }
                            // if there isa search time out clear it.
                            if (_this.searchTimeout) {
                                clearTimeout(_this.searchTimeout);
                            }
                            // create a new timeout
                            _this.searchTimeout = setTimeout(function () {
                                _this.search = '';
                            }, 500);
                            _this.search = _this.search + (key === 'space' ? ' ' : key);
                            for (var i = 0; i < artistList_1.length; i++) {
                                var artistName = artistList_1[i].innerHTML.trim().toLowerCase();
                                if (artistName.startsWith(_this.search)) {
                                    clearTimeout(_this.gotoClick);
                                    _this.gotoClick = setTimeout(function () {
                                        artistList_1[i].click();
                                        _this.scrollTo(artistList_1[i]);
                                    }, 500);
                                    _this.scrollTo(artistList_1[i]);
                                    return;
                                }
                            }
                        });
                        var element = document.getElementById(this.selectedItem.name.replace(' ', '-'));
                        this.scrollTo(element);
                    }
                }
                SubularListBox.prototype.scrollTo = function (element) {
                    if (element != null) {
                        var topPos = element.offsetTop;
                        var oldies = document.getElementsByClassName('active');
                        for (var i = 0; i < oldies.length; i++) {
                            var artistItem = oldies.item(i);
                            artistItem.className = artistItem.className.replace('active', '');
                        }
                        document.getElementById('item-list').scrollTop = topPos - 100;
                        element.className += ' active';
                    }
                };
                SubularListBox.prototype.key = function (code) {
                    return code.toLowerCase().replace('key', '');
                };
                SubularListBox.prototype.ngOnInit = function () {
                    var _this = this;
                    this.subularService.items.subscribe(function (items) {
                        _this.items = items;
                        _this.selectedItem = _this.items[0];
                    });
                    this.subularService.item.subscribe(function (item) {
                        _this.selectedItem = item;
                    });
                };
                SubularListBox.prototype.ngOnChanges = function () {
                };
                SubularListBox.prototype.onSelect = function (item) {
                    this.selectedItem = item;
                    // this.router.navigate(['ArtistAlbums', { id: item.id }]);
                    //this.selectedArtist = artist;
                    // let element = document.getElementById(artist.name.replace(' ', '-'));
                    // this.scrollTo(element);
                    this.subularService.ItemSelectFunction(item);
                };
                SubularListBox = __decorate([
                    core_1.Component({
                        selector: 'subular-list-box',
                        templateUrl: folder_info_1.path + 'subular-list-box/subular-list-box.html',
                        inputs: ['items', 'itemSelectEvent', 'selectedItem'],
                        styleUrls: [folder_info_1.path + 'subular-list-box/subular-list-box.css'],
                        directives: []
                    }),
                    __param(0, core_1.Inject(core_1.ElementRef)),
                    __param(1, core_1.Inject(router_1.Router)),
                    __param(2, core_1.Inject(subular_list_box_service_1.SubularListBoxService)), 
                    __metadata('design:paramtypes', [core_1.ElementRef, router_1.Router, subular_list_box_service_1.SubularListBoxService])
                ], SubularListBox);
                return SubularListBox;
            }());
            exports_1("SubularListBox", SubularListBox);
        }
    }
});
//# sourceMappingURL=subular-list-box.component.js.map