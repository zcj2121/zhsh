define(['app'], function (app) {
    app.register
        .controller('configCtrl',function ($scope, $http) {
            $scope.title = '微信基础功能设置';
            $scope.queryFunc = function () {
                $http.get(cfg.host + 'config/gettime').success(function (rst) {
                    $scope.time = rst;
                });
            };
            //init
            $scope.$watch("time", function () {
                if($scope.time<=24&&$scope.time>=0){
                    $scope.disAbled =false;
                    $scope.setDisabled = "";
                }else{
                    $scope.disAbled =true;
                    $scope.setDisabled = "请输入有效数字"
                }

            }, true);
            doc.setTime = function () {
                var time = $scope.time;
                $http.get(cfg.host + 'config/setpushtime?time='+time,null).success(function () {
                    //刷新
                    $scope.queryFunc();
                })
            }
            $scope.queryFunc();
        });
});