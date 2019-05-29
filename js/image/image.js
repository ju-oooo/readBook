//上一页
function prev_page() {
    let index = parseInt(pageNum_index.innerText)
    if (index > 1) {
        getImageList(--index)
    } else {
        alert('已经是第一页了')
    }
}

//下一页
function next_page() {
    let index = parseInt(pageNum_index.innerText)
    getImageList(++index)

}

//获取数据
function getImageList(index = 1) {
    let xhr = new XMLHttpRequest();
    let url = '/image/list'
    xhr.open('post', url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    let data = {
        pageNum: index,
        count: 20
    }
    data = `pageNum=${index}&count=20`
    xhr.send(data);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let result = JSON.parse(xhr.responseText);
            if (result.imageList != undefined) {
                let image_html = '';
                result.imageList.forEach((temp) => {
                    image_html += `<!--<li><img src="../image/image-${temp.id}.jpg" onerror="this.src = '../error/404.gif'" alt="${temp.id}"></li>-->`;
                    image_html += `<li>
                                        <a href="http://127.0.0.1:8989/original/img/image-${temp.id}.jpg" target="_blank">
                                            <img src="http://127.0.0.1:8989/compress/img/image-${temp.id}.jpg" 
                                                onerror="this.src = '../error/404.gif'" alt="${temp.id}">
                                        </a>
                                    </li>`;
                })
                console.log(image_html)
                image_list.innerHTML += image_html
                pageNum_index.innerHTML = index
            } else {
                alert('没数据了')
            }

        }
    }
}