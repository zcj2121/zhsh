define(['app'], function (app) {
    app.register
        .controller('videoCtrl', function ($scope, $http) {
            $scope.title = '培训视频管理';
            $http.get(cfg.host + 'dic/getsub?code=Trains').success(function (rst) {
                $scope.kinds = rst;
            });
            $scope.query = {
                Name:null,
                Index:1,
                Size:15
            };
            $scope.queryFunc = function () {  
                if ($scope.kind) {
                    $scope.query.TypeId = $scope.kind.Id;
                }else{
                    $scope.query.TypeId = null;
                }
                $http.post(cfg.host + 'Video/query', $scope.query).success(function (rst) {
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
        .controller('videoAddCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '新建培训视频';
            $http.get(cfg.host + 'dic/getsub?code=Trains').success(function (rst) {
                $scope.kinds = rst;
            });
            $scope.extler = ['mov','MOV','3gp','3GP','mp4','MP4','avi','AVI','flv','FLV'];
            $scope.model = {
               Name: null,
               FileId: null,
               Remark:''
            };
            $scope.subFunc = function () {
               if ($scope.kind) {
                    $scope.model.TypeId = $scope.kind.Id;
               }
               if($scope.model.FileId!=null&&$scope.model.SrcHtml!=null){
                   $scope.model.FileId = null;
               }
               $http.post(cfg.host + 'Video/Create', $scope.model).success(function (rst) {
                   //跳转
                   $state.go('video');
               });
            };
            $scope.back = function () {
               $state.go('video');
            }
        });
            
    app.register
        .controller('videoEditCtrl', function ($scope, $http, $stateParams,$state) {
            var id = $stateParams.id;
            $http.get(cfg.host + 'Video/get/' + id).success(function (rst) {
                $scope.model = rst;
                $scope.title = '修改培训视频';
                $("#videoHtml").append($scope.model.SrcHtml);
                $http.get(cfg.host + 'dic/getsub?code=Trains').success(function (rst) {
                    $scope.kinds = rst;
                    $.each($scope.kinds, function (index, item) {
                        if (item.Id == $scope.model.TypeId) {
                           $scope.kind = item;
                        }
                    });
                });
            });
            $scope.extler = ['mov','MOV','3gp','3GP','mp4','MP4','avi','AVI','flv','FLV'];
            $scope.subFunc = function () {
                $scope.model.TypeId = $scope.kind.Id;
                $scope.model.Id = id;
                if($scope.model.FileId!=null&&$scope.model.SrcHtml!=null){
                    $scope.model.FileId = null;
                }
                $http.post(cfg.host + 'Video/edit', $scope.model).success(function () {
                    $state.go('video');
                });
            };

            $scope.back = function () {
                $state.go('video');
            };
        });
    app.register
        .controller('videoDetailCtrl', function ($scope, $http, $stateParams,$state) {
            var id = $stateParams.id;
            $scope.title = '查看培训视频';
            $http.get(cfg.host + 'Video/get/' + id).success(function (rst) {
                $scope.model = rst;
                var text = rst.Remark;
                $("#textContent").html(text);
                $("#videoHtml").append($scope.model.SrcHtml);
            });
            $scope.back = function () {
                $state.go('video');
            };
        });
});