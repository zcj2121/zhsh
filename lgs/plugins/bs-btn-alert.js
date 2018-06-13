(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else factory();
}(window, function ($) {
    //'use strict';
    var doc = {};
    function DelModal(opt) {
        this.opt = opt;
        this.$modal = {};
        this.init();
    }

    DelModal.prototype = {
        defaults: {
            msg: '确认删除?',
            url: '',
            host: cfg.host,
            javahost:cfg.javahost,
            click: null,
            datap:''
        },
        init: function () {
            var opt = $.extend(this.defaults, this.opt);
            var modal = $('<div class="modal fade" style="margin-top: 10%;"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-body">' + opt.msg + '</div><div class="modal-footer"><a data-dismiss="modal" class="btn btn-default btn-sm">取消</a><button class="btn btn-primary btn-sm">确认</button></div></div></div></div>');
            modal.appendTo($('body'));
            this.$modal = modal;
        },
        show: function () {
            var modal = this.$modal;
            modal.modal({
                backdrop: 'static',
                show: true,
                keyboard: false
            });

            var that = this;
            modal.find('.btn-primary:contains("确认")').on('click', function () {
                if (that.defaults.url) {
                    var url = that.defaults.host + that.defaults.url;
                    var datap = that.defaults.datap;
                    if(datap&&datap!=""){
                        $.ajax({
                            url: that.defaults.javahost+that.defaults.url+"?id="+datap,
                            // data: JSON.stringify({
                            //     "id":dataid
                            // }),
                            type: 'GET',
                            async: false,
                            contentType: "application/json;charset=UTF-8",
                            dataType: 'text',
                            success: function (resp) {
                                
                              if(resp=="ok"){
                                    $('.btn-default:contains("查询")').trigger("click");
                                    modal.modal('hide');
                                }
                            }
                        });
                    };
                    if(!datap){
                        $.get(url).complete(function () {
                            
                          //  $('.btn-default:contains("查询")').click();
			$('.btn-default:contains("查询")').trigger("click");
			modal.modal('hide');
                        });
                    }
                    
                } else {
                    try {
                        var str = "doc['" + that.defaults.click + "']()";
                        eval(str);
                    } catch (e) {
                        console.log(e);
                    }
                    modal.modal('hide');
                    window.history.go(0);
                }
            });
            modal.on('hidden.bs.modal', function () { this.remove(); });
        }
    };

    $(document).on('click', '.bs-btn-alert', function (e) {
        new DelModal($(e.target).data()).show();
        return false;
    });

    window.doc = doc;
}));