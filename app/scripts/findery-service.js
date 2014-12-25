'use strict';
angular.module('IonicEvtrs')

    .factory('FinderyService', function ($q, $http, $log) {

        var client_id = 'p7A3-whdLB-YmDHlP6ubEOoEbtaA6pR3gA5ONjIIC';
        var client_secret = '_-h8Y9bY8SxV8oW6lzBoCKuSu0RPsOK5bfomWthx9t6vzcw1_YMk5PWRdWeGnHih4r8';

        var loginUrl = 'https://findery.com/oauth/authorize?client_id=' +
            client_id +
            '&response_type=code&redirect_url=' +
            'oauthRedirectURL' +
            'l&scope=notes delete';

        var formatLocation = function (position) {
            return 'location[latitude]=' +
                position.coords.latitude +
                '&location[longitude]=' +
                position.coords.longitude;
        }

        return {

            doAuthRequest: function (code) {
                var deferred = $q.defer();
                //TODO move findery url to config
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
            },
            postNote: function (access_token, title, content, position, visibility) {
                var deferred = $q.defer();


                $http.post(
                    'https://api.findery.com/v2/notes',
                    {title: title,
                        message: content,
                        visibility: visibility,
                        location: formatLocation(position)
                    },
                    {
                        transformRequest: angular.identity,
                        headers: {'Authorization': 'Bearer ' + access_token}
                    })

//                $http.post('https://api.findery.com/v2/notes',{
//                    headers: {
//                        'Authorization': 'Bearer ' +  access_token},
//                    data: {title: title,
//                        message: content,
//                        visibility: visibility,
//                        location: formatLocation(position)
//                    }
//                })
                    .
                    success(function (data, status, headers, config) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        $log.error('status: ' + status + ' ,headers: ' + headers + ' ,' + config);
                        deferred.reject(status + ' ' + config);
                    });

                return deferred.promise;
            }
        }

    });