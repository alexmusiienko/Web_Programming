var i = 0;



function isOnline() {
	return window.navigator.onLine;
}

$(document).on("click", "#send_news", function (){
	var name = document.getElementById('newsHeader').value;
	var text = document.getElementById('newsText').value;
	var newsPic = document.getElementById('news-img').value;
	var imgData = readImage(src, target);
	if (name == "" || newsPic == "" || text == "") {
		alert("Заповніть всі поля!");
		return;
	}
	if (isOnline()) {

		var news = {
			img: imgData,
			name: name,
			text: text
		}
		var obj= JSON.stringify(news);
			if(navigator.onLine){
				fetch('http://localhost:3030/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: obj
            });
		document.getElementById('newsHeader').value = '';
		document.getElementById('newsText').value = '';
		target.src = 'static/images/Random-turtle.gif'
		alert('Новина додана');
	} else { 
		if (useLocalStorage) {
		imgData = target.src;
		i++;
		var list = [];
		list.push({
			"name": (name),
			"text": (text)
		});
		localStorage.setItem('news' + i, JSON.stringify(list));
		localStorage.setItem('image' + i, (imgData));
		document.getElementById('newsHeader').value = '';
		document.getElementById('newsText').value = '';
		target.src = 'images/Random-turtle.gif'
	} else {
		  var transaction = db.transaction(["news"], "readwrite");
            var store = transaction.objectStore("news");
            var list = [];
          var news1 =  {
                name: document.getElementById('newsHeader').value,
                text: document.getElementById('newsText').value,
                img: target.src
	};
	store.add(news1);
}
document.getElementById('newsHeader').value = '';
		document.getElementById('newsText').value = '';
		target.src = 'images/Random-turtle.gif'
}
}
});

function showImage(src, target) {
	var fr = new FileReader();
	// when image is loaded, set the src of the image where you want to display it
	fr.onload = function(e) {
		target.src = this.result;
	};
	src.addEventListener("change", function() {
		// fill fr with image data
		fr.readAsDataURL(src.files[0]);
	});
}
var src = document.getElementById("news-img");
var target = document.getElementById("target");
showImage(src, target);

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var file;
        reader.onload = function (e) {
            $('#img').attr('src', e.target.result);
        };
				reader.readAsDataURL(input.files[0]);
    }
}
function readImage(src, target) { //Загрузка изображения
            var FR= new FileReader();
            FR.onload = function(e) {
             target.src = this.result;
            };       
            FR.readAsDataURL( src.files[0] );
            return target.src;
          }
