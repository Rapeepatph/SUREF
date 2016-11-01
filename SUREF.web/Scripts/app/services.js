var surefServices = angular.module('suref.aervices', ['ng', 'ngResource']);

surefServices.factory('resourceFactory', ['$resource', '$q', function ($resource, $q){
    var service = {};

    var resources = {
        "adsbData": $resource('/api/adsbDataApi', {}, {
            get: { method: 'GET', isArray: true }
        })
    };
    service.get = function (key) {
        var deferred = $q.defer();
        resources[key].get({},
            function success(response) {
                deferred.resolve(response);
            },
            function error(msg) {
                deferred.reject(msg);
            }
        );
        return deferred.promise;
    };

    service.get = function (key, item) {
        var deferred = $q.defer();
        resources[key].get(item,
            function success(response) {
                deferred.resolve(response);
            },
            function error(msg) {
                deferred.reject(msg);
            }
        );
        return deferred.promise;
    };

    service.create = function (key, newItem) {
        var deferred = $q.defer();
        resources[key].create(newItem,
            function success(response) {
                deferred.resolve(response);
            },
            function error(msg) {
                deferred.reject(msg);
            }
        );
        return deferred.promise;
    };

    service.update = function (key, newItem) {
        var deferred = $q.defer();
        resources[key].update(newItem,
            function success(response) {
                deferred.resolve(response);
            },
            function error(msg) {
                deferred.reject(msg);
            }
        );
        return deferred.promise;
    };
    service.delete = function (key, item) {
        var deferred = $q.defer();
        resources[key].delete(item,
            function success(response) {
                deferred.resolve(response);
            },
            function error(msg) {
                deferred.reject(msg);
            }
        );
        return deferred.promise;
    };
    return service;
}]);

surefServices.factory('httpFactory', ['$http', '$q', function ($http, $q) {
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


