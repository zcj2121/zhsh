function showLoadingTips() {
    isLoadingData = true;
    $("div.container").addClass("active");
    $("div.foot").show();
}
function hideLoadingTips(){
    isLoadingData = false;
    $("div.foot").hide();
    $("div.container").removeClass("active");
}

(function (window) {
    var cfg = {
        hostName: '../m/',
        host: '../api/',
        userUrl: 'http://sh.zhfz.org.cn/api/user/GetInfo',
        imgUrl:'http://sh.zhfz.org.cn/'
    };

    cfg.javahost = 'http://cg.zhfz.org.cn';
    window.cfg = cfg;
})(window)

function Geturl(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
};

function add0(m){return m<10?'0'+m:m }
function format(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(shijianchuo);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
return y+'-'+add0(m)+'-'+add0(d);
}