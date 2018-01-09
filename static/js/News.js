

$(document).ready(function (){
    readOfflineNews();
    function readOfflineNews() {
    if(navigator.onLine){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3030/news', false);
            xhr.send();
                        if (xhr.status !== 200) {
                console.error( xhr.status + ': ' + xhr.statusText );
            } else {
                    $.each(JSON.parse(xhr.responseText), function(i,b){
                        var parentElem = document.getElementById('news-list');
                        var out = document.createElement('div');
                        out.id = 'news';
                        out.innerHTML = "<div class='col-lg-4'>" + 
                                        "<img id='last_news_image' src= '" + b.img + "'>" +
                                        '<h2 class="News_heading"><small>' + b.name + "</small></h2>" +
                                        "<blockquote>" + "<p>" + b.text + "</p>" + "</blockquote>"
                                        "</div>";
                                        parentElem.appendChild(out);
                                    }
                                    );
                }
} else{
    if (useLocalStorage) {
    len = localStorage.length + 1;
    for (var k = 1; k < len; k++) {
        news = JSON.parse(localStorage.getItem('news' + k));
        var img = localStorage.getItem('image' + k);
        var parentElem = document.getElementById('news-list');
        var out = document.createElement('div');
        out.id = 'news';
        out.innerHTML = "<div class='col-lg-4'>" + 
                        "<img id='last_news_image' src= '" + img + "'>" +
                        '<h2 class="News_heading"><small>' + news[0].name + "</small></h2>" +
                        "<blockquote>" + "<p>" + news[0].text + "</p>" + "</blockquote>"
                        "</div>";
        parentElem.appendChild(out);}
    } else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");
        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                    var parentElem = document.getElementById('news-list');
                    var out = document.createElement('div');
                    out.id = 'news';
                    out.innerHTML = "<div class='col-lg-4'>" + 
                                    "<img id='last_news_image' src= '" + cursor.value.img + "'>" +
                                    '<h2 class="News_heading"><small>' + cursor.value.name + "</small></h2>" +
                                    "<blockquote>" + "<p>" + cursor.value.text + "</p>" + "</blockquote>"
                                    "</div>";
                    parentElem.appendChild(out);
    }
    }
}
}
window.addEventListener('online', function(e) {
                    alert("Відправляю дані з LC на сервер");
                    readOfflineNews();
});


};
})
