$(function () {
    //内容生成
    let bid = location.search.slice(1).split('=')[1], bookName;
    //获取书籍章节目录
    getchapterList(bid);
    //绑定事件
    //获取章节内容
    $('.catalogue-content,.nav-btn').on('click', '[data-chapter]', function () {
        let $this = $(this);
        console.log(this)
        //获取目录编号
        let chapterId = $this.attr('data-chapter');
        //根据目录编号获取文章
        getBookChapter(chapterId);
    });
    $('.header').on('click', '[data-book]', function () {
        let bid = $(this).attr('data-book');
        window.open(`book-detail.html?bid=${bid}`, "_blank");
    });

    $('.toTop').click(function () {
        toTop();
    });

    //回到顶部
    function toTop() {
        $('html,body').stop().animate({scrollTop: $('#top').offset().top - 100}, 800);
    }

    //根据目录编号获取文章
    function getBookChapter(chapterId) {
        $.post(
            "http://localhost:3333/book/chapter",
            {chapterId: chapterId},
            function (data) {
                if (data.code === 200) {
                    correlationOut(chapterId);
                    //刷新文章内容
                    chapterContentOut(data.bookChapter);
                } else {
                    alert(data.msg);
                }
            });
    }

    //头部及右侧刷新
    function correlationOut(chapterId) {
        let $chapterId = $(`.catalogue-content a[data-chapter="${chapterId}"]`);
        //高亮显示 正在看的目录名
        $chapterId.addClass('active').parent().siblings().children('a').removeClass('active');
        //头部更新
        let header_html = `
        <p>
        <span>
            <a class="book-name" data-book="${bid}">${bookName}</a>&nbsp;-&nbsp;${$chapterId.text()}</span>
            <a class="iconfont icon-bofang play" data-book="${bid}"></a>
            <a class="buy"data-book="${bid}" title="${bookName}">购买本书</a>
        </p>`
        $('.header').html(header_html);
        //章节控制更新
        let $chapterli = $chapterId.parent();
        let right_html = '';
        if ($chapterli.prev()[0] !== undefined) {
            right_html += `<span class="iconfont icon-up" title="上一章" data-chapter="${$chapterli.prev().children('[data-chapter]').attr('data-chapter')}"></span>`;
        }
        if ($chapterli.next()[0] !== undefined) {
            console.log($chapterli.next().children('[data-chapter]'))
            right_html += `<span class="iconfont icon-down" title="下一章" data-chapter="${$chapterli.next().children('[data-chapter]').attr('data-chapter')}"></span>`;
        }
        right_html += `<span class="toTop iconfont icon-huidaodingbu" title="回到顶部"></span>`;
        $('.right .nav-btn').html(right_html);

    }

    //刷新文章内容
    function chapterContentOut(bookChapter) {
        let chapterCcontent_html = `<p class="book-title">${bookChapter.chapterName}</p>`;
        bookChapter.content.split('#').forEach((elem) => {
            chapterCcontent_html += `<p>${elem}</p>`;
        });
        $('.article').html(chapterCcontent_html);
        toTop();
    }

    //获取书籍章节目录
    function getchapterList(bid) {
        $.post(
            "http://localhost:3333/book/chapterList",
            {bookId: bid},
            function (data) {
                if (data.code === 200) {
                    //默认加载第一个
                    getBookChapter(data.chapterList[0].id);
                    //刷新目录
                    catalogueContentOut(data.chapterList);
                } else {
                    alert(data.msg);
                }
            });
    }

    //刷新目录
    function catalogueContentOut(chapterList) {
        let catalogueCcontent_html = '';
        bookName = chapterList[0].bookName;
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