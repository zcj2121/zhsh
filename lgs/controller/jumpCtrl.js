define(['app'], function (app) {
    app.register
        .controller('jumpCtrl', function ($scope, $http) {
            $scope.title = '促销信息管理';
            $scope.query = {
                IsActived:null,
                Index:1,
                Size:15
                
            };
            $scope.queryFunc = function () {  
             
                $http.post(cfg.host + 'PortalPic/query', $scope.query).success(function (rst) {
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
        .controller('jumpAddCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '新建促销信息';
            $scope.extler = ['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.model = {              
               Title: null,
               FileId: null,
               TargetUrl:null,
           };
           $scope.save = function () {
               $http.post(cfg.host + 'PortalPic/add', $scope.model).success(function (rst) {
                   //跳转
                   $state.go('jump');
               });
           };
           $scope.back = function () {
               $state.go('jump');
           }
       });
            
    app.register
        .controller('jumpEditCtrl', function ($scope, $http, $stateParams,$state) {
            var id = $stateParams.id;
            $scope.title = '修改促销信息';
            $http.get(cfg.host + 'PortalPic/get/' + id).success(function (rst) {
                $scope.model = rst;
                var companyType = $scope.model.Type;
                $('#kinType option[value='+companyType+']').attr('selected','selected');
            });
            $scope.extler = ['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.suver ={
                FileId:null,
                Id:id,
            }
            $scope.save = function () {
                if($scope.model){
                    $scope.suver.Title = $scope.model.Title;
                }else{
                    $scope.suver.Title = null
                };
                // if($scope.model){
                //     $scope.suver.TargetUrl = $scope.model.TargetUrl;
                // }else{
                    $scope.suver.TargetUrl = null
                // };
                $scope.suver.Type = $("#kinType").val();
                $http.post(cfg.host + 'PortalPic/edit', $scope.suver).success(function () {
                    $state.go('jump');
                });
            };
            $scope.back = function () {
                $state.go('jump');
            };
            
        });
});