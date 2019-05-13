(function () {
    //内容生成
    $.post(
        "http://localhost:3333/book/type", {
            type: 93,
            pageNum: 2,
            count: 20
        },
        function (data) {
            if (data.code === 200) {
                let type_html = '';
                data.typeList.forEach((type) => {
                    type_html += `<li class="option"><a href="javascript:;" data-type="${type.id}">${type.name}</a></li>`;
                });
                $('.option-menu ul').html(type_html);
                $('.option-menu ul li:first-child').addClass('active')
            } else {
                alert(data.msg);
            }
        });
    //点击类型获取相应数据
    $('.option-menu ul li').click(function () {
        console.log(this)
        $('.option-menu ul li.active').removeClass('active');
        $(this).addClass('active')
    });

})();