'use strict';
angular.module('IonicEvtrs')

    .filter('HtmlFilter', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);