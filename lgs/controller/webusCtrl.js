define(['app'], function (app) {
    app.register
        .controller('webusCtrl', function ($scope, $http) {
            $scope.title = '公交线路管理';
            $scope.query = {
                Name: null,
                IsDeleted: false,
                Index: 1,
                Size: 15
            };
            $scope.queryFunc = function () {
                $http.post(cfg.host + 'bus/query', $scope.query).success(function (rst) {
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
        .controller('webusMainCtrl', function ($scope, $http, $stateParams,$state) {
            $scope.title = '公交站点管理';
            var id = $stateParams.id;
            $scope.MainId = id;
            $scope.queryFunc = function () {
                $http.get(cfg.host + 'Bus/GetItems/' + id).success(function (rst) {
                    $scope.items = rst;
                    $scope.data = rst;
                });
            };
            $scope.$watch('query', $scope.queryFunc, true);
            $scope.back = function () {
                $state.go('webus');
            };
        });
    //添加主键
    app.register
        .controller('webusAddCtrl', function ($scope, $http, $state) {
            $scope.title = '添加公交线路';
            $scope.model = {
                Name: null
            };
            var hours = [];
            for (var i = 0; i < 24; i++) {
                if(i<10){
                    i= "0"+i
                }else{
                    i=""+i
                }
                hours.push(i);
            };
            var mins = [];
            for (var i = 0; i < 60; i++) {
                if(i<10){
                    i= "0"+i
                }else{
                    i=""+i
                }
                mins.push(i);
            };
            $scope.hours = hours;
            $scope.mins = mins;
            $scope.save = function () {
                if ($scope.da.firhour < 10) {
                    var firhour = "" + $scope.da.firhour;
                } else {
                    var firhour = $scope.da.firhour;
                };
                if ($scope.da.firmin < 10) {
                    var firmin = "" + $scope.da.firmin;
                } else {
                    var firmin = $scope.da.firmin;
                };
                if ($scope.da.befhour < 10) {
                    var befhour = "" + $scope.da.befhour;
                } else {
                    var befhour = $scope.da.befhour;
                };
                if ($scope.da.befmin < 10) {
                    var befmin = "" + $scope.da.befmin;
                } else {
                    var befmin = $scope.da.befmin;
                };
                $scope.model.BeginTime = firhour + '时' + firmin + "分";
                $scope.model.EndTime = befhour + '时' + befmin + "分";
                $http.post(cfg.host + 'Bus/Add', $scope.model).success(function (rst) {
                    //跳转
                    $state.go('webus');
                });
            };

            $scope.back = function () {
                $state.go('webus');
            };
        });

    //添加子健
    app.register
        .controller('webusMainAddCtrl', function ($scope, $http, $stateParams) {
            $scope.title = '添加公交站点';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Map/GetSub').success(function (rst) {
                $scope.buss = rst;
            });
            $scope.model = {
                BusId: id,
                MapId:null,
                OrderNum:null
            };
            $scope.save = function () {
                $scope.model.MapId=$scope.da.MapId;
                $scope.model.OrderNum=$scope.da.OrderNum;
                $http.post(cfg.host + 'Bus/AddItem', $scope.model).success(function (rst) {
                    //跳转
                    window.history.go(-1);
                });
            };
            $scope.back = function () {
                window.history.go(-1);
            };
        });

    //修改主键
    app.register
        .controller('webusEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '修改公交线路';
            var id = $stateParams.id;
            var hours = [];
            for (var i = 0; i < 24; i++) {
                if(i<10){
                    i= "0"+i
                }else{
                    i=""+i
                };
                hours.push(i);
            };
            var mins = [];
            for (var i = 0; i < 60; i++) {
                if(i<10){
                    i= "0"+i
                }else{
                    i=""+i
                };
                mins.push(i);
            };
            $http.get(cfg.host + 'Bus/Get/' + id).success(function (rst) {
                $('#busType option[value='+rst.Type+']').attr('selected','selected');
                var str = rst.BeginTime;
                var ber = rst.EndTime;
                var firstH = str.substr(0, str.indexOf('时'));
                var beforeH = ber.substr(0, ber.indexOf('时'));
                var firstM = str.substr(3, str.indexOf('时'));
                var beforeM = ber.substr(3, ber.indexOf('时'));
                $scope.model = rst;
                $scope.hours = hours;
                $scope.mins = mins;
                $.each($scope.hours, function (index, item) {
                    
                    if (item == firstH) {
                        $scope.firhour = item;
                    };
                    if (item == beforeH) {
                        $scope.befhour = item;
                    };
                });
                $.each($scope.mins, function (index, item) {
                    
                    if (item == firstM) {
                        $scope.firmin = item;
                    };
                    if (item == beforeM) {
                        $scope.befmin = item;
                    };
                });
            });

            $scope.save = function () {
                $scope.model.Id = id;
                var firhour = $("#firhour").val();
                var befhour = $("#befhour").val();
                var firmin = $("#firmin").val();
                var befmin = $("#befmin").val();
                $scope.model.BeginTime = firhour + '时' + firmin + "分";
                $scope.model.EndTime = befhour + '时' + befmin + "分";
                $scope.model.Type = $("#busType").val();
                $http.post(cfg.host + 'Bus/Edit', $scope.model).success(function () {
                    $state.go('webus');
                });
            };

            $scope.back = function () {
                window.history.go(-1);
            };

        });
    //修改子键
    app.register
        .controller('webusMainEditCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '修改公交站点';
            var id = $stateParams.id;
            $http.get(cfg.host + 'Bus/GetItem/' + id).success(function (rst) {
                $scope.model = rst;
                $http.get(cfg.host + 'Map/GetSub').success(function (rst) {
                    $scope.buss = rst;
                    $.each($scope.buss,function(index, item){
                        if(item.Id==$scope.model.MapId){
                            $scope.bus = item;
                        };
                    });
                });
            });
            $scope.da={

            };
            $scope.save = function () {
                $scope.da.Id = id;
                $scope.da.MapId = $scope.bus.Id;
                $scope.da.OrderNum = $scope.model.OrderNum;
                $scope.da.BusId = $scope.model.BusId;
                $http.post(cfg.host + 'Bus/EditItem', $scope.da).success(function () {
                    window.history.go(-1);
                });
            };

            $scope.back = function () {
                window.history.go(-1);
            };
        });
        //查看详情
        app.register
        .controller('webusDetailCtrl', function ($scope, $http, $stateParams, $state) {
            $scope.title = '查看公交路线图';
            var id = $stateParams.id;
            var map = new BMap.Map("container");
            map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用。
            var point = new BMap.Point(128.84219, 45.84401);
            map.centerAndZoom(point, 15);
            var gc = new BMap.Geocoder();
            var top_left_navigation = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                offset: new BMap.Size(5, 35)
            }); //左上角，添加默认缩放平移控件
            map.addControl(top_left_navigation);
            map.addControl(new BMap.OverviewMapControl());
            $http.get(cfg.host + 'Bus/GetItems/' + id).success(function (rst) {
                //自定义公交路线  折线+标点
                if(rst!=[]&&rst!=null&&rst!=''&&rst){
                    var arrs = [];
                    var att = [];
                    for(var i =0;i<rst.length;i++){
                        arrs.push([parseFloat(rst[i].Yaxis),parseFloat(rst[i].Xaxis)])
                    };
                    for(var k =0;k<rst.length;k++){
                        if(rst[k].IsCorner==true){
                            att.push([parseFloat(rst[k].Yaxis),parseFloat(rst[k].Xaxis)])
                        };
                    }
                    console.log(arrs)
                    console.log(att)
                    // var arrs = [[128.834429, 45.835011],[128.85067, 45.833881],[128.858719, 45.835589],[128.870073, 45.831419]]
                    var myIconfir = new BMap.Icon("../../Images/map/1.png",new BMap.Size(25,25));//起点标注
                    var myIconbef = new BMap.Icon("../../Images/map/2.png",new BMap.Size(25,25));//终点标注
                    var myIconcon = new BMap.Icon("../../Images/map/buscon.png",new BMap.Size(20,20));//途经点标注
                    var myIcontou = new BMap.Icon("../../Images/map/toum.png",new BMap.Size(20,20));//途经点标注
                    var ary = [];
                    for(var i in arrs){
                        ary.push(new BMap.Point(arrs[i][0],arrs[i][1]));
                    };
                    var polyline = new BMap.Polyline(ary, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});   //创建折线
                    map.addOverlay(polyline);   //增加折线
                    for(var j =1;j<arrs.length-1;j++){ //创建途径标注
                        var biaozhu = new BMap.Marker(new BMap.Point(arrs[j][0],arrs[j][1]),{ 
                            icon:myIconcon
                        });
                        for(var r=0;r<att.length;r++){
                            if(att[r][0]==arrs[j][0]){
                                var biaozhu = new BMap.Marker(new BMap.Point(arrs[j][0],arrs[j][1]),{ 
                                    icon:myIcontou
                                });
                            };
                        };
                        map.addOverlay(biaozhu);
                    };
                    var firbiao = new BMap.Marker(new BMap.Point(arrs[0][0],arrs[0][1]),{ //创建起点标注
                        icon:myIconfir,
                    });
                    var befbiao = new BMap.Marker(new BMap.Point(arrs[arrs.length-1][0],arrs[arrs.length-1][1]),{ //创建终点标注
                        icon:myIconbef,
                    });
                    map.addOverlay(firbiao);//添加起点标注到地图
                    map.addOverlay(befbiao);//添加终点标注到地图
                    setTimeout(function(){  //调整到最佳视野
                        var arr = [];
                        for(var i=0;i<arrs.length;i++){
                            var allzhu = new BMap.Point(arrs[i][0],arrs[i][1]);
                            arr.push(allzhu)
                        }
                        map.setViewport(arr);            
                    },1000); 
                };
            });
            $scope.back = function () {
                window.history.go(-1);
            };
        });
        
})