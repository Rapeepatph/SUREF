﻿
var surfServices = angular.module('surf.services', ['ng', 'ngResource']);

surfServices.factory('httpFactory', ['$http', '$q', function ($http, $q) {
    return {
        parse: function (url) {

            var deferred = $q.defer();
            $http.get(url)
                .success(function (data) {
                    deferred.resolve(data);
                }).error(function (msg) {
                    deferred.reject(msg);
                });
            return deferred.promise;
        }
    };
}]);


