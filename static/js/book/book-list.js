//页面加载完成绑定事件
$(function () {
    //默认初始化数据 内容生成
    $.post("http://localhost:3333/book/type",
        function (data) {
            if (data.code === 200) {
                let type_html = '';
                data.typeList.forEach((type) => {
                    type_html += `<li class="option"><a href="javascript:;" data-type="${type.id}">${type.name}</a></li>`;
                });
                $('.option-menu ul').html(type_html);
                $('.option-menu ul li:first-child').addClass('active');
                //初始化书籍列表
                getBookList($('ul.book-list'), data.typeList[0].id);
            } else {
                alert(data.msg);
            }
        });

    //点击类型获取相应数据
    $('.option-menu').on('click', '.option', function () {
        $('.option-menu li.active').removeClass('active');
        let typeId = $(this).addClass('active').children('a').attr('data-type');
        getBookList($('ul.book-list'), typeId);
    });

    //事件绑定之页面跳转
    $('section').on('click', '[data-book]', function () {
        let bid = $(this).attr('data-book');
        window.open(`book-detail.html?bid=${bid}`, "_self");
    });

    //获取书籍列表
    function getBookList(bookList, typeId) {
        $.post('http://localhost:3333/book/list',
            {
                type: typeId,
                pageNum: 1,
                count: 20
            }, function (data) {
                if (data.code === 200) {
                    let list_html = '';
                    data.bookList.forEach((book) => {
                        list_html += `<li class="book">
                                <div class="book-left">
                                    <div class="book-image">
                                      <a href="javascript:;" data-book="${book.id}">
                                        <img src="${book.image}" alt="" data-book="${book.id}" onerror="javascript:this.src='../../image/book/book.jpg';">
                                      </a>
                                    </div>
                                </div>
                                <div class="book-right">
                                    <p class="book-name">
                                      <a href="javascript:;" data-book="${book.id}">${book.bookName}</a>
                                    </p>
                                    <p class="book-author">${book.author}</p>
                                    <p class="book-numberWord">
                                      字数:&nbsp;<span>${book.numberWord}</span>
                                    </p>
                                    <p class="book-brief">${book.introduce}</p>
                                </div>
                            </li>`;
                    });
                    bookList.html(list_html);
                } else if (data.code === 201) {
                    alert(data.msg);
                } else {
                    alert(data.msg);
                }
            }
        )
    }
});