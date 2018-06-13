define(['app'], function (app) {
    app.register
        .controller('friendLinkCtrl', function ($scope, $http) {
            $scope.title = '便民服务';
            $scope.query = {
                Name:null,
                Index:1,
                Size:15
            };
            $scope.queryFunc = function () {            
                $http.post(cfg.host + 'FriendLink/Query', $scope.query).success(function (rst) {
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
        .controller('friendLinkAddCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '新增便民服务';
            $scope.model = {              
               Name: null,
               Url:null,
               OrderNum:0,
           };
           $scope.subFunc = function () {
               $http.post(cfg.host + 'FriendLink/Add', $scope.model).success(function (rst) {
                   //跳转
                   $state.go('friendLink');
               });
           };
           $scope.back = function () {
               $state.go('friendLink');
           }
       });
            
    app.register
        .controller('friendLinkEditCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '修改便民服务';
            var id = $stateParams.id;
            $http.get(cfg.host + 'FriendLink/Get/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.subFunc = function () {
                $scope.model.Id = id;
                $http.post(cfg.host + 'FriendLink/Edit', $scope.model).success(function () {
                    $state.go('friendLink');
                });
            };

            $scope.back = function () {
                $state.go('friendLink');
            };
            
        });
});