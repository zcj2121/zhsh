define(['app'], function (app) {
    app.register
        .controller('bottomMenuCtrl', function ($scope, $http, $state) {
            $scope.title = '微信底部菜单管理';
            $http.get(cfg.host + 'Weixin/GetMenu').success(function (rst) {
                var cer = rst.menu.button;
                for(var i =0;i<cer.length;i++){
                    if(cer[i].sub_button==undefined){
                        cer[i].sub_button=[]
                    }
                };
                $scope.items = cer;
                $scope.add = function () {
                    $scope.items.push({
                        name: null,
                        type: 'view',
                        url: 'http://',
                        sub_button:[]
                    });
                };
                $scope.del = function (data, item) {
                    data.splice(data.indexOf(item), 1);
                };
                $scope.addProduct = function (data, item) {
                    data.push({
                        name: null,
                        type: 'view',
                        url: 'http://'
                    });
                };
                $scope.delProduct = function (data, item) {
                    data.splice(data.indexOf(item), 1);
                };
            });
            $scope.model = {
                
            }
            $scope.save = function () {
                var ccc=[];
                for(var i =0;i<$scope.items.length;i++){
                    if($scope.items[i].sub_button.length==[]){
                        ccc.push({
                            Name:$scope.items[i].name,
                            Url:$scope.items[i].url
                        })
                    }else{
                        ccc.push({
                            Name:$scope.items[i].name,
                            Level:$scope.items[i].sub_button
                        })
                    };
                };
                $scope.model = ccc;
               $http.post(cfg.host + 'Weixin/CreateMenu', $scope.model).success(function (rst) {
                    $(".menu-error").html('<div style="color:red;">保存成功！</div>');
                    window.setTimeout(function(){
                        $http.post(cfg.host + 'Weixin/CreateMenu', $scope.model).success(function (rst) {});
                        $(".menu-error").empty();
                    },2000);
               }).error(function(){
                   $(".menu-error").html('<div style="color:red;">保存失败，请重试！</div>');
               });
           };
        });

})