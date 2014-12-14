'use strict';
angular.module('IonicEvtrs')

    .factory('FinderyService', function ($q, $http, GeoService) {

        var client_id = 'p7A3-whdLB-YmDHlP6ubEOoEbtaA6pR3gA5ONjIIC';
        var client_secret = '_-h8Y9bY8SxV8oW6lzBoCKuSu0RPsOK5bfomWthx9t6vzcw1_YMk5PWRdWeGnHih4r8';

        var formatLocation = function (position) {
            return 'location[latitude]=' +
                position.coords.latitude +
                '&location[longitude]=' +
                position.coords.longitude;
        };

        var loginUrl = 'https://findery.com/oauth/authorize?client_id=' +
            client_id +
            '&response_type=code&redirect_url=' +
            'oauthRedirectURL' +
            'l&scope=notes delete';

        var authRequest = function (code) {
            var deferred = $q.defer();
            $http.post('https://findery.com/oauth/access_token', {
                grant_type: 'authorization_code',
                code: code,
                client_id: client_id,
                client_secret: client_secret
            }).
                success(function (accessToken) {
                    deferred.resolve(accessToken);
                }).
                error(function (err) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        var postNote = function (access_token, title, content, position, visibility) {
            var deferred = $q.defer();

            $http.post('https://api.findery.com/v2/notes', {
                access_token: access_token,
                title: title,
                message: content,
                visibility: visibility,
                location: formatLocation(position)
            }).
                success(function (response) {
                    deferred.resolve(response);
                }).
                error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };
        return {
            loginUrl : loginUrl,
            authRequest : authRequest,
            postNote: postNote
        };

    });