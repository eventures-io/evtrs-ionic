//'use strict';
//angular.module('IonicEvtrs')
//    /* Decorator for Textangular.
//    Customize menu buttons and custom insertImage*/
//    .config(['$provide',
//    function($provide) {
//        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', 'Camera',
//            function(taRegisterTool, taOptions, Camera) {
//
//                taOptions.toolbar = [
//                    ['clear', 'h1', 'h2', 'h3', 'ul', 'ol', 'bold', 'italics']
//                ];
//
//                taRegisterTool('customInsertImage', {
//                    iconclass: 'fa fa-picture-o',
//                    action: function() {
//                        var textAngular = this;
//                        console.log('Getting camera');
//                        Camera.getPicture().then(function(imageUrl) {
//                            console.log(imageUrl);
//                            textAngular.$editor().wrapSelection('insertImage', imageUrl);
//                        }, function(err) {
//                            console.err(err);
//                        }, {
//                            quality: 75,
//                            targetWidth: 320,
//                            targetHeight: 320,
//                            saveToPhotoAlbum: false
//                        });
//                        return false;
//                    }
//                });
//                taOptions.toolbar[0].push('customInsertImage');
//                return taOptions;
//            }
//        ]);
//    }
//]);
