'use strict';
angular.module('IonicEvtrs')

    .controller('ArticleEditCtrl', function ($scope, $stateParams, ArticleService, CameraService, GeoService, $http, $window, $compile) {
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
            $scope.article.content = 'Init';
            $scope.saveAction = 'Save';
            $scope.submitted = false;
            $scope.showThumbnails = false;
        };

        $scope.initialize();
        $scope.insertPicture = function () {

         CameraService.getPicture().then(function (imageData) {
            var thumbnailContainer = angular.element(document.querySelector('.thumbnail-container'));
            var thumbnail = angular.element('<div class="thumbnail"><img src="data:image/gif;base64,' + imageData + '"width="50" height="50"></div>');
            thumbnailContainer.append(thumbnail);
            $compile(thumbnail);
            $scope.showThumbnails=true;
          });
        }

        $scope.save = function (form) {

            var client_id = 'p7A3-whdLB-YmDHlP6ubEOoEbtaA6pR3gA5ONjIIC';
            var client_secret = '_-h8Y9bY8SxV8oW6lzBoCKuSu0RPsOK5bfomWthx9t6vzcw1_YMk5PWRdWeGnHih4r8';
            var location;
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.saveAction === 'Save') {
                    $scope.article.publDate = new Date();
                    GeoService.getCurrentPosition().then(function (finderyLocation) {
                        location = finderyLocation;
                    });

                    var oauthRedirectURL;
                    var postAuthRequest = function (code) {
                        $http.post('https://findery.com/oauth/access_token', {
                            grant_type: 'authorization_code',
                            code: code,
                            client_id: client_id,
                            client_secret: client_secret
                        }).
                            success(function (data) {
                                $window.localStorage.finderyToken = data.access_token;
                                postToFindery(data.access_token);
                            }).
                            error(function (err) {
                                console.log(err);
                            });
                    }

                    var postToFindery = function (access_token) {

                        $http.post('https://api.findery.com/v2/notes', {
                            access_token: access_token,
                            title: $scope.article.title,
                            message: $scope.article.content,
                            visibility: 'self',
                            location: location
                        }).
                            success(function (data) {
                                alert('findery post success');
                            }).
                            error(function (err) {
                                console.log(err);
                            });
                    }


                    if (!$window.localStorage.finderyToken) {

                        var login_url = 'https://findery.com/oauth/authorize?client_id=' +
                            client_id +
                            '&response_type=code&redirect_url=' +
                            oauthRedirectURL +
                            'l&scope=notes contacts delete';
                        var loginWindow = window.open(login_url, '_blank', 'location=yes');

                        loginWindow.addEventListener('loadstart', function (event) {
                            var url = event.url;
                            if (url.indexOf("code=") > 0 || url.indexOf("error=") > 0) {
                                loginWindow.close();
                                var code = url.split("code=")[1];
                                postAuthRequest(code);
                            }
                        });


                    } else {
                        postToFindery($window.localStorage.finderyToken);
                    }
                    ArticleService.save($scope.article)
                        .then(function (data) {
                            $scope.article = data;
                            $scope.saveAction = 'Update';
                        }
                    );
                }
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
