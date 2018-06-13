define(['app'], function (app) {
    app.register
        .controller('partyMatrixCtrl', function ($scope, $http) {
            $scope.title = '政务矩阵管理';
            $scope.query = {
                Name: null,
                Index: 1,
                Size: 15
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'Government/Query', $scope.query).success(function (rst) {
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
        .controller('partyMatrixAddCtrl', function ($scope, $http, $state) {
            $scope.title = '添加政务矩阵';
            $scope.model ={
                FileId: null,
                IsHavWeChat:false
            };
            $scope.$watch("model",function(){
                if($scope.model.IsHavWeChat==false){
                    $scope.divshowM = true;
                    $scope.divshowU = false;
                }else{
                    $scope.divshowM = false;
                    $scope.divshowU = true;
                };
            },true);
            $scope.save = function () {
                if($scope.model.IsHavWeChat==false){
                    $scope.model.Url=null;
                }else{
                    $scope.model.Remark=null;
                };
                $http.post(cfg.host + 'Government/Add', $scope.model).success(function (rst) {
                    //跳转
                    $state.go('partyMatrix');
                });
            };
            $scope.back = function () {
                $state.go('partyMatrix');
            };
        });

    //修改主键
    app.register
        .controller('partyMatrixEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '修改政务矩阵';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Government/Get/' + id).success(function (rst) {
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
            $scope.sver = {

            };
            $scope.save = function () {
                if($scope.model.IsHavWeChat==false){
                    $scope.model.Url=null;
                }else{
                    $scope.model.Remark=null;
                };
                $scope.sver.Id = id;
                $scope.sver.FileId = $scope.model.FileId;
                $scope.sver.Name = $scope.model.Name;
                $scope.sver.Url = $scope.model.Url;
                $scope.sver.Remark = $scope.model.Remark;
                $scope.sver.IsHavWeChat = $scope.model.IsHavWeChat;
                $http.post(cfg.host + 'Government/Edit', $scope.sver).success(function () {
                    $state.go('partyMatrix');
                });
            };

            $scope.back = function () {
                window.history.go(-1);
            };

        });
        //查看详情
        app.register
        .controller('partyMatrixDetailCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '查看政务矩阵';
            var id = $stateParams.id;
             $http.get(cfg.host + 'Government/Get/' + id).success(function (rst) {
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