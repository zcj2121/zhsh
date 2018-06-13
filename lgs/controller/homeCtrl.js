define(['app'], function (app) {
    app.register
        .controller('homeCtrl', function ($scope, $http,$state) {  
            $.get(cfg.host + 'SsoLogin/GetToken', function (token) {
                if (token) {
                    $.ajax({
                        url: cfg.userUrl,
                        headers: {
                            Authorization: 'Bearer ' + token
                        },
                        success: function (rst) {
                            $scope.user = rst;
                            $scope.load = false;
                            var userRol = rst.Roles[0].Name;
                            if(userRol=='life.baimi'){
                                $("a[ui-sref='jump ']").parent('li').addClass('suver').siblings('.suver').removeClass('suver');
                                $state.go('jump ');
                            }else if(userRol=='life.government'){
                                $http.get(cfg.host + 'Government/GetBindStatu?UserId='+rst.Id).success(function (rst) {
                                    if(rst==true){
                                        $("a[ui-sref='bureau']").parent('li').addClass('suver').siblings('.suver').removeClass('suver');
                                        $state.go('bureau');
                                    }else{
                                        $state.go('info');
                                    };
                                });
                                
                            }
                        }
                    })
                }
            });
            //query
            $scope.query = {
                PushDay: new Date(),
                Size:15,
                Index:1
            };
            function getIds() {
                var arr = [];
                $('td>:checked').map(function () { arr.push(($(this).data('id'))); });
                return arr;
            }
            //批量推送
            $scope.push =function (e) {
                var ids = getIds();
                console.log(ids);
                var data = $scope.items;
                if (ids.length > 0) {
                    $http.post(cfg.host + 'push/push', {
                        Ids: ids
                    }).success(function (rst) {
                        $scope.queryFunc();
                    });
                } else {
                    alert("请选择要推送的数据");
                }

            };
            /*$scope.push = function () {
                $http.get(cfg.host + "push/push").success(function () { $scope.queryFunc(); });
            }*/
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'content/QueryQueue', $scope.query).success(function (rst) {
                    $scope.items = rst.Data;
                    $scope.data = rst;
                });
            };
            $scope.go = function (index, size) {
                $scope.query.Index = index;
                $scope.query.Size = size;
            };
            
            $http.get(cfg.host + 'Home/getHome').success(function (rst) {
                    $scope.data = rst;
                    if(rst != null){ 
                        var rsut = rst.Zhes;
                        var dateAdd=[];
                        var Getday =[];
                        for(var i=0;i<rsut.length;i++){
                            var d = rsut[i].Day;
                            var c = new Date(d);
                            var dd = c.getMonth() + 1;
                            var bb = c.getDate();
                            var b = dd+'月'+bb+'日';
                            Getday.push(b);
                            dateAdd.push(rsut[i].Value)
                        };
                        // var buildCount = rst.Msg_count;
                        // var NegotiateCount = rst.Msg_user;
                        // var targetData = [{value:NegotiateCount, name:'发送消息的用户数'},{value:buildCount,name:"用户向公众号发送的消息总数"}];
                        //路径配置
                        require.config({
                            paths: {
                                'echarts': '../Scripts/ECharts/echarts',
                                'echarts/chart/line': '../Scripts/ECharts/chart/line',
                                'echarts/chart/pie': '../Scripts/ECharts/chart/pie'
                            },
                            shim: {
                                'echarts/chart/line': {
                                    deps: ['echarts']
                                },
                                'echarts/chart/pie': {
                                    deps: ['echarts']
                                }
                            }
                        });
                        // 使用
                        require(['echarts', 'echarts/chart/line', 'echarts/chart/pie'], function (ec) {
                            var myChart = ec.init(document.getElementById('main'));
                            var option = {
                                tooltip: {
                                    trigger: 'axis'
                                },
                                noDataLoadingOption: {
                                    text: '暂无数据',
                                    effect: 'bubble',
                                    effectOption: {
                                        effect: {
                                            n: 0
                                        }
                                    }
                                },
                                title: {
                                    text: '最近7天关注用户总量',
                                    subtext: '',
                                    x: 'center'
                                },
                                calculable: true,
                                xAxis: [{
                                    type: 'category',
                                    boundaryGap: false,
                                    data: Getday
                                }],
                                yAxis: [{
                                    type: 'value'
                                }],
                                series: [{
                                    name: '用户量',
                                    type: 'line',
                                    stack: '总量',
                                    data: dateAdd
                                }]
                            };
                            // var optionx = {
                            //     title: {
                            //         text: '消息推送/用户',
                            //         subtext: '',
                            //         x: 'center'
                            //     },
                            //     tooltip: {
                            //         trigger: 'item',
                            //         formatter: "{a} <br/>{b} : {c} ({d}%)"
                            //     },
                            //     noDataLoadingOption: {
                            //         text: '暂无数据',
                            //         effect: 'bubble',
                            //         effectOption: {
                            //             effect: {
                            //                 n: 0
                            //             }
                            //         }
                            //     },
                            //     legend: {
                            //         orient: 'vertical',
                            //         x: 'left',
                            //         data: ['用户向公众号发送的消息总数', '发送消息的用户数']
                            //     },
                            //     calculable: true,
                            //     series: [{
                            //         name: '消息推送/用户',
                            //         type: 'pie',
                            //         radius: '55%',
                            //         data: targetData
                            //     }]
                            // };
                            // 为echarts对象加载数据
                            myChart.setOption(option);
                            // myChartx.setOption(optionx);
                            setTimeout(function () {
                                window.onresize = function () {
                                    myChart.resize();
                                    //  myChartx.resize();
                                }
                            }, 1)
                        });
                    };
                });

                $http.get(cfg.host + 'Home/GetHotArticle').success(function (rst) {
                    $scope.data = rst;
                    if(rst != null){ 
                        var rsut = rst;
                        var Getday =[];
                        var Getnum = [];
                        for(var i=0;i<rsut.length;i++){
                            var soer = rsut[i].Title;
                            // if(rsut[i].Title.length > 5){
                            //     var noer = soer.substring(0,5);
                            //     var getday =  noer +'...';
                            // }else{
                                var getday = soer;
                            // }
                            var getnum = rsut[i].ViewCount;
                            Getday.push(getday);
                            Getnum.push(getnum)
                        };
                        //路径配置
                        require.config({
                            paths: {
                                'echarts': '../Scripts/ECharts/echarts',
                                'echarts/chart/bar': '../Scripts/ECharts/chart/bar',
                                'echarts/chart/line': '../Scripts/ECharts/chart/line',
                                'echarts/chart/pie': '../Scripts/ECharts/chart/pie'
                            },
                            shim: {
                                'echarts/chart/bar': {
                                    deps: ['echarts']
                                },
                                'echarts/chart/line': {
                                    deps: ['echarts']
                                },
                                'echarts/chart/pie': {
                                    deps: ['echarts']
                                }
                            }
                        });
                        // 使用
                        require(['echarts', 'echarts/chart/bar', 'echarts/chart/line', 'echarts/chart/pie'], function (ec) {
                            var myChartx = ec.init(document.getElementById('pieBin'));
                            var optionx = {
                                title: {
                                    text: '阅读统计',
                                    x: 'center'
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                        type : 'shadow'       // 默认为直线，可选为：‘line‘ | ‘shadow‘
                                    }
                                },
                                noDataLoadingOption: {
                                    text: '暂无数据',
                                    effect: 'bubble',
                                    effectOption: {
                                        effect: {
                                            n: 0
                                        }
                                    }
                                },
                                xAxis : [
                                    {
                                        type : 'category',
                                        axisLabel:{
                                            interval:0,
                                            margin:2,
                                            formatter:function(val){
                                                var s=val,reg=/.{2}/g,rs=s.match(reg);
                                                rs.push(s.substring(rs.join('').length));
                                                return rs.join("\n");
                                            }
                                        },
                                        data : Getday
                                    }
                                ],
                                yAxis : [
                                    {   name:'次数',
                                        type : 'value'
                                    }
                                ],
                                series : [
                                    {
                                        name:'阅读量',
                                        type:'bar',
                                        data:Getnum

                                    }
                                ]
                            };
                    
                            // 为echarts对象加载数据
                            myChartx.setOption(optionx);
                            setTimeout(function () {
                                window.onresize = function () {
                                    myChartx.resize();
                                }
                            }, 1)
                        });
                    }else{

                    };
                });
                $scope.$watch('query', $scope.queryFunc, true);
        });
    app.register
        .controller('infoCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '委办局菜单绑定';
            $http.get(cfg.host + 'Government/GetGovernment').success(function (rst) {
                $scope.kinds = rst;
            });
            var userid = $scope.userId;
            $scope.model={};
            $scope.save = function () {
                $scope.model.UserId = userid;
                $http.post(cfg.host + 'Government/BindUserMenu', $scope.model).success(function (rst) {
                    //跳转
                    $state.go('bureau');
                });
            };
       });
})
