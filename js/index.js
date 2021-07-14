window.addEventListener('load', function() {
    //1 鼠标经过轮播图模块 左右按钮显示 离开隐藏左右按钮
    var arrow_l = document.querySelector('.arrow_l'); //左侧
    var arrow_r = document.querySelector('.arrow_r'); //右侧
    var focus = document.querySelector('.focus'); //轮播图
    var num = 0; //点击按钮 移动图片的计数
    var circle = 0; //点击按钮 移动小圆圈的计数
    var focusWidth = focus.offsetWidth;
    showNav(); //电梯导航的显示
    //鼠标经过
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 3000);
    });

    //动态生成小圆圈
    var ul = focus.querySelector('ul'); //图片list
    var ol = focus.querySelector('.circle'); //小圆圈list

    for (var i = 0; i < ul.children.length; i++) {
        //创建一个li
        var li = document.createElement('li');
        //记录当前li的索引号
        li.setAttribute('index', i);
        //插入li
        ol.appendChild(li);
        //小圆圈的排他思想 我们可以直接在生成小圆圈的同时绑定点击事件
        ol.children[0].className = 'current';
        li.addEventListener('click', function() {
            //清除所有current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';

            }
            //当前li设置current类名
            this.className = 'current';
            //4 点击小圆圈 可以播放相应图片
            var index = this.getAttribute('index');
            animate(ul, -(index * focusWidth));
            //当我们点击了li 获取其索引号给num
            num = index;
            //点击li 将索引号给circle
            circle = index;
        })
    }

    //克隆一张图片放在ul最后面
    var firsrImg = ul.children[0].cloneNode(true);
    ul.appendChild(firsrImg);

    //2 点击左右按钮 实现图片的移动
    var flag = true; //节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //如果走到最后一张复制的图片 此时我们要把left复原为0 num=0;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            //点击右侧按钮 circle++; 控制小圆圈位置
            circle++;
            //如果circle = 4 说明走到最后 circle赋值为0
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //如果走到最后一张复制的图片 此时我们要把left复原为0 num=0;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true; //打开节流阀
            });
            //点击右侧按钮 circle--; 控制小圆圈位置
            circle--;
            //如果circle = 0 说明走到最后 circle赋值为0
            circle = circle < 0 ? ol.children.length - 1 : circle;
            //调用函数
            circleChange();
        }
    });

    function circleChange() {
        //先清除其余小圆圈的classname
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }

        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 3000);
    //电梯导航
    $(window).scroll(function() {
        showNav();
        $(".floor .w").each(function(i, ele) {
            if ($(document).scrollTop() >= $(ele).offset().top) {
                $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass("current");
            }
        })
    });
    $(".fixedtool li").click(function() {
        var index = $(this).index()
            //点击li 计算出页面要去的位置
        var current = $(".floor .w").eq(index).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        });
        //点击之后添加current类名 其兄弟移除
        $(this).addClass("current").siblings("li").removeClass("current");
    });
    //电梯导航
    function showNav() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").stop().fadeIn();
        } else {
            $(".fixedtool").stop().fadeOut();
        };

    }

})