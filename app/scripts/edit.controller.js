'use strict';
angular.module('IonicEvtrs')

    .controller('ArticleEditCtrl', function ($scope, $stateParams, ArticleResource, CameraService, GeoService, $http, $window, $compile, $q, $log, $ionicScrollDelegate) {
        $scope.article = {
            images: [],
            content: ''
        };
        $scope.saveAction = 'Save';
        $scope.submitted = false;
        $scope.showThumbnails = false;
        $scope.spinner = {};
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


        $scope.insertPicture = function () {
            var imageCount = $scope.article.images.length;
            if (imageCount < 3) {
                CameraService.getPicture().then(function (imageData) {
                    //TODO move to directive
                    var thumbnailContainer = angular.element(document.querySelector('.thumbnail-container'));
                    var thumbnail = angular.element('<div class="thumbnail"><img src="data:image/gif;base64,' + imageData + '"width="50" height="50"></div>');
                    thumbnailContainer.append(thumbnail);
                    $compile(thumbnail);
                    $scope.article.images[imageCount] = 'data:image/jpeg;base64,' + imageData;
                    $scope.showThumbnails = true;
                    $ionicScrollDelegate.resize();
                });
            }
        };

        $scope.save = function (form) {
            //todo Ionic form validation
            if (form.$valid) {
                if ($scope.saveAction === 'Save') {
                    $scope.article.publDate = new Date();

                    ArticleResource.save($scope.article)
                        .then(function (data) {
                            $scope.article = data;
                            $scope.saveAction = 'Update';
                        }
                    ).catch(function (error) {
                            $log.error('error posting: ' + JSON.stringify(error));
                        });
                }
                //update
                else {
                    $scope.article.modDate = new Date();
                    $scope.article.put().then(function (data) {
                        $scope.article = data;
                    }).catch(function (error) {
                            $log.error('error posting: ' + JSON.stringify(error));
                        });
                }
            }
        };

        $scope.findMatchingTypes = function (type) {
            $scope.spinner.show = true;
            return ArticleResource.findMatchingTypes(type).then(function (response) {
                $scope.spinner.show = false;
                return response;
            }, function (error) {
                $scope.spinner.show = false;
                $log.error('Error loading types for ' + type + ': ' + JSON.stringify(error));
            });
        };
    });
