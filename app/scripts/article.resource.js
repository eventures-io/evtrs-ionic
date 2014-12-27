'use strict';
angular.module('IonicEvtrs')

    .factory('ArticleResource', function (Restangular) {

        var articles = Restangular.all('articles');

        return {
            get: function (articleId) {
                return articles.one(articleId).get();
            },

            save: function (article) {
                return articles.post(article);
            },

            update: function (article) {
                return articles.put(article);
            },

            recent: function () {
                return articles.customGETLIST('query/recent');
            }

        };
    });