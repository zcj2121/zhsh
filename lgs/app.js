require.config({
    paths: {
        angular: 'angular.min',
        uiRoute: 'angular-ui-router.min',
        lang: 'i18n/angular-locale_zh-cn',
        ngAnimate: 'angular-animate.min',
        register:'register'
    },
    shim: {
        uiRoute: ['lang'],
        lang: ['angular', 'cfg'],
        ngAnimate: ['lang'],
        register:['jquery']
    }
});
define(['ngAnimate', 'uiRoute', 'atools/angular-pager', 'atools/angular-common', 'atools/angular-datepicker', 'angular-fileinput', 'atools/angular-editor','register'], function () {
    var app = angular.module("myApp", ['ngAnimate', 'ui.router', 'ng.common', 'ng.bs.datepicker', 'ng.bs.pager', 'bs.fileinput', 'ng.editor'])
       .config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
           app.register = {
               controller: $controllerProvider.register,
               directive: $compileProvider.directive,
               filter: $filterProvider.register,
               service: $provide.service
           };
       });
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');
        $stateProvider
            .state("test", getCfg('/test', 'testCtrl', 'test.html', 'testCtrl'))
            .state("home", getCfg('/home', 'homeCtrl', 'home.html', 'homeCtrl'))
            .state("info", getCfg('/info', 'infoCtrl', 'info.html', 'homeCtrl'))
            .state("config", getCfg('/config', 'configCtrl', 'config.html', 'configCtrl'))
            .state("wecontrol", getCfg('/wecontrol', 'wecontrolCtrl', 'wecontrol.html', 'wecontrolCtrl'))
            .state("wecontrolAdd", getCfg('/wecontrolAdd', 'wecontrolAddCtrl', 'wecontrolAdd.html', 'wecontrolCtrl'))
            .state("wecontrolEdit", getCfg('/wecontrolEdit/:id', 'wecontrolEditCtrl', 'wecontrolEdit.html', 'wecontrolCtrl'))
            .state("wecontrolsub", getCfg('/wecontrolsub/:id', 'wecontrolsubCtrl', 'wecontrolsub.html', 'wecontrolCtrl'))
            .state("wecontrolsubAdd", getCfg('/wecontrolsubAdd/:id', 'wecontrolsubAddCtrl', 'wecontrolsubAdd.html', 'wecontrolCtrl'))
            .state("wecontrolsubEdit", getCfg('/wecontrolsubEdit/:id', 'wecontrolsubEditCtrl', 'wecontrolsubEdit.html', 'wecontrolCtrl'))
            .state("dic", getCfg('/dic', 'dicCtrl', 'dic.html', 'dicCtrl'))
            .state("dicAdd", getCfg('/dicAdd', 'dicAddCtrl', 'dicAdd.html', 'dicCtrl'))
            .state("dicEdit", getCfg('/dicEdit/:id', 'dicEditCtrl', 'dicEdit.html', 'dicCtrl'))
            .state("dicSub", getCfg('/dicSub/:id', 'dicSubCtrl', 'dicSub.html', 'dicCtrl'))
            .state("dicSubAdd", getCfg('/dicSubAdd/:id', 'dicSubAddCtrl', 'dicSubAdd.html', 'dicCtrl'))
            .state("dicSubEdit", getCfg('/dicSubEdit/:id', 'dicSubEditCtrl', 'dicSubEdit.html', 'dicCtrl'))
            .state("content", getCfg('/content/:id', 'contentCtrl', 'content.html', 'contentCtrl'))
            .state("contentAdd", getCfg('/contentAdd/:id', 'contentAddCtrl', 'contentAdd.html', 'contentCtrl'))
            .state("contentEdit", getCfg('/contentEdit/:id', 'contentEditCtrl', 'contentEdit.html', 'contentCtrl'))
            .state("contentDetail", getCfg('/contentDetail/:id', 'contentDetailCtrl', 'contentDetail.html', 'contentCtrl'))
            .state("audit", getCfg('/audit/:id', 'auditCtrl', 'audit.html', 'auditCtrl'))
            .state("auditDetail", getCfg('/auditDetail/:id', 'auditDetailCtrl', 'auditDetail.html', 'auditCtrl'))
            .state("auditReject", getCfg('/auditReject/:id', 'auditRejectCtrl', 'auditReject.html', 'auditCtrl'))
            .state("turnImg", getCfg('/turnImg', 'turnImgCtrl', 'turnImg.html', 'turnImgCtrl'))
            .state("turnImgAdd", getCfg('/turnImgAdd', 'turnImgAddCtrl', 'turnImgAdd.html', 'turnImgCtrl'))
            .state("feedback", getCfg('/feedback', 'feedbackCtrl', 'feedback.html', 'feedbackCtrl'))
            .state("feedbackReply", getCfg('/feedbackReply/:id', 'feedbackReplyCtrl', 'feedbackReply.html', 'feedbackCtrl'))
            .state("publish", getCfg('/publish', 'publishCtrl', 'publish.html', 'publishCtrl'))
            .state("video", getCfg('/video', 'videoCtrl', 'video.html', 'videoCtrl'))
            .state("videoAdd", getCfg('/videoAdd', 'videoAddCtrl', 'videoAdd.html', 'videoCtrl'))
            .state("videoEdit", getCfg('/videoEdit/:id', 'videoEditCtrl', 'videoEdit.html', 'videoCtrl'))
            .state("videoDetail", getCfg('/videoDetail/:id', 'videoDetailCtrl', 'videoDetail.html', 'videoCtrl'))
            .state("comment", getCfg('/comment', 'commentCtrl', 'comment.html', 'commentCtrl'))
            .state("friendLink", getCfg('/friendLink', 'friendLinkCtrl', 'friendLink.html', 'friendLinkCtrl'))
            .state("friendLinkAdd", getCfg('/friendLinkAdd', 'friendLinkAddCtrl', 'friendLinkAdd.html', 'friendLinkCtrl'))
            .state("friendLinkEdit", getCfg('/friendLinkEdit/:id', 'friendLinkEditCtrl', 'friendLinkEdit.html', 'friendLinkCtrl'))
            .state("drum", getCfg('/drum', 'drumCtrl', 'drum.html', 'drumCtrl'))
            .state("drumAdd", getCfg('/drumAdd', 'drumAddCtrl', 'drumAdd.html', 'drumCtrl'))
            .state("drumEdit", getCfg('/drumEdit/:id', 'drumEditCtrl', 'drumEdit.html', 'drumCtrl'))
            .state("jump", getCfg('/jump', 'jumpCtrl', 'jump.html', 'jumpCtrl'))
            .state("jumpAdd", getCfg('/jumpAdd', 'jumpAddCtrl', 'jumpAdd.html', 'jumpCtrl'))
            .state("jumpEdit", getCfg('/jumpEdit/:id', 'jumpEditCtrl', 'jumpEdit.html', 'jumpCtrl'))
            .state("publishNum", getCfg('/publishNum/:id', 'publishNumCtrl', 'publishNum.html', 'publishCtrl'))
            .state("wemap", getCfg('/wemap', 'wemapCtrl', 'wemap.html', 'wemapCtrl'))
            .state("wemapImport", getCfg('/wemapImport', 'wemapImportCtrl', 'wemapImport.html', 'wemapCtrl'))
            .state("wemapAdd", getCfg('/wemapAdd', 'wemapAddCtrl', 'wemapAdd.html', 'wemapCtrl'))
            .state("wemapEdit", getCfg('/wemapEdit/:id', 'wemapEditCtrl', 'wemapEdit.html', 'wemapCtrl'))
            .state("wemapDetail", getCfg('/wemapDetail', 'wemapDetailCtrl', 'wemapDetail.html', 'wemapCtrl'))
            .state("wemapMain", getCfg('/wemapMain/:id/:name', 'wemapMainCtrl', 'wemapMain.html', 'wemapCtrl'))
            .state("wemapMainAdd", getCfg('/wemapMainAdd/:id/:name', 'wemapMainAddCtrl', 'wemapMainAdd.html', 'wemapCtrl'))
            .state("wemapMainEdit", getCfg('/wemapMainEdit/:id', 'wemapMainEditCtrl', 'wemapMainEdit.html', 'wemapCtrl'))
            .state("webus", getCfg('/webus', 'webusCtrl', 'webus.html', 'webusCtrl'))
            .state("webusAdd", getCfg('/webusAdd', 'webusAddCtrl', 'webusAdd.html', 'webusCtrl'))
            .state("webusEdit", getCfg('/webusEdit/:id', 'webusEditCtrl', 'webusEdit.html', 'webusCtrl'))
            .state("webusDetail", getCfg('/webusDetail/:id', 'webusDetailCtrl', 'webusDetail.html', 'webusCtrl'))
            .state("webusMain", getCfg('/webusMain/:id', 'webusMainCtrl', 'webusMain.html', 'webusCtrl'))
            .state("webusMainAdd", getCfg('/webusMainAdd/:id', 'webusMainAddCtrl', 'webusMainAdd.html', 'webusCtrl'))
            .state("webusMainEdit", getCfg('/webusMainEdit/:id', 'webusMainEditCtrl', 'webusMainEdit.html', 'webusCtrl'))
            .state("partyMatrix", getCfg('/partyMatrix', 'partyMatrixCtrl', 'partyMatrix.html', 'partyMatrixCtrl'))
            .state("partyMatrixAdd", getCfg('/partyMatrixAdd', 'partyMatrixAddCtrl', 'partyMatrixAdd.html', 'partyMatrixCtrl'))
            .state("partyMatrixEdit", getCfg('/partyMatrixEdit/:id', 'partyMatrixEditCtrl', 'partyMatrixEdit.html', 'partyMatrixCtrl'))
            .state("partyMatrixDetail", getCfg('/partyMatrixDetail/:id', 'partyMatrixDetailCtrl', 'partyMatrixDetail.html', 'partyMatrixCtrl'))
            .state("bureau", getCfg('/bureau', 'bureauCtrl', 'bureau.html', 'bureauCtrl'))
            .state("bureauAdd", getCfg('/bureauAdd', 'bureauAddCtrl', 'bureauAdd.html', 'bureauCtrl'))
            .state("bureauEdit", getCfg('/bureauEdit/:id', 'bureauEditCtrl', 'bureauEdit.html', 'bureauCtrl'))
            .state("bureauDetail", getCfg('/bureauDetail/:id', 'bureauDetailCtrl', 'bureauDetail.html', 'bureauCtrl'))
            .state("bottomMenu", getCfg('/bottomMenu', 'bottomMenuCtrl', 'bottomMenu.html', 'bottomMenuCtrl'))
            .state("majorProject", getCfg('/majorProject', 'majorProjectCtrl', 'majorProject.html', 'majorProjectCtrl'))
            .state("majorProjectAdd", getCfg('/majorProjectAdd', 'majorProjectAddCtrl', 'majorProjectAdd.html', 'majorProjectCtrl'))
            .state("majorProjectEdit", getCfg('/majorProjectEdit/:id', 'majorProjectEditCtrl', 'majorProjectEdit.html', 'majorProjectCtrl'))
            .state("majorProjectDetail", getCfg('/majorProjectDetail/:id', 'majorProjectDetailCtrl', 'majorProjectDetail.html', 'majorProjectCtrl'))
            .state("broadcast", getCfg('/broadcast', 'broadcastCtrl', 'broadcast.html', 'broadcastCtrl'))
            .state("broadcastDetail", getCfg('/broadcastDetail/:id', 'broadcastDetailCtrl', 'broadcastDetail.html', 'broadcastCtrl'))
        ;
    });
    function getCfg(url, ctrlName, templateUrl, ctrlUrl) {
        return {
            url: url,
            controller: ctrlName,
            templateUrl: templateUrl,
            resolve: {
                loadCtrl: [
                    "$q", function ($q) {
                        var deferred = $q.defer();
                        require(['controller/' + ctrlUrl], function () { deferred.resolve(); });
                        return deferred.promise;
                    }
                ]
            }
        };
    }

    app.controller('baseCtrl', function ($scope, $http, $filter, $q,$rootScope) {
        $("#side-menu>li").on("click",function(){
            $(this).addClass('suver').siblings('.suver').removeClass('suver');
            $(this).siblings().find('.suver').removeClass('suver');
            $(this).children(".nav-child").css('background','#f2f2f2')
        });
        $(".nav.nav-child>li").on("click",function(){
            $(this).addClass('suver').siblings('.suver').removeClass('suver');
        });
        $scope.load = true;
        setInterval(function () { $scope.$apply(function () { $scope.currentTime = $filter('date')(new Date, 'yyyy-MM-dd HH:mm:ss EEEE') }) }, 1000);
        if (cfg.debug === 'localc#' || cfg.debug === 'localweb') {
            $scope.user = {
                DisplayName: '管理员',
                Roles: [{
                    Name: 'admin'
                }]
            }
            $scope.load = false;
        } else {
            $.get(cfg.host + 'SsoLogin/GetToken', function (token) {
                if (token) {
                    $.ajax({
                        url: cfg.userUrl,
                        headers: {
                            Authorization: 'Bearer ' + token
                        },
                        success: function (rst) {
                            $scope.user = rst;
                            $rootScope.userId = rst.Id;
                            $scope.load = false;
                        }
                    })
                } else {
                    window.location = cfg.host + 'SsoLogin/LoginUrl';
                }
            }).complete(function (rst) {
                if (rst.status == 500)
                    window.location = cfg.host + 'SsoLogin/LoginUrl';
            });
        }

        $scope.getUser = function () {
            var defer = $q.defer();
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
                            defer.resolve(rst);
                        }
                    })
                }
            });
            return defer.promise;
        }

        $scope.isInRole = function () {
            if (!$scope.user || !$scope.user.Roles)
                return false;
            var roles = $scope.user.Roles;
            var tmpRoles = arguments;
            for (var i = 0; i < roles.length; i++) {
                for (var j = 0; j < tmpRoles.length; j++) {
                    if (roles[i].Name === tmpRoles[j]) {
                        return true;
                    }
                }
            }
            return false;
        }
    });
    return app;
});