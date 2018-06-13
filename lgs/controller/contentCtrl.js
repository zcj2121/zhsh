define(['app'], function (app) {
    app.register
        .controller('contentCtrl', ['$scope', '$http', '$stateParams',function ($scope, $http, $stateParams) {
            var id = $stateParams.id;
            if (id ==1)
            {
                $scope.title = "新闻政务";
                $scope.id =1;
                $http.get(cfg.host + 'dic/getsub?code=News').success(function (rst) {
                    $scope.kinds = rst;
                });
            }
            else if(id== 2)
            {
                $scope.title = "文明方正";
                $scope.id = 2;
                $http.get(cfg.host + 'dic/getsub?code=Activity').success(function (rst) {
                    $scope.kinds = rst;
                });
            }
            else if (id == 3) {
                $scope.title = "通知公告";
                $scope.id = 3;
                $http.get(cfg.host + 'dic/getsub?code=Notice').success(function (rst) {
                    $scope.kinds = rst;
                });
            }
            else if (id == 4) {
                $scope.title = "推广文章";
                $scope.id = 4;
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
                Type: null,
                StartTime:null,
                EndTime:null,
                IsDeleted: false,
                Index: 1,
                Size:15
            };
            $scope.queryFunc = function () {
                if ($scope.kind) {
                    $scope.query.kindId = $scope.kind.Id;
                }else{
                    $scope.query.kindId=null
                }
                if (id == 1)
                {
                    $scope.query.Type=0
                }
                else if (id == 2)
                {
                    $scope.query.Type = 2
                }
                else if (id == 3) {
                    $scope.query.Type = 1
                }
                else if (id == 4) {
                    $scope.query.Type = 3
                }
                $http.post(cfg.host + 'ArticleContent/query', $scope.query).success(function (rst) {
                    $scope.items = rst.Data;
                    var data = $scope.items;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Title.length > 30) {
                            var text = data[i].Title.substring(0, 30)
                            $scope.items.Title = text;
                        }
                    }
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
            // $('.td[type=checkbox]').on("click",function(){
            //     var ids = getIds();
            //     var data = $scope.items;
            //     for (var i = 0; i < data.length; i++) {
            //         for (var j = 0; j < ids.length; j++) {
            //             if (data[i].Id == ids[j]) {
            //                 if ($scope.items[i].IsDeleted != false) {
            //                     alert("请选择正确的数据");
            //                     $('.td[type=checkbox]').attr("checked", false)
            //                     return false;
            //                 }
            //             }
            //         }
            //     }
            // })
            //批量删除
            doc.del =function (e) {
                var ids = getIds();
                var data = $scope.items;
                if (ids.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < ids.length; j++) {
                            if (data[i].Id == ids[j]) {
                                if ($scope.items[i].IsDeleted != false) {
                                    alert("选择项中包含有已删除项");
                                    return false;
                                }
                            }
                        }
                    }
                    $http.get(cfg.host + 'ArticleContent/Deletes', {
                        params: { 'ids': ids }
                    }).success(function (rst) {
                        $scope.queryFunc();
                    });
                } else {
                    alert("请选择要删除的数据");
                };
                
            };
            //批量提交
            doc.sub = function (e) {
                var ids = getIds();
                var data = $scope.items;
                if (ids.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        for (var j = 0; j < ids.length; j++) {
                            if (data[i].Id == ids[j]) {
                                if ($scope.items[i].Statu != 0) {
                                    alert("选中项中包含已提交项");
                                    return false;
                                }
                            }
                        }
                    }
                    $http.get(cfg.host + 'ArticleContent/Submits', {
                        params: { 'ids': ids }
                    }).success(function (rst) {
                        $scope.queryFunc();
                    });
                } else {
                    alert("请选择要提交的数据");
                };
            };
        }]);
    app.register
    .controller('contentAddCtrl', ['$scope', '$http', '$state','$stateParams',function ($scope, $http, $state,$stateParams) {
        var id = $stateParams.id;
        if (id == 1) {
            $scope.title = "添加新闻政务";
            $http.get(cfg.host + 'dic/getsub?code=news').success(function (rst) {
                $scope.kinds = rst;
            });
        }
        else if (id == 2) {
            $scope.title = "添加文明方正";
            $http.get(cfg.host + 'dic/getsub?code=Activity').success(function (rst) {
                $scope.kinds = rst;
            });
        }
        else if (id == 3) {
            $scope.title = "添加通知公告";
            (function(){
                $(".pic-img").hide();
            })();
            $http.get(cfg.host + 'dic/getsub?code=Notice').success(function (rst) {
                $scope.kinds = rst;
            });
        }
        else if (id == 4) {
            $scope.title = "添加推广文章";
            $http.get(cfg.host + 'dic/getsub?code=PushMessage').success(function (rst) {
                $scope.kinds = rst;
            });
        }
        $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
        $scope.extler = ['mov','MOV','3gp','3GP','mp4','MP4','avi','AVI','flv','FLV'];
        //提交
        $scope.model = {
            Content: '',
            FileId: null,
            PushDay: new Date(),
            VideoId:null,
            VideoUrl: null
        };
        $scope.sub = function () {
            getModel();
            $scope.model.IsSub = true;
            if($scope.model.VideoId!=null&&$scope.model.VideoUrl!=null){
                $scope.model.VideoId = null;
            }
            $http.post(cfg.host + 'ArticleContent/add', $scope.model).success(function (rst) {
                if (id == 1) {
                    $state.go("content", { id: 1 });
                }
                else if (id == 2) {
                    $state.go("content", { id: 2 });
                }
                else if (id == 3) {
                    $state.go("content", { id: 3 });
                }
                else if (id == 4) {
                    $state.go("content", { id: 4 });
                }
            });
        };
        //保存
        $scope.save = function () {
            getModel();
            $scope.model.IsSub = false;
            if($scope.model.VideoId!=null&&$scope.model.VideoUrl!=null){
                $scope.model.VideoId = null;
            }
            $http.post(cfg.host + 'ArticleContent/add', $scope.model).success(function (rst) {
                if (id == 1) {
                    $state.go("content", { id: 1 });
                }
                else if (id == 2) {
                    $state.go("content", { id: 2 });
                }
                else if (id == 3) {
                    $state.go("content", { id: 3 });
                }
                else if (id == 4) {
                    $state.go("content", { id: 4 });
                }
            });
        };
            
        function getModel() {
            $scope.model.IsDeleted = false;
            $scope.model.kindId = $scope.kind.Id;
            if (id == 1) {
                $scope.model.Type = 0
            }
            else if (id == 2) {
                $scope.model.Type = 2
            }
            else if (id == 3) {
                $scope.model.Type = 1
            }
            else if (id == 4) {
                $scope.model.Type = 3
            }
        }
        $scope.back = function () {
            if (id == 1) {
                $state.go("content", { id: 1 });
            }
            else if (id == 2) {
                $state.go("content", { id: 2 });
            }
            else if (id== 3) {
                $state.go("content", { id: 3 });
            }
            else if (id == 4) {
                $state.go("content", { id: 4 });
            }
        }
    }]);
    app.register    
       .controller('contentEditCtrl', ['$scope', '$http', '$stateParams', '$state',function ($scope, $http, $stateParams, $state) {
           var id = $stateParams.id;
           $http.get(cfg.host + 'ArticleContent/get/' + id).success(function (rst) {
              $scope.model = rst;
               if ($scope.model.Type == 0) {
                   $scope.title = "修改新闻政务";
                   $http.get(cfg.host + 'dic/getsub?code=news').success(function (rst) {
                       $scope.kinds = rst;
                       $.each($scope.kinds, function (index, item) {
                           if (item.Id == $scope.model.KindId) {
                               $scope.kind = item;
                           }
                       });
                   });
               }
               else if ($scope.model.Type == 2) {
                   $scope.title = '修改文明方正';
                   $http.get(cfg.host + 'dic/getsub?code=Activity').success(function (rst) {
                        $scope.kinds = rst;
                        $.each($scope.kinds, function (index, item) {
                       if (item.Id == $scope.model.KindId) {
                           $scope.kind = item;
                       }
                   });
                    });
               }
               else if ($scope.model.Type == 1) {
                   $scope.title = '修改通知公告';
                   (function(){
                        $(".pic-img").hide();
                    })();
                   $http.get(cfg.host + 'dic/getsub?code=Notice').success(function (rst) {
                        $scope.kinds = rst;
                        $.each($scope.kinds, function (index, item) {
                       if (item.Id == $scope.model.KindId) {
                           $scope.kind = item;
                       }
                   });
                    });
               }
               else if ($scope.model.Type == 3) {
                   $scope.title = '修改推广文章';
                   $http.get(cfg.host + 'dic/getsub?code=PushMessage').success(function (rst) {
                        $scope.kinds = rst;
                        $.each($scope.kinds, function (index, item) {
                       if (item.Id == $scope.model.KindId) {
                           $scope.kind = item;
                       }
                   });
                    });
               }
           });
           $scope.exts=['gif','jpg','jpeg','png','GIF','JPG','PNG'];
            $scope.extler = ['mov','MOV','3gp','3GP','mp4','MP4','avi','AVI','flv','FLV'];
            $scope.ccc = {
                Title:null,
                PushDay:null,
                Content:null,
                FileId:null,
                VideoId:null,
                VideoUrl: null
            };
           $scope.save = function () {
               getModel();
               $scope.ccc.IsSub = false;
               $scope.ccc.id = id;
               $scope.ccc.VideoUrl = $scope.model.VideoUrl;
               if($scope.ccc.VideoId!=null&&$scope.ccc.VideoUrl!=null){
                   $scope.ccc.VideoId = null;
               }
               $http.post(cfg.host + 'ArticleContent/edit', $scope.ccc).success(function (rst) {
                   if ($scope.model.Type == 0) {
                       $state.go("content", { id: 1 });
                   }
                   else if ($scope.model.Type == 2) {
                       $state.go("content", { id: 2 });
                   }
                   else if ($scope.model.Type == 1) {
                       $state.go("content", { id: 3 });
                   }
                   else if ($scope.model.Type == 3) {
                       $state.go("content", { id: 4 });
                   }
               });
           };
           $scope.sub = function () {
               getModel();
               $scope.ccc.IsSub = true;
               $scope.ccc.id = id;
               $scope.ccc.VideoUrl = $scope.model.VideoUrl;
            //    if ($scope.Title != null) {
            //         $scope.ccc.Title = $scope.model.Title;
            //     } else {
            //         $scope.ccc.Title = null;
            //     };
            //    if ($scope.PushDay != null) {
            //         $scope.ccc.PushDay = $scope.model.PushDay;
            //     } else {
            //         $scope.ccc.PushDay = null;
            //     };
            //    if ($scope.Content != null) {
            //         $scope.ccc.Content = $scope.model.Content;
            //     } else {
            //         $scope.ccc.Content = null;
            //     };
            //    if($scope.model.FileId !=null){
            //         $scope.ccc.FileId = $scope.model.FileId;
            //     };
            //     if($scope.model.VideoId !=null){
            //         $scope.ccc.VideoId = $scope.model.VideoId;
            //     };
               if($scope.ccc.VideoId!=null&&$scope.ccc.VideoUrl!=null){
                   $scope.ccc.VideoId = null;
               }
               $http.post(cfg.host + 'ArticleContent/edit', $scope.ccc).success(function (rst) {
                   if ($scope.model.Type == 0) {
                       $state.go("content", { id: 1 });
                   }
                   else if ($scope.model.Type == 2) {
                       $state.go("content", { id: 2 });
                   }
                   else if ($scope.model.Type == 1) {
                       $state.go("content", { id: 3 });
                   }
                   else if ($scope.model.Type == 3) {
                       $state.go("content", { id: 4 });
                   }
               });
           };
           function getModel() {
                if($scope.model){
                    $scope.ccc.kindId = $scope.kind.Id;
                    $scope.ccc.Content = $scope.model.Content;   
                    $scope.ccc.Title  = $scope.model.Title;  
                    $scope.ccc.PushDay  = $scope.model.PushDay;     
                    if($scope.model.FileId !=null){
                        $scope.ccc.FileId = $scope.model.FileId;
                    }
                    if($scope.model.VideoId !=null){
                        $scope.ccc.VideoId = $scope.model.VideoId;
                    }
                }
           };
           $scope.back = function () {
               if ($scope.model.Type == 0) {
                   $state.go("content", { id: 1 });
               }
               else if ($scope.model.Type == 2) {
                   $state.go("content", { id: 2 });
               }
               else if ($scope.model.Type == 1) {
                   $state.go("content", { id: 3 });
               }
               else if ($scope.model.Type == 3) {
                   $state.go("content", { id: 4 });
               }
           }
       }]);
           app.register
          .controller('contentDetailCtrl', ['$scope', '$http', '$stateParams',  '$state',function ($scope, $http, $stateParams, $state) {
              var id = $stateParams.id;
              $http.get(cfg.host + 'ArticleContent/get/' + id).success(function (rst) {
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
                      (function(){
                        $(".pic-img").hide();
                    })();
                  }
                  else if ($scope.model.Type == 3) {
                      $scope.model.TypeName = '推广文章';
                  }
                  //var strUrl = "/upload/7c1698d0-7aa8-4498-8545-dff19593e9ec.mp4";
                  var strUrl = $scope.model.VideoUrl;
                  var partten = /\/upload/g;
                  if(partten.test(strUrl)){
                      $("#videoHtml").append("<video src='"+$scope.model.VideoUrl+"' controls='controls' style='width: 500px;'>您的浏览器由于版本过低,不支持该视频播放。</video>");
                  }else{
                      $("#videoHtml").append($scope.model.VideoUrl);
                  }
              });

              $scope.back = function () {
                  if ($scope.model.Type == 0) {
                      $state.go("content", { id: 1 });
                  }
                  else if ($scope.model.Type == 2) {
                      $state.go("content", { id: 2 });
                  }
                  else if ($scope.model.Type == 1) {
                      $state.go("content", { id: 3 });
                  }
                  else if ($scope.model.Type == 3) {
                      $state.go("content", { id: 4 });
                  }
                  else {
                      $state.go("wxinfo");
                  }
                  
              }
          }]);
       })