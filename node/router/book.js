const express = require('express');
const pool = require('../pool');
const router = express.Router();

/**
 * 获取书籍列表
 * pageNum 页数
 * count 一页显示总数
 * 测试url http://localhost:3333/book/list
 */
router.post('/list', (req, res) => {
    let data = req.body
    let pageNum = parseInt(data.pageNum);
    let count = parseInt(data.count);
    if (isNaN(count) || count < 5 && !isNaN(pageNum) && pageNum < 0) {
        count = 5;
        pageNum = 0;
    }

    let sql = 'select * from book order by id limit ?,?';
    pool.query(sql, [pageNum, count], (err, result) => {
        if (err) throw  err;
        if (result.length > 0) {
            console.log(result)
            res.send({code: 200, bookList: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

/**
 * 获取书籍详细信息
 * bookId 书籍编号
 * 测试url http://localhost:3333/book/detail
 */
router.post('/detail', (req, res) => {
    let data = req.body;
    let bookId = data.bookId;
    let sql = 'select * from book where id=?';
    pool.query(sql, [bookId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code: 200, book: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

/**
 * 获取章节
 * bookId 书籍编号
 * 测试url http://localhost:3333/book/chapterList
 */
router.post('/chapterList', (req, res) => {
    let data = req.body;
    let bookId = data.bookId;
    let sql = 'select id,chapterNum,chapterName from book_content where bookId=?';
    pool.query(sql, [bookId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code: 200, book: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});
//获取确定章节内容 根据章节id
/**
 * 获取确定章节内容
 * chapterId 根据章节
 * 测试url http://localhost:3333/book/chapter
 */
router.post('/chapter', (req, res) => {
    let data = req.body;
    let chapterId = data.chapterId;
    let sql = 'select id,chapterName,content from book_content where id=?';
    pool.query(sql, [chapterId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code: 200, book: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    })
});


module.exports = router;