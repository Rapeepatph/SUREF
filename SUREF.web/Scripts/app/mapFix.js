app.controller('mapController', ['$scope', '$http', 'leafletData', '$q', 'httpFactory', function ($scope, $http, leafletData, $q, httpFactory) {
    var items = [];
    var qlist = [];
    var plot = {};
    $scope.paths = [];
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
                icon: icons.blue,
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
                icon: icons.red,
                message: "[SSR]"+getDateTime(ap[0]) + " - [ " + ap[1] + ", " + ap[2] + " ]"
            });
        });
    };

    var uploadAdsb = function (points) {
        angular.forEach(points, function (element) {
            plot = {
                layer: 'adsb',
                lat: element.Lat,
                lng: element.Lng,
                icon: icons.adsb,
                message: element.Name + " [ ADSB | SIC =" + element.SIC + "]"
            };
            items.push(plot);
            var circlePlot = {
                type: 'circle',
                radius: 500 * 1000,
                latlngs: {
                    lat: element.Lat,
                    lng: element.Lng
                },
                layer: 'coverageADSB',
                opacity: 0.2,
                weight:0.3,
                fillColor: 'blue',
                fillOpacity:0.1
            }
            $scope.paths.push(circlePlot);
        });
    }

    var uploadSSR = function (points) {
        angular.forEach(points, function (element) {
            plot = {
                layer: 'ssr',
                lat: element.Lat,
                lng: element.Lng,
                icon: icons.ssr,
                message: element.Name + " [ SSR | SIC =" + element.SIC + "]"
            };
            items.push(plot);
            var circlePlot = {
                type: 'circle',
                radius: 500 * 1000,
                latlngs: {
                    lat: element.Lat,
                    lng: element.Lng
                },
                layer: 'coverageSSR',
                opacity: 0.1,
                weight: 0.3,
                fillColor: 'red',
                fillOpacity: 0.1
            }
            $scope.paths.push(circlePlot);
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
            iconSize: [20, 30]
        },
        ssr: {
            iconUrl: '/images/red-marker.png',
            iconSize: [30, 30]
        }
    }

    var pathsDict = {
        circle: {
            type: "circle",
            radius: 500 * 1000,
            latlngs: {
                lat: 13.715560,
                lng: 100.540599
            }
        }
    }

    


    var init = function () {
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
                    },
                    coverageSSR: {
                        type: 'group',
                        name: 'CoverageSSR',
                        visible: false
                    },
                    coverageADSB: {
                        type: 'group',
                        name: 'CoverageADSB',
                        visible: false
                    }
                },
},
            toggleLayer: function (type) {
                $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
            }
        });

        qlist.push($http.get('/Data/21_136.json'));
        qlist.push($http.get('/Data/62_106.json'));
        qlist.push($http.get('/Map/getAdsb'));
        qlist.push($http.get('/Map/getSSR'));

        $q.all(qlist).then(function success(res) {
            adsbTrack(res[0].data);
            ssrTrack(res[1].data);
            uploadAdsb(res[2].data);
            uploadSSR(res[3].data);
            //leafletData.getMap("map").then(
            //    function (map) {
            //        var coverage = new L.layerGroup();
            //        for (var n = 0; n < circlePlots.length; n++) {
            //            var circle = L.circle([circlePlots[n].lat,circlePlots[n].lng], {
            //                color: 'green',
            //                fillColor: '#f03',
            //                fillOpacity: 0.5,
            //                radius: 50000
            //            }).addTo(coverage);
            //        }
            //        var baseLayers = {

            //        };
            //        var overlays = {
            //            "Coverage": coverage
            //        };
            //        L.control.layers(baseLayers, overlays).addTo(map);
            //    }
            //   );

           }, function error(response) {}
        ).finally(function () {});
        console.log(items);
        $scope.markers = items;


        httpFactory.http('/Map/getSSR').then(function(result){
            console.log(result.length);
        });
    };
    init();
}]);

