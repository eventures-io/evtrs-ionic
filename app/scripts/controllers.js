'use strict';
angular.module('IonicEvtrs')

    .controller('ArticleCtrl', function ($scope, ArticleService) {
        ArticleService.getRecent().then(function (data) {
            $scope.articles = data;
        });
    })

    .controller('ArticleDetailCtrl', function ($scope, $stateParams, ArticleService) {
        ArticleService.getById($stateParams.articleId).then(function (data) {
            $scope.article = data;
        });
    })

    .controller('AppCtrl', function($scope, $ionicModal, Auth) {
        // Form data for the login modal
        $scope.user = {};
        $scope.errors = {};
        $scope.loginError = false;

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
                $scope.modal = modal;
            });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        },

            // Open the login modal
            $scope.login = function() {
                $scope.modal.show();
            };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {

            Auth.login({
                email: $scope.user.email,
                password: $scope.user.password
            })
                .then(function () {
                    // Logged in, redirect to home
                    //TODO replay latest request if redirected to login from protected url
                    // $location.path('/');
                })
                .catch(function (err) {
                    $scope.errors.login = err.message;
                    $scope.loginError = true;
                    //$scope.modal.show();

                });
        }


    })






