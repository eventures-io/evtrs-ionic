'use strict';
angular.module('IonicEvtrs')

    .controller('ArticleEditCtrl', function ($scope, $stateParams, ArticleService, CameraService, GeoService, $http, $window, $compile, FinderyService, $q, $log) {
        $scope.tinymceOptions = {
            theme: 'modern',
            plugins: [
                'insertdatetime directionality'
            ],
            menubar: false,
            toolbar: 'bold italic bullist numlist outdent indent',
            statusbar: false,
            height: 300
        };

        $scope.initialize = function () {
            $scope.article = {};
            $scope.article.content = '';
            $scope.saveAction = 'Save';
            $scope.submitted = false;
            $scope.showThumbnails = false;
        };

        $scope.initialize();
        $scope.insertPicture = function () {

            CameraService.getPicture().then(function (imageData) {
                //TODO move to directive
                var thumbnailContainer = angular.element(document.querySelector('.thumbnail-container'));
                var thumbnail = angular.element('<div class="thumbnail"><img src="data:image/gif;base64,' + imageData + '"width="50" height="50"></div>');
                thumbnailContainer.append(thumbnail);
                $compile(thumbnail);
                $scope.showThumbnails = true;
            });
        }

        $scope.save = function (form) {
            //todo Ionic form validation
            if (form.$valid) {
                if ($scope.saveAction === 'Save') {
                    $scope.article.publDate = new Date();

                    var resolveFinderyToken = function () {

                        if (!$window.localStorage.finderyToken) {
                            var loginWindow = window.open(FinderyService.loginUrl, '_blank', 'location=yes');
                            loginWindow.addEventListener('loadstart', function (event) {
                                var url = event.url;
                                if (url.indexOf("code=") > 0 || url.indexOf("error=") > 0) {
                                    loginWindow.close();
                                    var code = url.split("code=")[1];
                                    return FinderyService.postAuthRequest(code);
                                }
                            });
                            //in browser testing
//                            var deferred = $q.defer();
//                            deferred.resolve('ezwQKwuGIxc-Z11PYWDzZJ4993ziVgNsP6zzY3-WHfmf8Ug41bitNmo6lqcy19xhhZs');
//                            return deferred.promise;

                        } else {
                            var deferred = $q.defer();
                            deferred.resolve($window.localStorage.finderyToken);
                            return deferred.promise;
                        }

                    }
                    var positionPromise = GeoService.getCurrentPosition();
                    var tokenPromise = resolveFinderyToken();
                    //TODO name (alias) promises
                    $q.all([
                            positionPromise ,
                            tokenPromise
                        ]).then(function (result) {
                            var accessToken;
                            var position;
                            angular.forEach(result, function (response) {
                                $log.debug(response);
                                if (response.hasOwnProperty('coords')) {
                                    position = response;
                                } else {
                                    accessToken = response;
                                }

                            })
                            return FinderyService.postNote(accessToken, $scope.article.title, $scope.article.content, position, 'self');
                        })
                        .then(function (tmpResult) {
                            return ArticleService.save($scope.article);
                        })
                        .then(function (data) {
//                            $scope.article = data;
//                            $scope.saveAction = 'Update';
                        }
                    ).catch(function (error) {
                            $log.error('error posting to findery: ' + error);
                        });
                }
                //update
                else {
                    $scope.article.modDate = new Date();
                    $scope.article.put();
                }
            }
        };
    })


//                    // Trying to calculate oauthRedirectURL based on the current URL.
//                    var index = document.location.href.indexOf('index.html');
//                    alert('current url : ' + document.location.href);
//                    if (index > 0) {
//                        oauthRedirectURL = document.location.href.substring(0, index) + 'oauthcallback.html';
//                    } else {
//                        return alert("Can't reliably infer the OAuth redirect URI. Please specify it explicitly in openFB.init()");
//                    }


//            tinymce.activeEditor.focus();
//            tinymce.activeEditor.execCommand('insertHTML', false, '<img src="data:image/gif;base64,' + imageData + ' "width="300" height="500">');

//        var imageData = 'R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7';
