define(['app'], function (app) {
    app.register
        .controller('bureauCtrl', function ($scope, $http, $state) {
            $scope.title = '委办局内容管理';
            $.get(cfg.host + 'SsoLogin/GetToken', function (token) {
                if (token) {
                    $.ajax({
                        url: cfg.userUrl,
                        headers: {
                            Authorization: 'Bearer ' + token
                        },
                        success: function (rst) {
                            $scope.user = rst;
                            $scope.load = false;
                            var userRol = rst.Roles[0].Name;
                            var userid = rst.Id;
                            $http.get(cfg.host + 'Government/GetBindStatu?UserId='+userid).success(function (rst) {
                                if(rst==false){
                                    $state.go('info');
                                    $scope.showTable = false;
                                }else{
                                    $scope.showTable = true;
                                };
                            });
                        }
                    });
                };
            });
            $scope.query = {
                Title: null,
                Index: 1,
                Size: 15,
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'GovernmentContent/Query', $scope.query).success(function (rst) {
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
    //添加主键
    app.register
        .controller('bureauAddCtrl', function ($scope, $http, $state) {
            $scope.title = '添加内容';
            $scope.model ={
                FileId: null,
                Content:''
            };
            $scope.save = function () {
                if($scope.model.VideoId!=null&&$scope.model.VideoUrl!=null){
                    $scope.model.VideoId = null;
                };
                $http.post(cfg.host + 'GovernmentContent/Add', $scope.model).success(function (rst) {
                    $state.go('bureau');
                });
            };
            $scope.back = function () {
                $state.go('bureau');
            };
        });

    //修改主键
    app.register
        .controller('bureauEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '修改内容';
            var id = $stateParams.id;
            $http.get(cfg.host + 'GovernmentContent/Get/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.ccc = {

            };
            $scope.save = function () {
                if($scope.ccc.VideoId!=null&&$scope.ccc.VideoUrl!=null){
                   $scope.ccc.VideoId = null;
               }
                $http.post(cfg.host + 'GovernmentContent/Edit', $scope.ccc).success(function () {
                    $state.go('bureau');
                });
            };

            $scope.back = function () {
                window.history.go(-1);
            };

        });
        //查看详情
        app.register
        .controller('bureauDetailCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '查看内容详情';
            var id = $stateParams.id;
             $http.get(cfg.host + 'GovernmentContent/Get/' + id).success(function (rst) {
                $scope.model = rst;
                $scope.$watch("model",function(){
                    if($scope.model.IsHavWeChat==false){
                        $scope.divshowM = true;
                        $scope.divshowU = false;

                    }else{
                        $scope.divshowM = false;
                        $scope.divshowU = true;
                    };
                },true);
            });
            $scope.back = function () {
                window.history.go(-1);
            };
        });
        
})