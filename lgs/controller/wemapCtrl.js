define(['app'], function (app) {
    app.register
        .controller('wemapCtrl', function ($scope, $http) {
            $scope.title = '便民地图';
            $http.get(cfg.host + 'dic/getsub?code=MapType').success(function (rst) {
                $scope.kinds = rst;
            });
            $scope.query = {
                Index: 1,
                Size: 15,
                Name: null
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'Map/Query', $scope.query).success(function (rst) {
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
        .controller('wemapMainCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '时刻表管理';
            var id = $stateParams.id;
            var name = $stateParams.name;
            $scope.MainId = id;
            $scope.MainName = name;
            $scope.query = {
                Index: 1,
                Size: 15,
                Name: null,
                MapId: id
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'Map/QueryCars', $scope.query).success(function (rst) {
                    $scope.items = rst.Data;
                    $scope.data = rst;
                });
            };
            $scope.go = function (index, size) {
                $scope.query.Index = index;
                $scope.query.Size = size;
            };
            $scope.$watch('query', $scope.queryFunc, true);

            $scope.back = function () {
                $state.go('wemap');
            };

        });
    app.register
        .controller('wemapMainAddCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '添加班次';
            var id = $stateParams.id;
            var name = $stateParams.name;
            var data = [{
                Station: name,
                Terminus: null,
                Time: null,
                Number: null
            }];
            $scope.add = function (idx) {
                data.push({
                    Station: name,
                    Terminus: null,
                    Time: null,
                    Number: null
                });
            };
            $scope.del = function (data, item) {
                data.splice(data.indexOf(item), 1);
            };
            $scope.data = data;
            $scope.model = {

            }
            $scope.save = function () {
                $scope.model.MapId = id;
                $scope.model.Content = null;
                $scope.model.CarItemInfo = $scope.data;
                $http.post(cfg.host + 'Map/AddCare', $scope.model).success(function () {
                    window.history.go(-1);
                });
            };

            $scope.back = function () {
                window.history.go(-1);
            };

        });
    app.register
        .controller('wemapMainEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '修改班次';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Map/GetCar/' + id).success(function (rst) {
                $scope.model = rst;
            });
            $scope.model = {}
            $scope.save = function () {
                $scope.model.MapId = id;
                $http.post(cfg.host + 'Map/EditCare', $scope.model).success(function () {
                    window.history.go(-1);
                });
            };

            $scope.back = function () {
                window.history.go(-1);
            };

        });
    app.register
        .controller('wemapAddCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '新增地图信息';
            $("#verifyCheck .def").hide();
            $("#verifyCheck input.form-control").focus(function(){
            $(this).parent("div[class*='col-']").find(".def").show();
            if($(this).val()==this.defaultValue){
                    $(this).val("");
                }
            });
            $http.get(cfg.host + 'dic/getsub?code=MapType').success(function (rst) {
                $scope.kinds = rst;
            });
            $scope.$watch('model.TypeId',
                function () {
                    var name =  $("#typeName").find("option:selected").text();
                    if(name=="公交站点"){
                        $scope.checkedbox = true;
                    }else{
                        $scope.checkedbox = false;
                    };
                }, true);
            $scope.model = {
                Name: null,
                BusinessTime: '09:00-18:00',
                TypeId: null,
                Phone: null,
                Xaxis: 45.84401,
                Yaxis: 128.84219,
                IsCorner:false
            };
            $scope.disablfun = true;
            $scope.chefun = function () {
                if ($scope.checkfun == true) {
                    $scope.disablfun = false;
                } else {
                    $scope.disablfun = true;
                };
            };

            //地图
            function mapInit() {
                //在指定的容器内创建地图实例
                var map = new BMap.Map("container");
                // map.setDefaultCursor("crosshair"); //设置地图默认的鼠标指针样式
                map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用。
                //创建点坐标
                var point = new BMap.Point($scope.model.Yaxis, $scope.model.Xaxis);
                //初始化地图，设置中心点坐标和地图级别
                map.centerAndZoom(point, 15);
                var gc = new BMap.Geocoder();
                var top_left_navigation = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_TOP_RIGHT,
                    offset: new BMap.Size(5, 35)
                }); //左上角，添加默认缩放平移控件
                map.addControl(top_left_navigation);
                //OverviewMapControl 缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.CopyrightControl());
                // 创建标注  
                var marker = new BMap.Marker(point);
                // 将标注添加到地图中
                map.addOverlay(marker);
                //********************************************监听标注事件

                //*******************************************可托拽的标注
                marker.enableDragging();
                //监听标注的dragend事件来捕获拖拽后标注的最新位置
                marker.addEventListener("dragend", function (e) {
                    gc.getLocation(e.point, function (rs) {
                        showLocationInfo(e.point, rs);
                    });
                    point = new BMap.Point(e.point.lng, e.point.lat);
                    map.centerAndZoom(point, 15);
                });

                //*****************************信息窗口
                //显示地址信息窗口  
                function showLocationInfo(pt, rs) {
                    var opts = {
                        width: 200, //信息窗口宽度  
                        height: 100, //信息窗口高度  
                        title: "当前位置" //信息窗口标题  
                    };

                    var addComp = rs.addressComponents;
                    var addr = "当前位置：" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + "<br/>";
                    //            addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;  
                    document.getElementById("lonlater").value = pt.lat;
                    document.getElementById("lonlat").value = pt.lng;
                    var infoWindow = new BMap.InfoWindow(addr, opts); //创建信息窗口对象  
                    marker.openInfoWindow(infoWindow);
                };
            };
            mapInit();

            $scope.$watch('disablfun', function (e) {
                mapInit();
                $scope.$watch('model.Xaxis+model.Yaxis', function (e) {
                    mapInit();
                }, true);
            }, true);
            $scope.save = function () {
                $scope.model.Xaxis = $("#lonlater").val();
                $scope.model.Yaxis = $("#lonlat").val();
                $http.post(cfg.host + 'Map/Add', $scope.model).success(function (rst) {
                    //跳转
                    window.history.go(-1);
                });
            };
            $scope.back = function () {
                //跳转
                    window.history.go(-1);
            }
        });

    app.register
        .controller('wemapEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '修改地图信息';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Map/Get/' + id).success(function (rst) {
                $scope.model = rst;
                $http.get(cfg.host + 'dic/getsub?code=MapType').success(function (rst) {
                    $scope.kinds = rst;
                    $.each($scope.kinds, function (index, item) {
                        if (item.Id == $scope.model.TypeId) {
                            $scope.kind = item;
                        };
                    });
                });
                $scope.chefun = function () {
                    if ($scope.checkfun == true) {
                        $scope.disablfun = false;
                    } else {
                        $scope.disablfun = true;
                    };
                };

                //地图
                function mapInit() {
                    //在指定的容器内创建地图实例
                    var map = new BMap.Map("container");
                    // map.setDefaultCursor("crosshair"); //设置地图默认的鼠标指针样式
                    map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用。
                    //创建点坐标
                    var point = new BMap.Point($scope.model.Yaxis, $scope.model.Xaxis);
                    //初始化地图，设置中心点坐标和地图级别
                    map.centerAndZoom(point, 15);
                    //panTo()方法 等待两秒钟后-让地图平滑移动至新中心点
                    //***********************地址解析类  
                    var gc = new BMap.Geocoder();
                    //向map中添加--------------------------------------控件
                    //NavigationControl 地图平移缩放控件，默认位于地图左上方 它包含控制地图的平移和缩放的功能。
                    map.addControl(new BMap.NavigationControl());
                    //OverviewMapControl 缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图
                    map.addControl(new BMap.OverviewMapControl());

                    //CopyrightControl：版权控件，默认位于地图左下方
                    map.addControl(new BMap.CopyrightControl());

                    // 创建标注  
                    var marker = new BMap.Marker(point);
                    // 将标注添加到地图中
                    map.addOverlay(marker);
                    //********************************************监听标注事件

                    //*******************************************可托拽的标注
                    //marker的enableDragging和disableDragging方法可用来开启和关闭标注的拖拽功能。
                    marker.enableDragging();
                    //监听标注的dragend事件来捕获拖拽后标注的最新位置
                    marker.addEventListener("dragend", function (e) {
                        gc.getLocation(e.point, function (rs) {
                            showLocationInfo(e.point, rs);
                        });
                        point = new BMap.Point(e.point.lng, e.point.lat);
                        map.centerAndZoom(point, 15);
                    });

                    //*****************************信息窗口
                    //显示地址信息窗口  
                    function showLocationInfo(pt, rs) {
                        var opts = {
                            width: 200, //信息窗口宽度  
                            height: 100, //信息窗口高度  
                            title: "当前位置" //信息窗口标题  
                        };

                        var addComp = rs.addressComponents;
                        var addr = "当前位置：" + addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber + "<br/>";
                        //            addr += "纬度: " + pt.lat + ", " + "经度：" + pt.lng;  
                        document.getElementById("lonlater").value = pt.lat;
                        document.getElementById("lonlat").value = pt.lng;
                        var infoWindow = new BMap.InfoWindow(addr, opts); //创建信息窗口对象  
                        marker.openInfoWindow(infoWindow);
                    };
                };
                mapInit();

                $scope.$watch('disablfun', function (e) {
                    mapInit();
                    $scope.$watch('model.Xaxis+model.Yaxis', function (e) {
                        mapInit();
                    }, true);
                }, true);
                $scope.$watch('kind',
                function () {
                    var name =  $("#typeName").find("option:selected").text();
                    if(name=="公交站点"){
                        $scope.checkedbox = true;
                    }else{
                        $scope.checkedbox = false;
                    };
                }, true);
            });
            $scope.model = {
                IsCorner:false
            }
            $scope.save = function () {
                $scope.model.Id = id;
                $scope.model.TypeId = $scope.kind.Id;
                $scope.model.Xaxis = $("#lonlater").val();
                $scope.model.Yaxis = $("#lonlat").val();
                $http.post(cfg.host + 'Map/Edit', $scope.model).success(function () {
                    $state.go('wemap');
                });
            };

            $scope.back = function () {
                $state.go('wemap');
            };

        });
    app.register
        .controller('wemapDetailCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '查看地图信息';

            $http.get(cfg.host + 'dic/getsub?code=MapType').success(function (rst) {
                $scope.kinds = rst;
                if (rst != [] && rst != null && rst != '' && rst) {
                    map.clearOverlays(); //清除地图上所有标注
                    $http.get(cfg.host + 'Map/GetMap?TypeId=' + rst[0].Id).success(function (rst) {
                        $("#mapUl").children("li").eq(0).children("a").addClass("active")
                        var opts = {
                            width: 150, // 信息窗口宽度
                            height: 100, // 信息窗口高度
                            title: "" // 信息窗口标题
                        };
                        for (var i = 0; i < rst.length; i++) {
                            var markerGreen = new BMap.Marker(new BMap.Point(rst[i].Yaxis, rst[i].Xaxis)); // 创建标注
                            var content = '<div style="margin:0;line-height:18px;padding:2px;">' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">名称：</label>' + rst[i].Name + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">地址：</label>' + rst[i].Address + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">电话：</label>' + rst[i].Phone + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">营业：</label>' + rst[i].MainBusiness + '</div>' +
                                '</div>'; //内容
                            map.addOverlay(markerGreen); // 将标注添加到地图中
                            addClickHandler(content, markerGreen);

                        };

                        function addClickHandler(content, marker) {
                            marker.addEventListener("click", function (e) {
                                openInfo(content, e)
                            });
                        }

                        function openInfo(content, e) {
                            var p = e.target;
                            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                            var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
                            map.openInfoWindow(infoWindow, point); //开启信息窗口)
                        }
                        setTimeout(function () {
                            var arr = [];
                            for (var i = 0; i < rst.length; i++) {
                                var allzhu = new BMap.Point(rst[i].Yaxis, rst[i].Xaxis);
                                arr.push(allzhu)
                            }
                            map.setViewport(arr); //调整到最佳视野  
                        }, 0);
                    });
                };


            });

            //nav选中
            $("#mapUl").delegate("a", "click", function () {
                $(this).addClass("active").parent("li").siblings().find("a").removeClass("active");
            });
            var map = new BMap.Map("container");
            map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用。
            var point = new BMap.Point(128.84219, 45.84401);
            map.centerAndZoom(point, 19);
            var gc = new BMap.Geocoder();
            var top_left_navigation = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(5, 35)
            }); //左上角，添加默认缩放平移控件
            map.addControl(top_left_navigation);
            map.addControl(new BMap.OverviewMapControl());
            $scope.dataclick = function (e,q) {
                map.clearOverlays(); //清除地图上所有标注
                if(q!="汽车客运"){
                    point = new BMap.Point(128.84219, 45.84401);
                    map.centerAndZoom(point, 19);
                    var marker = new BMap.Marker(point);   
                    marker.enableDragging();
                }else{
                    point = new BMap.Point(128.84219, 45.84401);
                    map.centerAndZoom(point, 15);
                    var marker = new BMap.Marker(point);   
                    marker.enableDragging();
                };
                $http.get(cfg.host + 'Map/GetMap?TypeId=' + e).success(function (rst) {
                    var opts = {
                        width: 150, // 信息窗口宽度
                        height: 100, // 信息窗口高度
                        title: "" // 信息窗口标题
                    };
                    for (var i = 0; i < rst.length; i++) {
                        var cverX = rst[i].Yaxis-point.lng;
						var cverY = rst[i].Xaxis-point.lat;
                        function initFun(){
                            var markerGreen = new BMap.Marker(new BMap.Point(rst[i].Yaxis, rst[i].Xaxis)); // 创建标注
                            var content = '<div style="margin:0;line-height:18px;padding:2px;">' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">名称：</label>' + rst[i].Name + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">地址：</label>' + rst[i].Address + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">电话：</label>' + rst[i].Phone + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">营业：</label>' + rst[i].MainBusiness + '</div>' +
                                '</div>'; //内容
                            map.addOverlay(markerGreen); // 将标注添加到地图中
                            addClickHandler(content, markerGreen);
                        };

                        if(q!="汽车客运"){
                            if((cverX>-0.003&&cverX<0.003)&&(cverY>-0.003&&cverY<0.003)){
                                initFun();
                            }
                        }else{
                            initFun();
                        }

                    };

                    map.addEventListener("dragend", function(){
                        map.clearOverlays();  //清除地图上所有标注 
                        point = map.getCenter(); 
                        for (var i = 0; i < rst.length; i++) {
                        
                        function initerFun(){
                            var markerGreen = new BMap.Marker(new BMap.Point(rst[i].Yaxis, rst[i].Xaxis)); // 创建标注
                            var content = '<div style="margin:0;line-height:18px;padding:2px;">' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">名称：</label>' + rst[i].Name + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">地址：</label>' + rst[i].Address + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">电话：</label>' + rst[i].Phone + '</div>' +
                                '<div style="font-size:10px;color:#333"></div>' +
                                '<div style="font-size:10px;color:#333"><label style="font-size:12px;color:#666;font-weight:600">营业：</label>' + rst[i].MainBusiness + '</div>' +
                                '</div>'; //内容
                            map.addOverlay(markerGreen); // 将标注添加到地图中
                            addClickHandler(content, markerGreen);
                        };

                        if(q!="汽车客运"){
                            var cverX = rst[i].Yaxis-point.lng;
						    var cverY = rst[i].Xaxis-point.lat;
                            if((cverX>-0.003&&cverX<0.003)&&(cverY>-0.003&&cverY<0.003)){
                                initerFun();
                            }
                        }else{
                            initerFun();
                        }

                    };
                    });
                    function addClickHandler(content, marker) {
                        marker.addEventListener("click", function (e) {
                            openInfo(content, e)
                        });
                    }

                    function openInfo(content, e) {
                        var p = e.target;
                        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                        var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
                        map.openInfoWindow(infoWindow, point); //开启信息窗口)
                    }
                    // setTimeout(function () {
                    //     var arr = [];
                    //     for (var i = 0; i < rst.length; i++) {
                    //         var allzhu = new BMap.Point(rst[i].Yaxis, rst[i].Xaxis);
                    //         arr.push(allzhu)
                    //     }
                    //     map.setViewport(arr); //调整到最佳视野  
                    // }, 0);
                });





            };

            $scope.back = function () {
                $state.go('wemap');
            };

        });

    app.register
        .controller('wemapImportCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '批量导入地图标点';
            $http.get(cfg.host + 'dic/getsub?code=MapType').success(function (rst) {
                var arr =[];
                for(var i=0;i<rst.length;i++){
                    if(rst[i].Name!="公交站点"){
                        arr.push(rst[i])
                    };
                };
                $scope.kinds = arr;
            });
            // $scope.save = function () {
            //     $scope.model.Xaxis = $("#lonlater").val();
            //     $scope.model.Yaxis = $("#lonlat").val();
            //     $http.post(cfg.host + 'Map/Add', $scope.model).success(function (rst) {
            //         //跳转
            //         $state.go('wemap');
            //     });
            // };
            $scope.back = function () {
                $state.go('wemap');
            }
        });
});