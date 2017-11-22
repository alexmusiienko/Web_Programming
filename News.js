window.addEventListener('load', function() {
    function updateOnlineStatus(event) {
        if(isOnline()){
            readOfflineNews();
        }
    }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});
function isOnline() {
    return window.navigator.onLine;
}

function readOfflineNews() {
    len = localStorage.length + 1;
    for (var k = 1; k < len; k++){
        news = JSON.parse(localStorage.getItem('n'+ k));
        var img = localStorage.getItem('i'+ k);
        var parentElem = document.getElementById('news-list');
        var out = document.createElement('div');
        out.id = 'news';
        out.innerHTML = "<div class='col-lg-4'>" +
        				"<img id='last_news_image' src= '" + img + "'>"+
                        '<h2 class="News_heading"><small>' + news[0].name + "</small></h2>"+
        				"<blockquote>" +
        				"<p>" + news[0].text + "</p>"+
        				"</blockquote>"
        				"</div>";
        parentElem.appendChild(out);
    }
}