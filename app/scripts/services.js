'use strict';
angular.module('IonicEvtrs')

    .filter('HtmlFilter', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);


angular.module('IonicEvtrs')

    .factory('ArticleService', function(Restangular) {

        var articles = Restangular.all('articles');

        var getById = function (articleId) {
            return articles.one(articleId).get();
        };

        var save = function (article) {
            return articles.post(article);
        };

        var update = function (article) {
            return articles.put(article);
        };

        var getRecent = function (){
            return articles.customGETLIST('query/recent');
        };

        return {
            getById : getById,
            save : save,
            update : update,
            getRecent : getRecent
        };
    });