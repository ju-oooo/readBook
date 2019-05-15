$(function () {
    console.log();
    let bid = location.search.slice(1).split('=')[1]

    getBookDetail(bid);
    function getBookDetail(bookId) {
        $.post(
            "http://localhost:3333/book/detail",
            {bookId: bookId},
            function (data) {
                console.log(data);
            })
    }
});