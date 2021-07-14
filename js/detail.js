window.addEventListener('load', function() {
    //数量的增加减少
    var goodNum = document.querySelector('#goods_num');
    var addNum = this.document.querySelector('.add');
    var reduceNum = this.document.querySelector('.reduce');
    addNum.addEventListener('click', function() {
        goodNum.innerHTML = goodNum.value++;
    })
    reduceNum.addEventListener('click', function() {
        if (goodNum.value > 1) {
            goodNum.innerHTML = goodNum.value--;
        }

    })

    //图片的放大显示
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1 当我们鼠标经过preview_img 显示mask和big
    preview_img.addEventListener('mouseover', function(e) {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function(e) {
        //1 先计算鼠标在盒子里的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        //盒子的一半是mask的一半
        //mask移动的距离
        var maskX = x - (mask.offsetWidth / 2);
        var maskY = y - (mask.offsetHeight / 2);
        var maskMax = preview_img.offsetWidth - mask.offsetWidth; //遮挡层最大移动距离
        //maskX坐标不能小于0 就让他停留在0的位置
        if (maskX <= 0) {
            maskX = 0;
        }
        //maskY坐标不能大于preview_img的宽度减去mask的宽度
        else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        //maskY不能小于0 
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        //大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离/遮挡层的最大移动距离
        //大图
        var bigImg = document.querySelector('.bigImg');
        //大图片的最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';




    })
})