define(['app'], function (app) {
    app.register
        .controller('feedbackCtrl', function ($scope, $http) {
            $scope.title = '意见反馈';
            // var firstDate = new Date();
            // firstDate.setDate(1); //第一天
            // var endDate = new Date(firstDate);
            // endDate.setMonth(firstDate.getMonth()+1);
            // endDate.setDate(0);
            // var datadate = new Date(firstDate);
            // var dates = datadate.getFullYear()+"-"+(datadate.getMonth()+1)+"-"+datadate.getDate();
            // document.getElementById("Betime").value = dates;
            $scope.query = {                
                StartTime: null,
                EndTime: null,
                Index: 1,
                Size: 15,
                statu: null,
                HasDel:false,
                IsReply:null,

            };
            $scope.queryFunc = function () {
                if ($scope.kind) {
                    $scope.query.kindId = $scope.kind.Id;
                }else{
                    $scope.query.kindId= null;
                };
                $http.post(cfg.host + 'Feedback/Query', $scope.query).success(function (rst) {
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
                    for (var i = 0; i < $scope.items.length; i++) {
                        for (var j = 0; j < ids.length;j++){
                            if ($scope.items[i].Id == ids[j]) {
                                if ($scope.items[i].IsDel == true) {
                                    alert("选择项中包含有已删除项");
                                    return false;
                                }
                            }
                        }
                    }
                    $http.get(cfg.host + 'Feedback/Dels', { params: { 'ids': ids } }).success(function () {
                        $scope.queryFunc();
                    });
                } else {
                    alert("请选择要删除的数据");
                };
            };
            //init
            $http.get(cfg.host + 'dic/getsub?code=Feedback').success(function (rst) {
                $scope.kinds = rst;
            });
        });
    app.register
       .controller('feedbackReplyCtrl', function ($scope, $http, $stateParams , $state) {
           //common
           var id = $stateParams.id
           $scope.title = '回复';
           $http.get(cfg.host + 'Feedback/get/'+id).success(function (rst) {
                    $scope.items = rst;
                });
           $scope.subFunc = function () {
               $scope.model.feedbackId = $stateParams.id;
               $http.post(cfg.host + 'feedback/AddReply', $scope.model).success(function (rst) {
                   //跳转
                   $state.go('feedback');
               });
           };
           
       });
})