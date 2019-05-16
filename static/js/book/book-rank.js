$(function () {
    //默认初始化数据 内容生成
    $.post("http://localhost:3333/book/rankBook", {count: 100},
        function (data) {
            if (data.code === 200) {
                rankBookOut(data.bookList);
            } else {
                alert(data.msg);
            }
        });

    //事件绑定之页面跳转
    $('section').on('click', '[data-book]', function () {
        let bid = $(this).attr('data-book');
        window.open(`book-detail.html?bid=${bid}`, "_self");
    });

    function rankBookOut(bookList) {
        let rankBook_html = '';
        bookList.forEach((elem, i) => {
            rankBook_html += `
            <li>
                <span class="rank">${i + 1}</span>
                <span class="book-name" data-book="${elem.id}">${elem.bookName}</span>
                <span class="book-author">${elem.author}</span>
                <span class="book-type">${elem.type}</span>
                <span class="book-read">${numberFormat(elem.numberWord)}&nbsp;字</span>
            </li>`;
        });
        $('.rank-content ul').append(rankBook_html);
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