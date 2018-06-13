define(['app'], function (app) {
    app.register
        .controller('drumCtrl', function ($scope, $http) {
            $scope.title = '宣传页管理';
            $scope.query = {
                IsActived:null,
                Index:1,
                Size:15
                
            };
            $scope.queryFunc = function () {  
                $http.post(cfg.host + 'PortalPic/QueryActive', $scope.query).success(function (rst) {
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
        .controller('drumAddCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '新建宣传图片';
            $scope.extler = ['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.model = {              
               Title: null,
               FileId: null,
               TargetUrl:null,
               Type:2
           };
           $scope.save = function () {
               $http.post(cfg.host + 'PortalPic/add', $scope.model).success(function (rst) {
                   //跳转
                   $state.go('drum');
               });
           };
           $scope.back = function () {
               $state.go('drum');
           }
       });
            
    app.register
        .controller('drumEditCtrl', function ($scope, $http, $stateParams,$state) {
            var id = $stateParams.id;
            $scope.title = '修改宣传图片';
            $http.get(cfg.host + 'PortalPic/get/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.extler = ['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.suver ={
                FileId:null,
                Id:id,
                TargetUrl:null,
                Type:2
            }
            $scope.save = function () {
                if($scope.model){
                    $scope.suver.Title = $scope.model.Title;
                }else{
                    $scope.suver.Title = null
                };
                $http.post(cfg.host + 'PortalPic/edit', $scope.suver).success(function () {
                    $state.go('drum');
                });
            };

            $scope.back = function () {
                $state.go('drum');
            };
            
        });
});