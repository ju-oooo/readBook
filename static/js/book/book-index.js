$(function () {
//内容生成
    $.post(
        "http://localhost:3333/book/type",
        function (data) {
            if (data.code === 200) {
                hotTypeOut(data.typeList)
            } else {
                alert(data.msg);
            }
        });
    $.post(
        "http://localhost:3333/book/hotBook",
        {count: 20},
        function (data) {
            if (data.code === 200) {
                console.log(data)
                hotBookOut(data.bookList)
                contentOut(data.bookList)
                hotTypeBookOut(data.bookList)
                hotLikeBookOut(data.bookList)
            } else {
                alert(data.msg);
            }
        });

    $('.book-popular').on('mouseover', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    });
    //事件绑定之页面跳转
    $('section').on('click', '[data-book]', function () {
        let bid = $(this).attr('data-book');
        window.open(`book-detail.html?bid=${bid}`, "_self");
    });

    $('.icon-right').click(function () {
        nav_slide(true)
    });
    $('.icon-left').click(function () {
        nav_slide(false)
    });

    function nav_slide(flag) {
        let $li = $('.nav-slide li').removeClass('active');
        if (flag) {
            $li.first().remove().clone().appendTo(`.nav-slide`);
            $li.eq(1).addClass('active');
        } else {
            $li.last().remove().clone().insertBefore(`.nav-slide li:first-child`).addClass('active');
        }
    }

    let timer = setInterval(nav_slide, 5000, true);
    $('.nav').hover(function () {
        $('.nav .iconfont').show()
    }, function () {
        $('.nav .iconfont').hide()
    });
    let callback = {
        e: function () {
            clearInterval(timer);
        }, l: function () {
            timer = setInterval(nav_slide, 5000, true);
        }
    }
    $('.nav-slide').hover(callback.e, callback.l);
    $('.nav .iconfont').hover(callback.e, callback.l);


    // 热门书籍 tag生成
    function hotBookOut(bookList) {
        let hotBook_html = '';
        for (let index = 0; index < 4; index++) {
            let item = bookList[Math.floor(Math.random() * bookList.length)];
            hotBook_html += `<li><a href="javascript:;" data-book="${item.id}">${item.bookName}</a></li>`;
        }
        $('#hotBook').html(hotBook_html);
    }

    // 热门书籍 内容生成
    function contentOut(bookList) {
        let item = bookList[0];
        let content_left_html = `<p class="book-name" data-book="${item.id}">${item.bookName}</p>
                                <p class="book-author">${item.author}</p>
                                <p class="detail">${item.introduce}</p>
                                <img src="${item.image}" alt="" data-book="${item.id}" onerror="javascript:this.src='../../image/book/book.jpg';">`;
        $('.content-left').html(content_left_html);
        let content_center_html = '';
        for (let index = 1; index < 5; index++) {
            let item = bookList[index];
            content_center_html += `<li>
                                        <a href="javascript:;" data-book="${item.id}" class="book-img">
                                         <img src="${item.image}" alt="" data-book="${item.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                        </a>
                                        <a href="javascript:;" data-book="${item.id}" class="book-name">${item.bookName.slice(0, 20)}</a>
                                        <a href="javascript:;" class="book-author">${item.author}</a>
                                    </li>`;
        }
        $('.content-center ul').html(content_center_html);
        let content_right_html = '';
        for (let index = 5; index < 15; index++) {
            let item = bookList[index];
            content_right_html += `<li>
                                    <span>${index - 4}</span>
                                    <dl class="close">
                                        <a href="javascript:;" class="book-name"  data-book="${item.id}">${item.bookName}</a>
                                        <span class="book-view-count">${numberFormat(item.numberWord)}字</span>
                                    </dl>
                                    <dl class="show">
                                        <div class="book-img">
                                          <img src="${item.image}" alt="" data-book="${item.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                        </div>
                                        <a href="javascript:;" class="book-name" data-book="${item.id}">${item.bookName}</a>
                                        <p class="book-view-count">${numberFormat(item.numberWord)}字</p>
                                    </dl>
                                    </li>`;
        }
        $('.content-right ul').html(content_right_html).children('li:first-child').addClass('active');

    }

    // 热门类型 tag生成
    function hotTypeOut(typeList) {
        let hotType_html = '';
        for (let index = 0; index < 4; index++) {
            let item = typeList[Math.floor(Math.random() * typeList.length)];
            hotType_html += `<li><a href="javascript:;" data-book="${item.id}">${item.name}</a></li>`;
        }
        $('#hotType').html(hotType_html);
    }

    // 热门类型 内容上 生成
    function hotTypeBookOut(bookList) {
        let hotTypeBook_html = '';
        for (let index = 15; index < 19; index++) {
            let item = bookList[index]
            hotTypeBook_html += `<li>
                                <div class="pop-image">
                                  <img src="${item.image}" alt="" data-book="${item.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                </div>
                                <p class="pop-bookName" data-book="${item.id}" >${item.bookName}</p>
                                <p>${item.introduce}</p>
                                <p>
                                    字数:&nbsp;<span>${numberFormat(item.numberWord)}字</span>
                                </p>
                            </li>`;
        }
        $('.pop-content .pop-top ul').html(hotTypeBook_html);
    }

    // 热门类型 内容下 生成
    function hotLikeBookOut(bookList) {
        let hotLikeBook_html = '';
        for (let index = 10; index < 15; index++) {
            let item = bookList[index];
            hotLikeBook_html += `<li>
                                        <div class="pop-image">
                                          <img src="${item.image}" alt="" data-book="${item.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                        </div>
                                        <p class="pop-bookName" data-book="${item.id}">${item.bookName}</p>
                                        <p class="pop-like">${item.press !== '' ? item.press : '未知'}</p>
                                    </li>`;
        }
        $('.pop-content .pop-bottom ul').html(hotLikeBook_html);
    }

    //数字格式化
    function numberFormat(num) {
        if (num / 1000 > 1 && num / 1000 < 10) {
            return (num / 1000).toFixed(1) + "千";
        } else if (num / 10000 > 1 && num / 10000 < 10000) {
            return (num / 10000).toFixed(1) + "万";
        } else if (num / 1000000000 > 1 && num / 1000000000 < 10000) {
            return (num / 10000).toFixed(1) + "亿";
        } else {
            return num.toFixed(1);
        }
    }
});