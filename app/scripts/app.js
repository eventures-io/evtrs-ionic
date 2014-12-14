'use strict';

angular.module('IonicEvtrs', [
        'ionic',
        'config',
        'restangular',
        'ui.tinymce',
        'ngResource'
    ])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider, ENV) {

        $httpProvider.interceptors.push('authInterceptor');
        RestangularProvider.setBaseUrl(ENV.apiEndpoint + '/api');
        RestangularProvider.setRestangularFields({id: '_id'});


        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            }).state('app.list', {
                url: '/list',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/articles.html',
                        controller: 'ArticleCtrl'
                    }
                }
            })
            .state('app.article', {
                url: '/article/:articleId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/article-detail.html',
                        controller: 'ArticleDetailCtrl'
                    }
                }
            })
            .state('app.post', {
                url: '/post',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/article-edit.html',
                        controller: 'ArticleEditCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/list');

    })

    .factory('authInterceptor', function ($rootScope, $q, $location, $window) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                  //  $location.path('/login');
                    // remove any stale tokens
                    $window.localStorage.token = undefined;
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn) {
                 // AppCtrl.login();
                }
            });
        });
    });
