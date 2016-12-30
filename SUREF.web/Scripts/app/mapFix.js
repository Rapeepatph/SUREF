app.controller('mapController', ['$scope', '$http', 'leafletData', '$q', 'httpFactory', '$compile', '$rootScope','$routeParams', function ($scope, $http, leafletData, $q, httpFactory, $compile, $rootScope, $routeParams) {
    var staticitems = [];
    var dynamicitems = [];
    var staticlist = [];
    var dynamiclist = [];
    var result = [];
    var plot = {};
    var staticPath = [];
    var dynamicPath = [];
    var distributionNucps=[];
    var nucpDatas=[];
    var AircraftID = $("#Id").val();
    var yAxisLabels = [];
    var Date =$("#Date").val();
    var getDateTime = function (s) {
        var d = moment.utc(s, "YYYY/MM/DD HH:mm:ss.SSS");
        return d.format("DD MMM YYYY HH:mm:ss.SSS");
    };

    var getTimeForChart = function (s) {
        var d = moment.utc(s, "YYYY/MM/DD HH:mm:ss.SSS");
        return d.valueOf();
    }
    var getNameSur = function (s) {
        var result = staticitems.filter(function (obj) {
            return obj.sic == s;
        })
        return result ? result[0].name:null;
    }
    var change =function(sic) {
        switch(sic){
            case 82: return 'Suratthani SSR';
                break;
            case 66: return 'Phuket SSR';
                break;
            case 162: return 'Ubonratchathani SSR';
                break;
            case 50: return 'Hatyai SSR';
                break;
            case 98: return 'Chiang Mai SSR';
                break;
            case 18: return 'Donmueang SSR';
                break;
            case 114: return 'Pitsanulok SSR';
                break;
            case 146: return 'Udonthani SSR';
                break;
            case 178: return 'Roi-Et SSR';
                break;
            case 210: return 'Chumphon SSR';
                break;
            case 194: return 'Chiangrai SSR';
                break;
            case 5: return 'Tungmahamek ADSB';
                break;
            case 100: return 'Chiang Mai ADSB';
                break;
            case 51: return 'Hatyai ADSB';
                break;
            case 83: return 'Samui ADSB';
                break;
            case 163: return 'Ubonratchathani ADSB';
                break;
            case 147: return 'Udonthani ADSB';
                break;
        }
        
    };
    var findIndex = function (param) {
        var result = yAxisLabels.indexOf(param);
        return result==-1?null:result;
    }
    var findMean = function () {
        var sum = 0;
        for(var i =0;i<$scope.nucpChart.length;i++)
        {
            sum += $scope.nucpChart[i][1];
        }
        return sum / $scope.nucpChart.length;
    }
    var insertDataDistibution = function (param) {
        var index = distributionNucps.indexOf(param);
        if (index == -1) {
            distributionNucps.push(param);
            nucpDatas.push(1);
        }
        else {
            nucpDatas[index] += 1;
        }
    }
    var addDataToChart6 = function () {
        for(var i=0;i<distributionNucps.length;i++)
        {
            $scope.nucpDistributionChart.push([distributionNucps[i], nucpDatas[i]]);
        }
    }
    //$scope.date = "20161115";
    //$scope.FlightID = "71bd61";
    $scope.paths = [];
    $scope.adsbDataChart = [];
    $scope.ssrDataChart = [];
    $scope.adsbSICDataChart = [];
    $scope.ssrSICDataChart = [];
    $scope.ssrGeoHeightChart = [];
    $scope.ssrBaroHeightChart = [];
    $scope.adsbGeoHeightChart = [];
    $scope.nucpChart = [];
    $scope.nucpDistributionChart = [];
    $scope.avgNucp = 0;
    $scope.chartConfig = {
        options: {
            chart: {
                type:'scatter'
            },
            tooltip: {
                formatter: function () {
                    return "Time = " + moment(this.x).utc().format('HH:mm:ss.SSS') + ", Altitude = " + this.y ;
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
    $scope.chart2Config = {
        options: {
            chart: {
                type: 'line'
            },
            tooltip: {
                formatter: function () {
                    return "Time = " + moment(this.x).utc().format('HH:mm:ss.SSS') + " : " + yAxisLabels[this.y];
                }
            }

        },
        title: {
            text: 'Site Versus Time of Flight ID ' + AircraftID
        },
        series: [
            {
                data: $scope.adsbSICDataChart,
                name: 'ADSB',
                color: 'blue',
                marker: {
                    enabled: true,
                    radius: 2
                },
                visible:false
            },
            {
                data: $scope.ssrSICDataChart,
                name: 'SSR',
                color: 'red',
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
        yAxis: {
            title: {
                text: 'Site Name'
            },
            tickInterval: 1,
            labels:{
                formatter: function (){
                    //var result = change[this.value];
                    //return value !== 'undefined' ? value : this.value;
               
                    return yAxisLabels[this.value];
                }
            }
        },
        loading: true
    };
///////////////////////////////////////////////////////////////////////////////////////////
    $scope.chart3Config = {
        options: {
            chart: {
                type: 'scatter'
            },
            tooltip: {
                formatter: function () {
                    return "Time = " + moment(this.x).utc().format('HH:mm:ss.SSS') + " : FL " + this.y;
                }
            }

        },
        title: {
            text: 'Height Versus Time of Flight ID ' + AircraftID
        },
        series: [
            {
                data: $scope.ssrGeoHeightChart,
                name: 'GeoMetric',
                color: 'green',
                marker: {
                    enabled: true,
                    radius: 2
                }
                
            },
            {
                data: $scope.ssrBaroHeightChart,
                name: 'BaroMetric',
                color: 'black',
                marker: {
                    enabled: true,
                    radius: 2
                }
            },
            {
                data: $scope.ssrDataChart,
                name: 'Flight Level',
                color: 'purple',
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
        yAxis: {
            title: {
                text: 'Flight Level'
            },
            tickInterval: 20,
            allowDecimals: true
        },
        loading: true
    };
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.chart4Config = {
        options: {
            chart: {
                type: 'scatter'
            },
            tooltip: {
                formatter: function () {
                    return "Time = " + moment(this.x).utc().format('HH:mm:ss.SSS') + " : FL " + this.y;
                }
            }

        },
        title: {
            text: 'Height Versus Time of Flight ID ' + AircraftID
        },
        series: [
            {
                data: $scope.adsbGeoHeightChart,
                name: 'GeoMetric',
                color: 'green',
                marker: {
                    enabled: true,
                    radius: 2
                }

            },
            {
                data: $scope.adsbDataChart,
                name: 'Flight Level',
                color: 'purple',
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
        yAxis: {
            title: {
                text: 'Flight Level'
            },
            tickInterval: 20,
            allowDecimals: true
        },
        loading: true
    };
//////////////////////////////////////////////////////////////////////////////////
$scope.chart5Config = {
        options: {
            chart: {
                type: 'line'
            },
            tooltip: {
                formatter: function () {
                    return "Time = " + moment(this.x).utc().format('HH:mm:ss.SSS') + " : NuCp " + this.y;
                }
            }

        },
        title: {
            text: 'NuCp Versus Time of Flight ID ' + AircraftID
        },
        series: [
            {
                data: $scope.nucpChart,
                name: 'Nucp',
                color: 'green',
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
        yAxis: {
            title: {
                text: 'Value'
            },
            allowDecimals: false
        },
        loading: true
    };
//////////////////////////////////////////////////////////////////////////
$scope.chart6Config = {
    options: {
        chart: {
            type: 'column'
        },
        tooltip: {
            formatter: function () {
                return 'The frequency of '+this.x+' is <b>' 
                     + this.y + '</b>';
            }
        }
    },
    title: {
        text: 'NUCp Distribution of Flight ID ' + AircraftID
    },
    series: [
        {
            data: $scope.nucpDistributionChart,
            name: 'Distribution NUCp',
            color: 'green',
            pointWidth: 25,
            dataLabels: {
                enabled: true,
                format: '{point.y}', 
                align: 'center'
            }
        }
    ],
    xAxis: {
        title: {
            text: 'Value of NUCp'
        },
        allowDecimals: true,
        min: 0,
max:8
    },
    yAxis: {
        title: {
            text: 'Frequency'
        },
        allowDecimals: true
    },
    loading: true
};
    ////////////////////////////////////////////////////////  

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
            //return "[ADSB] <p> Last update : " + getDateTime(ap[0]) + "<p> Position : " + ap[1] + ", " + ap[2] + "<p> " + "Height :" + ap[3] + "<p> SIC :" + ap[4] + "<p>" + adsbPopup[0].outerHTML;
            return "[ADSB] "+adsbPopup[0].outerHTML
        }
        else
        {
            //return "[SSR] <p> Last update : " + getDateTime(ap[0]) + "<p> Position : " + ap[1] + ", " + ap[2] + "<p> " + "Height :" + ap[3] + "<p> SIC :" + ap[4] + "<p>" + ssrPopup[0].outerHTML;
            return  "[SSR] "+ ssrPopup[0].outerHTML
        }
    };
    var getdynamic = function (ap, type) {
        var typeSur = type == 0 ? "adsb" : "ssr";
        dynamicitems.push({
            layer: 'track',
            lat: ap[1],
            lng: ap[2],
            height: ap[3],
            sic: ap[4],
            cat: ap[6],
            nucp: ap[9],
            climbRate: ap[10],
            dt: getDateTime(ap[0]),
            icon: type==0?icons.blue:icons.red,
            message: getPathtoSur(ap, typeSur),
            getMessageScope: function () { return $scope; }
        });
}   
    var adsbTrack = function (points) {
        if (points.length > 0)
        {
            return points.map(function (ap) {
                var plot = [getTimeForChart(ap[0]),parseFloat(ap[3])];
                $scope.adsbDataChart.push(plot);
                if (findIndex(change(ap[4])) ==null )
                {
                    yAxisLabels.push(change(ap[4]));
                }
                var plotSic = [getTimeForChart(ap[0]), findIndex(change(ap[4]))];
                $scope.adsbSICDataChart.push(plotSic);
                var geoPlot = [getTimeForChart(ap[0]), ap[7] / 100];
                $scope.adsbGeoHeightChart.push(geoPlot);
                var nucpPlot = [getTimeForChart(ap[0]), ap[9]];
                $scope.nucpChart.push(nucpPlot);
                insertDataDistibution(ap[9]);
                return getdynamic(ap,0);
                //return dynamicitems.push({
                //    layer: 'track',
                //    lat: ap[1],
                //    lng: ap[2],
                //    height: ap[3],
                //    sic: ap[4],
                //    cat: ap[6],
                //    nucp: ap[9],
                //    datetime:getDateTime(ap[0]),
                //    icon: icons.blue,
                //    message: getPathtoSur(ap, "adsb"),
                //    getMessageScope: function () { return $scope; }
                //});
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
                if (findIndex(change(ap[4])) == null) {
                    yAxisLabels.push(change(ap[4]));
                }
                var plotSic = [getTimeForChart(ap[0]), findIndex(change(ap[4]))];
                $scope.ssrSICDataChart.push(plotSic);
                var geoPlot = [getTimeForChart(ap[0]), ap[7]/100];
                $scope.ssrGeoHeightChart.push(geoPlot);
                var baroPlot = [getTimeForChart(ap[0]), ap[8]];
                $scope.ssrBaroHeightChart.push(baroPlot);
                return getdynamic(ap,1);
                //return dynamicitems.push({
                //    layer: 'track',
                //    lat: ap[1],
                //    lng: ap[2],
                //    sic: ap[4],
                //    cat: ap[6],
                //    nucp: ap[9],
                //    dt: getDateTime(ap[0]),
                //    icon: icons.red,
                //    message: getPathtoSur(ap, "ssr"),
                //    getMessageScope: function () { return $scope; }
                //});
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
                    sic: element.SIC,
                    name:element.Name,
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
                    sic: element.SIC,
                    name: element.Name,
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
        yAxisLabels = [];
        $scope.ssrDataChart.length = 0;
        $scope.adsbDataChart.length = 0;
        $scope.chartConfig.title.text = 'Flight Level Versus Time of Flight ID ' + AircraftID;
        dynamiclist.push($http.get('/Map/getTrack?sensor=1&date=' + Date + '&id=' + AircraftID));
        dynamiclist.push($http.get('/Map/getTrack?sensor=2&date=' + Date + '&id=' + AircraftID));
        $q.all(dynamiclist).then(function success(res) {
            dynamicitems = [];
            adsbTrack(res[0].data);
            ssrTrack(res[1].data);
            addDataToChart6();
            $scope.avgNucp = findMean();
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
                zoom: 5
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
            events:{
                markers: {
                    enable: ['click']
                    //logic: 'emit'
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
    $scope.$on("leafletDirectiveMarker.map.click", function (event, args) {
        console.log(args.model);                      //test 
        $scope.detailLat = args.model.lat;
        $scope.detailLng = args.model.lng;
        $scope.detailSic = args.model.sic;
        $scope.detailNucp = args.model.nucp;
        $scope.detailCat = args.model.cat;
        $scope.detailDatetime = args.model.dt;
        $scope.detailHeight = args.model.height;
        $scope.detailClimbRate = args.model.climbRate;
    });
}]);

