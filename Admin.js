function addNews() {
	var newsHeader = document.getElementById('newsHeader');
	var newsShortText = document.getElementById('newsShortText');
	var newsText = document.getElementById('newsText');
		

		if( newsHeader.value == "" || newsShortText.value == ""	|| newsText.value == ""){
				alert("Заповніть всі поля!");
				return;
			}else {
				alert('Новина додана')
			}
			document.getElementById('newsHeader').value = '';
			document.getElementById('newsShortText').value = '';
			document.getElementById('newsText').value = '';

	
		// if(newsHeader.value == ""){
		// 		alert("Введіть заголовок статті");
		// 		return;
		// 	}
		// 	if(newsShortText.value == ""){
		// 		alert("Введіть короткий опис статті");
		// 		return;
		// 	}
		// 	if(newsText.value == ""){
		// 		alert("Введіть текст статті");
		// 		return;
		// 	}


}