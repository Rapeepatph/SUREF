﻿app.controller('mapController', function ($scope,$http) {
    var items = [];
    var adsb = [];
    var getDateTime = function (s) {
        var d = moment.utc(s, "YYYY/MM/DD HH:mm:ss.SSS");
        return d.format("DD MMM YYYY HH:mm:ss.SSS");
    };
    
    var adsbTrack = function (points) {
        return points.map(function (ap) {
            return items.push({
                layer: 'track',
                lat: ap[1],
                lng: ap[2],
                icon: icons.red,
                message: "[ADSB]"+getDateTime(ap[0]) + " - [ " + ap[1] + ", " + ap[2] + " ]"
            });
        });
    };
    
    var ssrTrack = function (points) {
        return points.map(function (ap) {
            return items.push({
                layer: 'track',
                lat: ap[1],
                lng: ap[2],
                icon: icons.blue,
                message: "[SSR]"+getDateTime(ap[0]) + " - [ " + ap[1] + ", " + ap[2] + " ]"
            });
        });
    };

    var uploadAdsb = function (points) {
        angular.forEach(points, function (element) {
            var plot ={
                layer: 'adsb',
                lat: element.Lat,
                lng: element.Lng,
                icon: icons.adsb,
                message: element.Name
            }
            items.push(plot);
        });
    }

    var icons = {
        blue:{
            type: 'div',
            iconSize: [10, 10],
            className: 'blue',
            iconAnchor:  [5, 5]
        },
        red: {
            type: 'div',
            iconSize: [10, 10],
            className: 'red',
            iconAnchor:  [5, 5]
        },
        adsb: {
            iconUrl: '/images/marker-icon.png',
            iconSize: [20, 20]
        },
        ssr: {
            iconUrl: '/images/red-marker.png',
            iconSize: [10, 10]
        }
    }

    angular.extend($scope, {
        bangkok: {
            lat: 13.715560,
            lng: 100.540599,
            zoom: 6
        },
        layers: {
            baselayers: {
                openStreetMap: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            },
            overlays: {
                ssr: {
                    type: 'group',
                    name: 'SSR',
                    visible: false
                },

                adsb: {
                    type: 'group',
                    name: 'ADS-B',
                    visible: false
                },
                track: {
                    type: 'group',
                    name: 'Track',
                    visible: false
                }
            }
        },

        toggleLayer: function (type) {
            $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
        }
    });

    $http.get('/Data/21_136.json')
       .then(function (res) {
           adsbTrack(res.data);
           console.log(res.data);
       });
    $http.get('/Data/62_106.json')
       .then(function (res) {
           ssrTrack(res.data);
           console.log(res.data);
       });
    $http.get('/Map/getAdsb')
       .then(function (res) {
           uploadAdsb(res.data);
       });
    $scope.markers = items;
    console.log(items);
});