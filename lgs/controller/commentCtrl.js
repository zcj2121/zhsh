define(['app'], function (app) {
    app.register
       .controller('commentCtrl', function ($scope, $http) {
           $scope.title = '评论管理';
           $(function () { $("[data-toggle='tooltip']").tooltip(); });
           $scope.query = {
                Title: null,
                IsDeleted:null,
                Size:15,
                Type:null,
                Index:1
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'comment/query', $scope.query).success(function (rst) {
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
});