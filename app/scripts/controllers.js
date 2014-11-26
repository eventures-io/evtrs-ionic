'use strict';
angular.module('IonicEvtrs')

    .controller('DashCtrl', function ($scope) {
        $scope.jshint = '';
    })

    .controller('ArticleCtrl', function ($scope, ArticleService) {
         ArticleService.getRecent().then(function(data){
             $scope.articles = data;
         });
    })

    .controller('ArticleDetailCtrl', function ($scope, $stateParams, ArticleService) {
        ArticleService.getById($stateParams.articleId).then(function(data){
            $scope.article = data;

        } );
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.jshint = '';
    });




