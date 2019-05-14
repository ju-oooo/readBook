window.onload = function () {
//    内容生成
    $.post(
        "http://localhost:3333/book/hotBook",
        {count: 20},
        function (data) {
            if (data.code === 200) {
                console.log(data)
                catalogOut(data.bookList)
                contentOut(data.bookList)
            } else {
                alert(data.msg);
            }
        })

    function catalogOut(bookList) {
        let catalog_html = ``;
        for (let index = 0; index < 4; index++) {
            let item = bookList[Math.floor(Math.random() * bookList.length) - 1]
            catalog_html += `<li><a href="#" data-book="${item.id}">${item.bookName}</a></li>`;
        }
        $('#hotBook').html(catalog_html);
    }

    function contentOut(bookList) {
        let content_left_html = `<p class="book-name">${bookList[0].bookName}</p>
                                <p class="book-author">${bookList[0].author}</p>
                                <p class="detail">${bookList[0].introduce}</p>
                                <img src="${bookList[0].image}" alt="" data-book="${bookList[0].id}">`;
        $('.content-left').html(content_left_html);
        let content_center_html = '';
        for (let index = 1; index < 5; index++) {
            content_center_html += `<li>
                                        <a href="#" class="book-img"><img src="${bookList[index].image}" alt="" data-book="${bookList[index].id}"></a>
                                        <a href="#" class="book-name">${bookList[index].bookName.slice(0,20)}</a>
                                        <a href="#" class="book-author">${bookList[index].author}</a>
                                    </li>`;
        }
        $('.content-center ul').html(content_center_html);
        let content_right_html = '';
        for (let index = 5; index < 15; index++) {
            content_right_html += `<li>
                                    <span>${index - 4}</span>
                                    <dl class="close">
                                        <a href="#" class="book-name"  data-book="${bookList[index].id}">${bookList[index].bookName}</a>
                                        <span class="book-view-count">${bookList[index].numberWord}</span>
                                    </dl>
                                    <dl class="show">
                                        <div class="book-img">
                                          <img src="${bookList[index].image}" alt="" data-book="${bookList[index].id}">
                                        </div>
                                        <a href="#" class="book-name"  data-book="${bookList[index].id}">${bookList[index].bookName}</a>
                                        <p class="book-view-count">${bookList[index].numberWord}</p>
                                    </dl>
                                    </li>`;
        }
        $('.content-right ul').html(content_right_html).children('li:first-child').addClass('active');

    }
};