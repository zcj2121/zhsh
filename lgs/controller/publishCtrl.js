define(['app'], function (app) {
    app.register
        .controller('publishCtrl', function ($scope, $http) {
            $scope.title = '发送队列';
            $scope.query = {                
                pushDay: new Date(),
                Index: 1,
                Size: 15
            };
            $scope.queryFunc = function () {
                if ($scope.kind) {
                    $scope.query.kindId = $scope.kind.Id;
                }
                $http.post(cfg.host + 'Content/QueryQueue', $scope.query).success(function (rst) {
                    $scope.items = rst.Data;
                    $scope.data = rst;
                });
            };
            $scope.go = function (index, size) {
                $scope.query.Index = index;
                $scope.query.Size = size;
            };
            $scope.$watch('query', $scope.queryFunc, true);
            function getIds() {
                var arr = [];
                $('td>:checked').map(function () { arr.push(($(this).data('id'))); });
                return arr;
            }
            doc.del = function () {
                var ids = getIds();
                if (ids.length > 0) {                    
                    $http.get(cfg.host + 'Content/Deletes', { params: { 'ids': ids } }).success(function () {
                        $scope.queryFunc();
                    });
                } else {
                    alert("请选择要撤销的数据");
                }
            };
        });
    app.register
        .controller('publishNumCtrl', function ($scope, $http, $state, $stateParams) {
            $scope.title = '设置排序号';
            var id = $stateParams.id;
            $http.get(cfg.host + '/ArticleContent/get/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.data = {};
            $scope.save = function () {
                $scope.data = {
                    Id : id,
                    Order : $scope.model.Order
                };
                $http.post(cfg.host + 'Content/EditOrder', $scope.data).success(function (rst) {
                    $state.go("publish");
                });
            };
            
            $scope.back = function () {
                window.history.go(-1);
            };
        });
})