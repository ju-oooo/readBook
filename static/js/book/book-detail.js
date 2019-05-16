$(function () {
    console.log();
    let bid = location.search.slice(1).split('=')[1]

    getBookDetail(bid);

    function getBookDetail(bookId) {
        $.post(
            "http://localhost:3333/book/detail",
            {bookId: bookId},
            function (data) {
                bookDetailOut(data.book)
                console.log(data);
            });

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
                                                <span class="detail-author">作者：${book.bookName}</span>
                                                <span class="detail-numberWord">字数：${book.bookName}字</span>
                                                <span class="detail-press">${book.press !== '' ? '出版社：' + book.press : ''}</span>
                                            </p>
                                        </li>
                                        <li>
                                            <p class="detail-price">价格：399阅饼 | 原价999阅饼</p>
                                            <p>
                                                <a href="#" class="detail-try">免费试读</a>
                                                <a href="#" class="detail-buy">购买</a>
                                            </p>
                                        </li>
                                        <li>
                                            <p class="detail-brief">${book.introduce}</p>
                                            
                                        </li>
                                    </ul>
                                </div>`;
            $('.book-detail').append(bookDetail_html)
        }
    }
});