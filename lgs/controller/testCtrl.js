define(['app'], function (app) {
    app.register
        .controller('testCtrl', function ($scope, $http, $stateParams) {
            $scope.model = {
                Content:'<h1>Hello</h1>'
            };
            $scope.title = '测试标题';
        });
});