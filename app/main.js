System.register(['angular2/platform/browser', 'angular2/core', './app.component', 'angular2/http', 'angular2/router', './shared/directives/subular-list-box/subular-list-box.service'], function(exports_1) {
    "use strict";
    var browser_1, core_1, app_component_1, http_1, router_1, subular_list_box_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (subular_list_box_service_1_1) {
                subular_list_box_service_1 = subular_list_box_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.SubularApp, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, subular_list_box_service_1.SubularListBoxService, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
        }
    }
});
//# sourceMappingURL=main.js.map