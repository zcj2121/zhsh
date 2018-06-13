define(['app'], function (app) {
    app.register
        .controller('dicCtrl', function ($scope, $http) {
            $scope.title = '字典管理';
            $scope.query = {
                Name:null,
                IsDeleted:false,
                Index:1,
                Size:15
            };
            $scope.queryFunc = function () {               
                $http.post(cfg.host + 'dic/query', $scope.query).success(function (rst) {
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
        .controller('dicSubCtrl', function ($scope, $http, $stateParams) {
            $scope.title = '字典子项管理';
            var id = $stateParams.id;
            $scope.MainId = id;
            $scope.queryFunc = function () {
                $http.get(cfg.host + 'dic/getdicsub/' + id, null).success(function (rst) {
                    $scope.items = rst;
                    $scope.data = rst;
                });
            };
            $scope.$watch('query', $scope.queryFunc, true);
        });
//添加主键
    app.register
       .controller('dicAddCtrl', function ($scope, $http,$state) {
           $scope.title = '添加主键';
           $scope.model = {              
               Code: null,
               Name: null,
               Description: null
           }

           $scope.subFunc = function () {
               $http.post(cfg.host + 'Dic/AddDicMain', $scope.model).success(function (rst) {
                   //跳转
                   $state.go('dic');
               });
           };

           $scope.back = function () {
               $state.go('dic');
           }
       });

    //添加子健
    app.register
       .controller('dicSubAddCtrl', function ($scope, $http, $stateParams) {
           $scope.title = '添加子键';
           var id = $stateParams.id;
           $scope.model = {
               MainId: id,
               Code: null,
               Name: null,
               Description: null
           }
           $scope.subFunc = function () {
               $http.post(cfg.host + 'Dic/AddDicSub', $scope.model).success(function (rst) {
                   //跳转
                   window.history.go(-1);
               });
           };

           $scope.back = function () {
               window.history.go(-1);
           }
       });
    
       //修改主键
    app.register
        .controller('dicEditCtrl', function ($scope, $http,$stateParams,$state) {
            $scope.title = '修改主键';
            var id = $stateParams.id;
            $http.get(cfg.host + 'dic/getmain/' + id).success(function (rst) {
                $scope.model = rst;
            });

            $scope.EditMain = function () {
                $scope.model.Id = id;
                $http.post(cfg.host + 'dic/editmain', $scope.model).success(function () {
                    $state.go('dic');
                });
            }

            $scope.back = function () {
                window.history.go(-1);
            }
            
        });
        //修改子键
    app.register
        .controller('dicSubEditCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '修改子键';
            var id = $stateParams.id;
            $http.get(cfg.host + 'dic/getsub/' + id).success(function (rst) {
                $scope.model = rst;
            });

            $scope.EditSub = function () {
                $scope.model.Id = id;
                $http.post(cfg.host + 'dic/editsub', $scope.model).success(function () {
                    $state.go('dic');
                });
            }

            $scope.back = function () {
                window.history.go(-1);
            }
        });
})