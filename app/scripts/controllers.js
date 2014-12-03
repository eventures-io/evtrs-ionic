'use strict';
angular.module('IonicEvtrs')

    .controller('DashCtrl', function ($scope) {
        $scope.jshint = '';
    })

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

    .controller('ArticleEditCtrl', function ($scope, $stateParams, ArticleService, CameraService) {
        $scope.tinymceOptions = {
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor'
            ],
            menubar: false,
            toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent insertpicture',
            setup: function (editor) {

                editor.addButton('insertpicture', {
                    title: 'Insert Picture',
                    label: 'lable',
                    image: '/images/camera.png',
                    onclick: function () {
                        console.log('Getting camera');

                        CameraService.getPicture().then(function (imageData) {
                            editor.focus();
                            editor.execCommand('insertHTML', false, '<img src="data:image/gif;base64,' + imageData + ' "width="300" height="500">');
                          //  editor.execCommand('insertHTML', false, '<img src=' + imageData + ' "width="300" height="500">');
                        });
                    }
                });
            },
            statusbar: false
            //convert_urls : false
        };

        $scope.initialize = function () {
            $scope.article = {};
            $scope.saveAction = 'Save';
            $scope.submitted = false;
        };

        $scope.initialize();

        $scope.save = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.saveAction === 'Save') {
                    $scope.article.publDate = new Date();
                    ArticleService.save($scope.article)
                        .then(function (data) {
                            $scope.article = data;
                            $scope.saveAction = 'Update';
                        }
                    );
                }
//                else {
//                    $scope.article.modDate = new Date();
//                    $scope.article.put();
//                }
            }
        };
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.jshint = '';
    });




