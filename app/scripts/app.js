'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('IonicEvtrs', [
        'ionic',
        'config',
        'restangular',
        'ui.tinymce',
        'ngResource',
        'ngCookies'
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
        RestangularProvider.setBaseUrl(ENV.apiEndpoint+'/api');
        RestangularProvider.setRestangularFields({id: '_id'});

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            // Each tab has its own nav history stack:
            .state('tab.articles', {
                url: '/articles',
                views: {
                    'tab-articles': {
                        templateUrl: 'templates/tab-articles.html',
                        controller: 'ArticleCtrl'
                    }
                }
            })
            .state('tab.article-detail', {
                url: '/article/:articleId',
                views: {
                    'tab-articles': {
                        templateUrl: 'templates/tab-detail.html',
                        controller: 'ArticleDetailCtrl'
                    }
                }
            })
            .state('tab.edit', {
                url: '/edit',
                views: {
                    'tab-edit': {
                        templateUrl: 'templates/tab-edit.html',
                        controller: 'ArticleEditCtrl'
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'

            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/articles');

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
                    $location.path('/login');
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
                    $location.path('/login');
                }
            });
        });
    });
