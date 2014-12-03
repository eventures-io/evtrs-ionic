'use strict';
angular.module('IonicEvtrs')
    .factory('ArticleService', function(ArticleResource) {

        var getById = function (articleId) {
            return ArticleResource.getById(articleId);
        };

        var save = function (article) {
            return ArticleResource.save(article);
        };

        var update = function (article) {
            return ArticleResource.update(article);
        };

        var getRecent = function (){
            return ArticleResource.recent();
        };

        return {
            getById : getById,
            save : save,
            update : update,
            getRecent : getRecent
        };
    });