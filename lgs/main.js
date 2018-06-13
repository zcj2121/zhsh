require.config({
    paths: {
        jquery: ['jquery-1.9.1.min', '//cdn.bootcss.com/jquery/1.12.4/jquery'],
        bootstrap: 'bootstrap.min',
        datepicker: 'daterangepicker',
        fileinput: 'fileinput.min',
        ume: 'umeditor/umeditor'
    },
    shim: {
        jquery: ['cfg'],
        metisMenu: ['bootstrap'],
        bootstrap: ['jquery'],
        datepicker: ['bootstrap'],
        fileinput: ['locales/zh', 'bootstrap'],
        ume: {
            deps: ['umeditor/umeditor.config', 'jquery', 'css!umeditor/themes/default/css/umeditor.min'],
            exports: 'UM'
        }
    }
});

require(['css!../content/bootstrap.min', 'css!../Content/metisMenu.min'
    , 'css!../content/font-awesome.min', 'css!../content/Site'
    , 'css!../content/daterangepicker', 'datepicker'
    , 'css!../content/bootstrap-fileinput/css/fileinput.min'
    , 'metisMenu', 'plugins/bs-btn-alert', 'plugins/bs-btn-modal'], function () {
        $('#side-menu').metisMenu();
    });

require(['app'], function () {
    angular.bootstrap(document, ['myApp']);
});