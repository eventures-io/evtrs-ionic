'use strict';
angular.module('IonicEvtrs')

    .provider('Camera', function () {


        this.$get = function ($q) {
            return new Camera($q);
        };


        function Camera($q) {

            this.getPicture = function (options) {
                var q = $q.defer();

                navigator.camera.getPicture(function (result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            };
        }

    });





