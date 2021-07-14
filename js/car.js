$(function() {
    //1全选 全不选模块
    //把全选框(checkall)状态赋值给 三个小的按钮(j-checkbox)
    $(".checkall").change(function() {
        $(this).prop("checked");
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            //让所有商品背景
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    //全部复选框选中 即全选框选中
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            //当前商品背景
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    //商品数量的+ -
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        $(this).siblings(".itxt").val(++n);
        //小计模块
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        //当前价格
        price = price.substr("1");
        //toFixed保留两位有效小数
        var priceNum = (price * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + priceNum);
        getSum();
    });
    $(".decrement").click(function() {
        //商品数量-
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        $(this).siblings(".itxt").val(--n);
        //小计模块
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        //当前价格
        price = price.substr("1");
        //toFixed保留两位有效小数
        var priceNum = (price * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + priceNum);
        getSum();
    });
    //修改表单内容值 小计价格的更新
    $(".itxt").change(function() {
        //1 获取文本框的值
        var n = $(this).val();
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        price = price.substr("1");
        var priceNum = (price * n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + priceNum);
        getSum();
    });
    //总计模块:所有数量和 总价模块
    getSum();

    function getSum() {
        var count = 0; //总件数
        var money = 0; //总价格
        //总件数
        $(".itxt").each(function(index, Ele) {
            count += parseInt($(Ele).val());
        });
        $(".amount-sum em").text(count);
        //总价
        $(".p-sum").each(function(index, Ele) {
            money += parseFloat($(Ele).text().substr("1"));

        });
        money = money.toFixed(2);
        $(".price-sum em").text("￥" + money);
    }
    //删除商品模板
    //单商品的删除
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
    });
    //清空商品
    $(".clear-all").click(function() {
        $(".cart-item-list").empty();
        getSum();
    });
    //选中商品添加背景
    $(".j-checkbox")
        // $(".j-checkbox").change(function() {
        //     if ($(this).prop("checked")) {
        //         $(this).parent().parent().addClass("check-cart-item");
        //     } else {
        //         $(this).parent().parent().removeClass("check-cart-item");

    //     }
    // });

})