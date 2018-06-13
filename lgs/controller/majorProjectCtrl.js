define(['app'], function (app) {
    app.register
        .controller('majorProjectCtrl', function ($scope, $http) {
            $scope.title = '重点项目管理';
            $scope.query = {
                Name: null,
                Index: 1,
                Size: 15
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'ProjectMonitor/query', $scope.query).success(function (rst) {
                    $scope.items = rst.Data;
                    $scope.data = rst;
                });
            };
            $scope.go = function (index, size) {
                $scope.query.Index = index;
                $scope.query.Size = size;
            };
            $scope.$watch('query', $scope.queryFunc, true);
        });
    app.register
        .controller('majorProjectAddCtrl', function ($scope, $http, $state) {
            $scope.title = '重点项目添加';
            var data = [{
                Url:null,
                IsDisplay:false
            }]
            $scope.data = data;
            $scope.add = function () {
                $scope.data.push({
                    Url:null,
                    IsDisplay:false,
                    Name:null
                });
            };
            $scope.del = function (data,item) {
                $scope.data.splice(data.indexOf(item), 1);
            };
            $scope.model = {
                Name:null,
            };
            $scope.save = function () {
                $scope.model.MonitorInfo = $scope.data;
                $http.post(cfg.host + 'ProjectMonitor/Add', $scope.model).success(function (rst) {
                    //跳转
                    $state.go('majorProject');
                });
            };
            $scope.back = function () {
                $state.go('majorProject');
            };
        });

    app.register
        .controller('majorProjectEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '重点项目修改';
            var id = $stateParams.id;
            $http.get(cfg.host + 'ProjectMonitor/get/' + id).success(function (rst) {
                $scope.model = rst;
                $scope.MonitorInfo = rst.MonitorInfo;
            });
            $scope.add = function (data) {
                $scope.MonitorInfo.push({
                    Url:null,
                    IsDisplay:false,
                    MonitoritemId:null,
                    Name:null
                });
            };
            $scope.del = function (data,item) {
                data.splice(data.indexOf(item), 1);
            };
            $scope.save = function () {
                $scope.model.Id = id;
                $http.post(cfg.host + 'ProjectMonitor/Edit', $scope.model).success(function () {
                    $state.go('majorProject');
                });
            };
            $scope.back = function () {
                $state.go('majorProject');
            };

        });
    app.register
        .controller('majorProjectDetailCtrl', ['$scope', '$http', '$stateParams', '$state', function ($scope, $http, $stateParams, $state) {
            var id = $stateParams.id;
            $scope.title = '查看重点项目';
            $http.get(cfg.host + 'ProjectMonitor/get/' + id).success(function (rst) {
                $scope.model = rst;
                $scope.items = rst.MonitorInfo;
            });
            $scope.back = function () {
                $state.go("majorProject");
            };
        }]);


})