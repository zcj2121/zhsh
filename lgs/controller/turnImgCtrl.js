define(['app'], function (app) {
    app.register
       .controller('turnImgCtrl', function ($scope, $http) {
           $scope.title = '轮播图';
           //query
           $scope.query = {
               Index: 1,
               Size:15
           };
           $scope.queryFunc = function () {
               $http.post(cfg.host + 'Content/QueryImg', $scope.query).success(function (rst) {
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
       .controller('turnImgAddCtrl', function ($scope, $http, $state) {
           $scope.title = '添加轮播图';
           $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
           $scope.model = {
               FileId:null
           }
           $scope.save = function () {
               $http.post(cfg.host + 'Content/AddImg', $scope.model).success(function () {
                   $state.go('turnImg'); 
               });
           };

           $scope.back = function () {
               $state.go('turnImg');
           };
           
       });
});