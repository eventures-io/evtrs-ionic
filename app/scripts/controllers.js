'use strict';
angular.module('IonicEvtrs')

    .controller('ArticleCtrl', function ($scope, ArticleResource) {
        ArticleResource.recent().then(function (data) {
            $scope.articles = data;
        });
    })

    .controller('ArticleDetailCtrl', function ($scope, $stateParams, ArticleResource) {
        ArticleResource.get($stateParams.articleId).then(function (data) {
            $scope.article = data;
        });
    })

    .controller('AppCtrl', function ($scope, $ionicModal, Auth, $ionicSideMenuDelegate, $log) {

        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
                $log.debug('controller instance created');
                $scope.modal = modal;
            });

        // Form data for the login modal
        $scope.user = {};
        $scope.errors = {};
        $scope.loginError = false;

        $scope.$on('REQUEST_AUTH', function () {
                login();
        });

        // Triggered in the login modal to close it
        var closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        var login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {

            Auth.login({
                email: $scope.user.email,
                password: $scope.user.password
            })
                .then(function () {
                    $scope.errors = {};
                    closeLogin();
                })
                .catch(function (err) {
                    $scope.errors.login = err.message;
                    $scope.loginError = true;
                });
        };


        $scope.toggleMenuLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };


    });






