$(function(){
    //引入页头
    $.ajax({
        url:'../../html/include/header.html',
        type:'get',
        success:function(data){
            $('head').append('<link rel="stylesheet" href="../../css/book/book-header.css">');
            $('header').replaceWith(data);
        }
    });
    //引入页尾
    $.ajax({
        url:'../../html/include/footer.html',
        type:'get',
        success:function(data){
            $('head').append('<link rel="stylesheet" href="../../css/book/book-footer.css">');
            $('footer').replaceWith(data);
        }
    });
});