'use strict';
angular.module('IonicEvtrs')

    .factory('ArticleResource', function(Restangular) {

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

    var recent = function (){
        return articles.customGETLIST('query/recent');
    };

    return {
        getById : getById,
        save : save,
        update : update,
        recent : recent
    };
});