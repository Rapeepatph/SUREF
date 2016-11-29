
app.controller('flightController', ['$scope', '$http', 'NgTableParams', '$q', '$resource', function ($scope, $http, NgTableParams, $q, $resource) {
    var list = [];
    var data = [];
    $scope.strtdate = new Date();
    var getDateTime = function (s) {
        var d = moment.utc(s, "YYYY/MM/DD HH:mm:ss.SSS");

        return d.format("YYYY-MM-DD");
    };

    var init = function () {
        var dt = getDateTime($scope.strtdate);
        list.push($http.get('/Flight/get?dt=' + dt));
        $q.all(list).then(function success(res) {
            data = res[0].data;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 35
            }, {
                dataset: data
            })
        })
    }
    init();

    //------------- Calendar---------------------- 
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };
    $scope.maxDate = new Date();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.formats = ['yyyy-MM-dd', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        startingDay: 1
    };
    //------------- Calendar---------------------- 
}]);

    
