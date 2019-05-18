$(function () {
    //引入页头
    $.ajax({
        url: '../../html/include/header.html',
        type: 'get',
        success: function (data) {
            $('head').append('<link rel="stylesheet" href="../../css/book/book-header.css">');
            $('header').replaceWith(data);
            let pathname = location.pathname.replace('.html', '');
            let pageType = pathname.substr(pathname.lastIndexOf('/'));
            let $aList = $('.header li:not(:first-child) a');
            for (let i = 0; i < $aList.length; i++) {
                let $this = $($aList[i]);
                if ($this.attr('href').indexOf(pageType) !== -1) {
                    $this.parent().addClass('active').siblings().removeClass('active');
                }
            }
        }
    });
    //引入页尾
    $.ajax({
        url: '../../html/include/footer.html',
        type: 'get',
        success: function (data) {
            $('head').append('<link rel="stylesheet" href="../../css/book/book-footer.css">');
            $('footer').replaceWith(data);
        }
    });
});