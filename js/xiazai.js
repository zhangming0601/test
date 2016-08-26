/**
 * Created by Administrator on 2016/7/18.
 */
$(function () {
    //头部

    //头部结束

    $("#drwrap_dropList").mouseenter(function () {
        $(this).children(".dropList").show(600)
        });

    $("#drwrap_dropList").mouseleave(function () {
        $(this).children(".dropList").hide().stop();
    });

    var bg;
    $(".dropList a").mouseenter(function () {
        bg=$(this).css("background-color");
        $(this).css("background","gray");
    });
    $(".dropList a").mouseleave(function () {
        $(this).css("background",bg);
    })


    $("#drweap_pad").mouseenter(function() {
            $("#imedit_list_apadtab").show();
             $("#imedit_list_padtab").hide();
    })
    $("#down_btn_iosd").mouseenter(function() {
        $("#imedit_list_padtab").show();
        $("#imedit_list_apadtab").hide();

    })
});