(function (root, factory) {
    if (typeof root.define === 'function' && root.define.amd) {
        root.define(['angular', 'file'], factory);
    } else factory();
}(window, function () {
    'use strict';
    angular.module('ng.bs.file', []).constant('fileCfg', {
        uploadUrl: cfg.hostName + 'UploadFile.ashx',
        language: 'zh'
    }).directive('file', ['fileCfg', function (cfg) {
        return {
            require: '?ngModel',
            scope: {
                allowFileExts: '=',
                allowFileTypes: '='
            },
            restrict: 'C',
            link: fileLink
        };

        function fileLink(scope, ele, attr, ngModel) {
            if (!ngModel) return;
            var opt = cfg;
            if (scope.allowFileExts instanceof Array)
                opt.allowedFileExtensions = scope.allowFileExts;
            if (scope.allowFileTypes instanceof Array)
                opt.allowedFileTypes = scope.allowFileTypes;
            if (attr.multiple) {
                opt.uploadAsync = false;
                $(ele).fileinput(opt);
                $(ele).on('filebatchuploadsuccess', function (evt, data) {
                    ngModel.$setViewValue(data.response);
                });
            } else {
                $(ele).fileinput(opt);
                $(ele).on('fileuploaded', function (evt, data) {
                    ngModel.$setViewValue(data.response[0]);
                });
            }
        }
    }]);;
}));