'use strict';
angular.module('IonicEvtrs')

.factory('CameraService', ['$q', function($q) {
    return {
        getPicture: function() {
            var q = $q.defer();
            var options = {
                destinationType: 0,
                quality: 25,
                saveToPhotoAlbum: false
            };
            navigator.camera.getPicture(function(result) {
                // Do any magic you need
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    };
}]);