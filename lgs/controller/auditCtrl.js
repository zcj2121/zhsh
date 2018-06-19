define(['app'], function (app) {
    app.register
        .controller('auditCtrl', function ($scope, $http,$stateParams) {
            var typeId = $stateParams.id;
            if (typeId == 1) {
                $scope.title = "新闻政务";
                $http.get(cfg.host + 'dic/getsub?code=news').success(function (rst) {
                    $scope.kinds = rst;
                });
            } else if (typeId == 2) {
                $scope.title = "文明方正";
                $http.get(cfg.host + 'dic/getsub?code=Activity').success(function (rst) {
                    $scope.kinds = rst;
                });
            } else if (typeId == 3) {
                $scope.title = "通知公告";
                $http.get(cfg.host + 'dic/getsub?code=Notice').success(function (rst) {
                    $scope.kinds = rst;
                });
            } else if (typeId == 4) {
                $scope.title = "推广文章";
                $http.get(cfg.host + 'dic/getsub?code=PushMessage').success(function (rst) {
                    $scope.kinds = rst;
                });
            };
            // var firstDate = new Date();
            // firstDate.setDate(1); //第一天
            // var endDate = new Date(firstDate);
            // endDate.setMonth(firstDate.getMonth()+1);
            // endDate.setDate(0);
            // var datadate = new Date(firstDate);
            // var dates = datadate.getFullYear()+"-"+(datadate.getMonth()+1)+"-"+datadate.getDate();
            // document.getElementById("Betime").value = dates;
            $scope.query = {
                Title: "",
                Statu: null,
                Type: null,
                StartTime:null,
                EndTime:null,
                Index: 1,
                Size:15
            };
            $scope.queryFunc = function () {
                if ($scope.kind) {
                    $scope.query.kindId = $scope.kind.Id;
                }else{
                    $scope.query.kindId = null;
                };
                if (typeId == 1) {
                    $scope.query.Type = 0
                }
                else if (typeId == 2) {
                    $scope.query.Type = 2
                }
                else if (typeId == 3) {
                    $scope.query.Type = 1
                }
                else if (typeId == 4) {
                    $scope.query.Type = 3
                }
                $http.post(cfg.host + 'audit/query', $scope.query).success(function (rst) {
                    $scope.items = rst.Data;
                    $scope.data = rst;
                });
            };
            $scope.go = function (index, size) {
                $scope.query.Index = index;
                $scope.query.Size = size;
            };
            $scope.$watch('query', $scope.queryFunc, true);
            $scope.auditsModel = {
                IsPass: true,
                Remark:"",
            }
            function getIds() {
                var arr = [];
                $('td>:checked').map(function () { arr.push(($(this).data('id'))); });
                return arr;
            }
            //批量审批
            doc.audit = function (e) {
                var ids = getIds();
                var data = $scope.items;
                if (ids.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < ids.length; j++) {
                            if (data[i].Id == ids[j]) {
                                if ($scope.items[i].Statu != 1) {
                                    alert("选择项中包含已审批项");
                                    return false;
                                }
                            }
                        }
                    }
                    $http.get(cfg.host + 'Audit/Audits', {
                        params: { 'ids': ids ,'IsPass':true}
                    }).success(function (rst) {
                        //跳转
                        $scope.queryFunc();
                    });
                } else {
                    alert("请选择要审批的数据");
                };
            };
        });
    app.register
       .controller('auditDetailCtrl', function ($scope, $http, $stateParams, $state) {
           var id = $stateParams.id;
           $http.get(cfg.host + 'articlecontent/get/' + id).success(function (rst) {
               $scope.model = rst;
               $('.contener').html($scope.model.Content);
               if ($scope.model.Type == 0) {
                   $scope.model.TypeName = '新闻政务';
               }
               else if ($scope.model.Type == 2) {
                   $scope.model.TypeName = '文明方正';
               }
               else if ($scope.model.Type == 1) {
                   $scope.model.TypeName = '通知公告';
               }
               else if ($scope.model.Type == 3) {
                   $scope.model.TypeName = '推广文章';
               }
               var strUrl = $scope.model.VideoUrl;
               var partten = /\/up/g;
               if(partten.test(strUrl)){
                   $("#videoHtml").append("<video src='"+$scope.model.VideoUrl+"' controls='controls' style='width: 500px;'>您的浏览器由于版本过低,不支持该视频播放。</video>");
               }else{
                   $("#videoHtml").append($scope.model.VideoUrl);
               }
           });

           $scope.back = function () {
               if ($scope.model.Type == 0) {
                   $state.go("audit", { id: 1 });
               }
               else if ($scope.model.Type == 2) {
                   $state.go("audit", { id: 2 });
               }
               else if ($scope.model.Type == 1) {
                   $state.go("audit", { id: 3 });
               }
               else if ($scope.model.Type == 3) {
                   $state.go("audit", { id: 4 });
               }

           }
       });
    app.register
       .controller('auditRejectCtrl', function ($scope, $http, $stateParams, $state) {
           var id = $stateParams.id;
           $scope.model = {};
           $scope.model = {
               Opinion:null
           }
           $scope.Refues=function(){
               var brd = $scope.model.Opinion
               $http.get(cfg.host + 'audit/audit', {
                params: { 'contentid': id ,'ispass':false,'Opinion': brd}
                }).success(function (rst) {
                    //跳转
                    window.history.go(-1);
                });
           };
           $scope.back = function () {
               window.history.go(-1);
           };
       });
});