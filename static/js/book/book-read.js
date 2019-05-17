$(function () {
//    内容生成
    let bid = location.search.slice(1).split('=')[1]
    getchapterList(bid);
    $('.catalogue-content').on('click', '[data-chapter]', function () {
        let chapterId = $(this).attr('data-chapter');
        getBookChapter(chapterId);
    });

    function getBookChapter(chapterId) {
        $.post(
            "http://localhost:3333/book/chapter",
            {chapterId: chapterId},
            function (data) {
                if (data.code === 200) {
                    chapterCcontentOut(data.bookChapter);
                } else {
                    alert(data.msg);
                }
            });
    }


    function chapterCcontentOut(bookChapter) {
        // let chapterCcontent_html = '';
        // if (bookChapter.id == $('catalogue-content [data-chapter]:first-child').attr('data-chapter')) {
        //     chapterCcontent_html = `<p class="book-title">${bookChapter.chapterName}</p>`;
        // }
        let chapterCcontent_html = `<p class="book-title">${bookChapter.chapterName}</p>`;
        bookChapter.content.split('#').forEach((elem) => {
            chapterCcontent_html += `<p>${elem}</p>`;
        });
        $('.article').html(chapterCcontent_html);

    }

    function getchapterList(bid) {
        $.post(
            "http://localhost:3333/book/chapterList",
            {bookId: bid},
            function (data) {
                if (data.code === 200) {
                    //默认加载第一个
                    getBookChapter(data.chapterList[0].id);
                    catalogueCcontentOut(data.chapterList);
                } else {
                    alert(data.msg);
                }
            });
    }

    function catalogueCcontentOut(chapterList) {
        let catalogueCcontent_html = '';
        chapterList.forEach((elem) => {
            catalogueCcontent_html += `<li><a href="javascript:;" data-chapter="${elem.id}">${elem.chapterName}</a></li>`;
        });
        $('.catalogue-content').html(catalogueCcontent_html);
    }

//     https://tsn.baidu.com/text2audio
//         tex：合成的文本，使用UTF - 8
//     编码。小于2048个中文字或者英文数字
//     tok: 24.
//     c7dd724e9605de8a525f6196b99d1181
//     .2592000
//     .1560326217
//     .282335 - 16070910
//     ctp：1
//     lan：zh
//     per：4
//     aue：3
//     cuid:oooo
//     $.post(
//         "https://tsn.baidu.com/text2audio", {
//             tex: '合成的文本，使用UTF-8编码。小于2048个中文字或者英文数字',
//             tok: '24.c7dd724e9605de8a525f6196b99d1181.2592000.1560326217.282335-16070910',
//             ctp: 1,
//             lan: 'zh',
//             per: 4,
//             aue: 3,
//             cuid: 'oooo'
//         },
//         function (data) {   })
});