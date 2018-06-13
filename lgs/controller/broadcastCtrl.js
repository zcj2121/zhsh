define(['app'], function (app) {
    app.register
        .controller('broadcastCtrl', function ($scope, $http, $state) {
            $scope.title = '文明播报审核';
            $scope.query = {
                title: null,
                pageIndex: 1,
                pageLimit: 15,
                state:"5",
            };
            $scope.queryFunc = function () { 
            	$.ajax({
                	url: cfg.javahost+"party/rs/Securitymanages/find?pageIndex=15&pageLimit="+ $scope.query.pageIndex+ "&title=" + $scope.query.title + "&state=" + Number($scope.query.state),
                    // data: JSON.stringify({
                    // }),
                    type: 'POST',
                    async: false,
                    contentType: "application/json;charset=UTF-8",
                    success: function (data) {
                    	$scope.Count = data.Count;
                        $scope.items = data.Data;
                    }
                });
            };
            $scope.go = function (index, size) {
                $scope.query.pageLimit = size;
                $scope.query.pageIndex = index;
            };
            $scope.$watch('query', $scope.queryFunc, true);
        });
        //查看详情
        app.register
        .controller('broadcastDetailCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '查看详情';
            var id = $stateParams.id;
            $.ajax({
                url: cfg.javahost+"party/fangzheng/file/Securitymanages.do?id="+id,
                // data: JSON.stringify({
                // 	"id":id
                // }),
                type: 'GET',
                async: false,
                contentType: "application/json;charset=UTF-8",
                success: function (suc) {
                	$scope.model = suc[0];
                    var path = suc[0].path;
                    if(path){
                        $scope.pic = path.replace('\\','');
                    };
                    
                }
            });
            $scope.back = function () {
                $state.go('broadcast');
            };
        });
        
})