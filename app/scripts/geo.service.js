'use strict';
angular.module('IonicEvtrs')

    .factory('GeoService', ['$q', function ($q) {
        return {
            getCurrentPosition: function () {
                var deferred = $q.defer();

                navigator.geolocation.getCurrentPosition(function (position) {
                        deferred.resolve(position);
                    },
                    function (error) {
                        deferred.reject(
                            'code: ' + error.code +
                                'message: ' + error.message
                        );
                    });

                return deferred.promise;
            }
        };
    }]);









