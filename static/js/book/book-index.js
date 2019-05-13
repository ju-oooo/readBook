(function () {
//    内容生成
    $.post(
        "http://localhost:3333/book/list", {
            type:93,
            pageNum: 2,
            count: 20
        },
        function (data) {
            document.write(JSON.stringify(data));
        })
})();