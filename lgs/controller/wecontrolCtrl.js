define(['app'], function (app) {
    app.register
        .controller('wecontrolCtrl', function ($scope, $http) {
            $scope.title = '微门户菜单管理';
            $scope.queryFunc = function () {
                $http.get(cfg.host + 'Contrl/GetMainMenu').success(function (rst) {
                    $scope.items = rst;
                });
            };
            $scope.$watch('query', $scope.queryFunc, true);
        });
    app.register
        .controller('wecontrolAddCtrl', function ($scope, $http,$state) {
            $scope.title = '添加菜单';
            $scope.model = {
                Name: null,
                FileId: null
            };
            $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.subFunc = function () {
                $http.post(cfg.host + 'Contrl/Create', $scope.model).success(function (rst) {
                    window.history.go(-1);
                });
            };
            $scope.back = function () {
                window.history.go(-1);
            }
        });
    app.register
        .controller('wecontrolEditCtrl', function ($scope, $http,$stateParams,$state) {
            $scope.title = '修改菜单';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Contrl/Get/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.EditMain = function () {
                $scope.model.Id = id;
                $http.post(cfg.host + 'Contrl/Edit', $scope.model).success(function () {
                    window.history.go(-1);
                });
            };
            $scope.back = function () {
                window.history.go(-1);
            }
        });
    app.register
        .controller('wecontrolsubCtrl', function ($scope, $http , $state, $stateParams) {
            $scope.title = '微门户子菜单管理';
            var id = $stateParams.id;
            $scope.Id = id;
            $scope.queryFunc = function () {
                $http.get(cfg.host + 'Contrl/GetSubMenu/' + id).success(function (rst) {
                    $scope.items = rst;
                });
            };
            $scope.$watch('query', $scope.queryFunc, true);
        });
    app.register
        .controller('wecontrolsubAddCtrl', function ($scope, $http,$state,$stateParams) {
            var id = $stateParams.id;
            $scope.title = '添加子菜单';
            $scope.model = {
                MainId: id,
                Name: null,
                FileId: null
            };
            $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.subFunc = function () {
                $http.post(cfg.host + 'Contrl/AddSub', $scope.model).success(function (rst) {
                    window.history.go(-1);
                });
            };
            $scope.back = function () {
                window.history.go(-1);
            }
        });
    app.register
        .controller('wecontrolsubEditCtrl', function ($scope, $http,$stateParams,$state) {
            $scope.title = '修改子菜单';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Contrl/GetSub/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.EditMain = function () {
                $scope.model.Id = id;
                $http.post(cfg.host + 'Contrl/EditSub', $scope.model).success(function () {
                    window.history.go(-1);
                });
            };
            $scope.back = function () {
                window.history.go(-1);
            }

        });
})