app.controller('mapController', ['$scope', '$http', 'leafletData', '$q', 'httpFactory', '$compile', '$rootScope','$routeParams', function ($scope, $http, leafletData, $q, httpFactory, $compile, $rootScope, $routeParams) {
    var staticitems = [];
    var dynamicitems = [];
    var staticlist = [];
    var dynamiclist = [];
    var result = [];
    var plot = {};
    var staticPath = [];
    var dynamicPath = [];
    var AircraftID = $("#myId").val();
    var getDateTime = function (s) {
        var d = moment.utc(s, "YYYY/MM/DD HH:mm:ss.SSS");
        return d.format("DD MMM YYYY HH:mm:ss.SSS");
    };

    var getTimeForChart = function (s) {
        var d = moment.utc(s, "YYYY/MM/DD HH:mm:ss.SSS");
        return d.valueOf();
    }
    $scope.date = "20161115";
    //$scope.FlightID = "71bd61";
    $scope.paths = [];
    $scope.adsbDataChart = [];
    $scope.ssrDataChart = [];
    $scope.chartConfig = {
        options: {
            chart: {
                type:'scatter'
            },
            tooltip: {
                formatter: function () {
                    return "Time = "+moment(this.x).utc().format('HH:mm:ss.SSS') + ", Altitude = " + this.y;
                }
            }
            
        },
        title: {
            text: 'Flight Level Versus Time of Flight ID ' + AircraftID
        },
        series: [
            {
                data: $scope.adsbDataChart,
                name: 'ADSB',
                color:'blue',
                marker: {
                    enabled: true,
                    radius: 2
                }
            },
            {
                data: $scope.ssrDataChart,
                name: 'SSR',
                color:'red',
                marker: {
                    enabled: true,
                    radius: 2
                }
            }
        ],
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L"
            }
        },
        yAxis:{
            title: {
                text: 'Flight Level'
            },
            tickInterval: 20,
            allowDecimals: true
        },
        loading: true,
        //size: {
        //    width: 400,
        //    height: 300
        //},
    };
 
    //test chart another technique
    $scope.chartOptions = {
        title: {
            text: 'Height Data'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    };
    $scope.pieData = [{
        name: "Microsoft Internet Explorer",
        y: 56.33
    }, {
        name: "Chrome",
        y: 24.03,
        sliced: true,
        selected: true
    }, {
        name: "Firefox",
        y: 10.38
    }, {
        name: "Safari",
        y: 4.77
    }, {
        name: "Opera",
        y: 0.91
    }, {
        name: "Proprietary or Undetectable",
        y: 0.2
    }];
    $scope.columnData = [{
        name: AircraftID,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }]
    //end


    
    var getLine = function (list, lat, lng, sic, color, text,width,dash)
    {
        var target = list.filter(x => x.SIC == sic);
        if (target.length != 0) {
            var p1 = {
                layer: 'track',
                color: color,
                weight: width,
                latlngs: [
                    { lat: target[0].Lat, lng: target[0].Lng },
                    { lat: lat, lng: lng }
                ],
                dashArray: dash,
                message: text
            };
            return p1;
        }

    }
    var getColor = function (ssrList, adsbList,sic) {
        var ssrTarget = ssrList.filter(x => x.SIC == sic);
        if (ssrTarget.length != 0) {
            return 'red';
        }
        else {
            return 'blue';
        }
    }
    $scope.createPathToSur = function (lat, lng, sic, typ, sicList,cat) {
        var adsbList = staticlist[0].$$state.value.data;
        var ssrList = staticlist[1].$$state.value.data;
        var list = ssrList.concat(adsbList);
        var color = '';
        dynamicPath = [];
        
        color = getColor(ssrList, adsbList, sic);

        var line = getLine(list, lat, lng, sic,color,'selected',6,null);
        if (line != null) dynamicPath.push(line);
        var aList = sicList.split('_');
        console.log(aList);
        aList.forEach(function (entry) {
            if (entry != sic) {
                color = getColor(ssrList, adsbList, entry);
                var templine = getLine(list, lat, lng, entry, color, 'available',3,'5,10');
                if (templine != null) dynamicPath.push(templine);
            }
        });        

        $scope.paths = mergeList(staticPath, dynamicPath);
    };
    
    var mergeList = function (staticData, dynamicData) {
        result = [];
        staticData.forEach(function (entry) { result.push(entry) });
        dynamicData.forEach(function (entry) { result.push(entry) });
        return result;
    }
    
    var getPathtoSur = function (ap, type) {

        var sicList = ap[5].join('_');
        sicList = "'" + sicList + "'";
        var adsbTitle = '<span  class="glyphicon glyphicon-th-large" ng-click="createPathToSur(' + ap[1] + ',' + ap[2] + ',' + ap[4] + ',' + 0 + ',' +sicList +','+ap[6]+ ')"></span>';
        var adsbLinkFn = $compile(angular.element(adsbTitle));
        var adsbPopup = adsbLinkFn($scope);

        var ssrTitle = '<span  class="glyphicon glyphicon-th-large" ng-click="createPathToSur(' + ap[1] + ',' + ap[2] + ',' + ap[4] + ',' + 1 + ',' + sicList + ',' + ap[6] + ')"></span>';
        var ssrLinkFn = $compile(angular.element(ssrTitle));
        var ssrPopup = ssrLinkFn($scope);

        if (type == "adsb")
        {
            return "[ADSB] <p> Last update : " + getDateTime(ap[0]) + "<p> Position : " + ap[1] + ", " + ap[2] + "<p> " + "Height :" + ap[3] + "<p> SIC :" + ap[4] + "<p>" + adsbPopup[0].outerHTML;
            
        }
        else
        {
            return "[SSR] <p> Last update : " + getDateTime(ap[0]) + "<p> Position : " + ap[1] + ", " + ap[2] + "<p> " + "Height :" + ap[3] + "<p> SIC :" + ap[4] + "<p>" + ssrPopup[0].outerHTML;
        }
    };
        
    var adsbTrack = function (points) {
        if (points.length > 0)
        {
            return points.map(function (ap) {
                var plot = [getTimeForChart(ap[0]),parseFloat(ap[3])];
                $scope.adsbDataChart.push(plot);
                return dynamicitems.push({
                    layer: 'track',
                    lat: ap[1],
                    lng: ap[2],
                    icon: icons.blue,
                    message: getPathtoSur(ap, "adsb"),
                    getMessageScope: function () { return $scope; }
                });
            });
        }
        else {
            return
            console.log("Error about data of track. ADSB has not a data");
        }
        
    };
    
    var ssrTrack = function (points) {
        if (points.length > 0) {
            return points.map(function (ap) {
                var plot = [getTimeForChart(ap[0]), parseFloat(ap[3])];
                $scope.ssrDataChart.push(plot);
                return dynamicitems.push({
                    layer: 'track',
                    lat: ap[1],
                    lng: ap[2],
                    icon: icons.red,
                    message: getPathtoSur(ap, "ssr"),
                    getMessageScope: function () { return $scope; }
                });
            });
        }
        else {
            return
            console.log("Error about data of track. SSR has not a data");
        }
    };

    var uploadAdsb = function (points) {
        if (points.length >0 )
        {
            angular.forEach(points, function (element) {
                plot = {
                    layer: 'adsb',
                    lat: element.Lat,
                    lng: element.Lng,
                    icon: icons.adsb,
                    message: element.Name + " [ ADSB | SIC =" + element.SIC + "]"
                };
                staticitems.push(plot);
                var circlePlot = {
                    type: 'circle',
                    radius: 300 * 1000,
                    latlngs: {
                        lat: element.Lat,
                        lng: element.Lng
                    },
                    layer: 'coverageADSB',
                    opacity: 0.2,
                    weight: 0.3,
                    fillColor: 'blue',
                    fillOpacity: 0.1
                }
                staticPath.push(circlePlot);
            });
        }
        else {
            console.log("Error ADSBPosition data upload");
        }
    }

    var uploadSSR = function (points) {
        if (points.length > 0) {
            angular.forEach(points, function (element) {
                plot = {
                    layer: 'ssr',
                    lat: element.Lat,
                    lng: element.Lng,
                    icon: icons.ssr,
                    message: element.Name + " [ SSR | SIC =" + element.SIC + "]"
                };
                staticitems.push(plot);
                var circlePlot = {
                    type: 'circle',
                    radius: 250 * 1000,
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
                staticPath.push(circlePlot);
            });
        }
        else {
            console.log("Error SSRPosition data upload");
        }
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
            iconUrl: '/images/map-marker-icon.png',
            iconSize: [30, 30]
        },
        tri: {
            type: 'div',
            iconSize: [10, 10],
            className: 'triangle',
            iconAnchor: [5, 5]
        }
    }

    $scope.loadData = function () {
        dynamiclist = [];
        dynamicPath = [];
        $scope.ssrDataChart.length = 0;
        $scope.adsbDataChart.length = 0;
        console.log($scope.adsbDataChart);
        $scope.chartConfig.title.text = 'Flight Level Versus Time of Flight ID ' + AircraftID;
        dynamiclist.push($http.get('/Map/getTrack?sensor=1&date=' + $scope.date + '&id=' + AircraftID));
        dynamiclist.push($http.get('/Map/getTrack?sensor=2&date=' + $scope.date + '&id=' + AircraftID));
        $q.all(dynamiclist).then(function success(res) {
            dynamicitems = [];
            adsbTrack(res[0].data);
            ssrTrack(res[1].data);
            $scope.markers = mergeList(staticitems, dynamicitems);
            $scope.paths = mergeList(staticPath, dynamicPath);

        }, function error(response) { }
        ).finally(function () { });
    };
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
                        visible: true
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
                decorations: {
                    markers: {
                        coordinates: [[51.9, -0.4], [51.505, -0.09], [51.0, -0.4]],
                        patterns: [
                            { offset: 12, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 10, pathOptions: { color: '#f00', weight: 2 } }) },
                            { offset: 0, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 0 }) }
                        ]
                    }
                }
},
            toggleLayer: function (type) {
                $scope.layers.overlays[type].visible = !$scope.layers.overlays[type].visible;
            }
        });

        //qlist.push($http.get('/Data/21_136.json'));
        //qlist.push($http.get('/Data/62_106.json'));
        
        staticlist.push($http.get('/Map/getAdsb'));
        staticlist.push($http.get('/Map/getSSR'));

        $q.all(staticlist).then(function success(res) {
            
            uploadAdsb(res[0].data);
            uploadSSR(res[1].data);
           }, function error(response) {}
        ).finally(function () {
            $scope.paths = staticPath;
        });


        $scope.loadData();        
        httpFactory.http('/Map/getSSR').then(function(result){
            //console.log(result.length);
        });
    };
    init();
    
}]);

