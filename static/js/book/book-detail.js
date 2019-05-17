$(function () {
    let bid = location.search.slice(1).split('=')[1]
    getBookDetail(bid);
    $.post(
        "http://localhost:3333/book/hotBook",
        {count: 10},
        function (data) {
            if (data.code === 200) {
                hotBookOut(data.bookList)
            } else {
                alert(data.msg);
            }
        });
    //事件绑定之页面跳转
    $('section').on('click', '[data-book]', function () {
        let bid = $(this).attr('data-book');
        window.open(`book-detail.html?bid=${bid}`, "_self");
    });

    $('.book-detail').on('click', '[data-read]', function () {
        let bid = $(this).attr('data-read');
        window.open(`book-read.html?bid=${bid}`, "read");
    });

    $('.book-popular').on('mouseover', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active')
    });
    function getBookDetail(bookId) {
        $.post(
            "http://localhost:3333/book/detail",
            {bookId: bookId},
            function (data) {
                if (data.code === 200) {
                    //获取推荐
                    getRecommend(data.book.typeId);
                    //显示详情
                    bookDetailOut(data.book);
                } else {
                    alert(data.msg);
                }
            });
    }

    function getRecommend(typeId) {
        $.post(
            "http://localhost:3333/book/list",
            {
                type: typeId,
                pageNum: 0,
                count: 4
            },
            function (data) {
                if (data.code === 200) {
                    recommendOut(data.bookList);
                } else {
                    alert(data.msg);
                }
            });
    }

    function hotBookOut(bookList) {
        let content_right_html = '';
        bookList.forEach((elem, i) => {
            content_right_html += `<li>
                                    <span>${i + 1}</span>
                                    <dl class="close">
                                        <a href="javascript:;" class="book-name"  data-book="${elem.id}">${elem.bookName}</a>
                                        <span class="book-view-count">${numberFormat(elem.numberWord)}字</span>
                                    </dl>
                                    <dl class="show">
                                        <div class="book-img">
                                          <img src="${elem.image}" alt="" data-book="${elem.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                        </div>
                                        <a href="javascript:;" class="book-name" data-book="${elem.id}">${elem.bookName}</a>
                                        <p class="book-view-count">${numberFormat(elem.numberWord)}字</p>
                                    </dl>
                                    </li>`;
        });
        $('.popular-list').html(content_right_html).children('li:first-child').addClass('active');

    }

    function recommendOut(recommendList) {
        let recommend_html = '';
        recommendList.forEach((elem) => {
            recommend_html +=
                `<li class="recommend-detail">
                        <a href="javascript:;"  data-book="${elem.id}" class="detail-img">
                          <img src="${elem.image}" alt="" data-book="${elem.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                        </a>
                        <p class="detail-name" data-book="${elem.id}">${elem.bookName}</p>
                        <p class="detail-author">${elem.author}</p>
                    </li>`;
        });
        $('.recommend-list').html(recommend_html);
    }

    function bookDetailOut(book) {
        let bookDetail_html = `<div class="detail-left">
                                    <div class="detail-img">
                                        <img src="${book.image}" alt="" data-book="${book.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                    </div>
                                </div>
                                <div class="detail-right">
                                    <ul>
                                        <li>
                                            <p class="detail-name">${book.bookName}</p>
                                            <p>
                                                <span class="detail-author">作者：${book.author}</span>
                                                <span class="detail-numberWord">字数:&nbsp;${numberFormat(book.numberWord)}字</span>
                                                <span class="detail-press">${book.press !== '' ? '出版社：' + book.press : ''}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p class="detail-price">价格：399阅饼 | 原价999阅饼</p>
                                            <p>
                                                <a href="javascript:;" class="detail-try" data-read="${book.id}">免费试读</a>
                                                <a href="javascript:;" class="detail-buy">购买</a>
                                            </p>
                                        </li>
                                        <li>
                                            <p class="detail-brief">${book.introduce}</p>
                                            
                                        </li>
                                    </ul>
                                </div>`;
        $('.book-detail').append(bookDetail_html)
    }

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

