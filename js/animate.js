function animate(obj, target, callback) {
    //callback = function(){}
    clearInterval(obj.timer);
    // console.log(callback);
    obj.timer = setInterval(function() {
        //步长值 步长值取整数
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            //停止定时器
            clearInterval(obj.timer);
            //回调函数写在定时器结束后
            callback && callback();
        }
        //缓动动画就是让元素运动速度有所变化·
        //缓动动画公式:(目标值-现在的位置)/10 让移动的距离慢慢变小 让速度慢下来
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}