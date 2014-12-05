'use strict';
angular.module('IonicEvtrs')

    .factory('GeoService', ['$q', function ($q) {
        return {
            getCurrentPosition: function () {
                var q = $q.defer();

                navigator.geolocation.getCurrentPosition(function (position) {
                        //
                        var finderyLocation = 'location[latitude]=' +
                            position.coords.latitude +
                            '&location[longitude]=' +
                            position.coords.longitude;
                        q.resolve(finderyLocation);

                    },
                    function (error) {
                        q.reject(
                            'code: ' + error.code +
                                'message: ' + error.message
                        );
                    });

                return q.promise;
            }
        };
    }]);









