window.addEventListener('load', function() {
  function updateOnlineStatus(event) {
    if (isOnline()) {
      readOfflineFeedback();
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});
var i = 0;

function isOnline() {
  return window.navigator.onLine;
}

function addFeedback() {
  var text = document.getElementById("text");
  var author = document.getElementById("name");
  if (author.value == "") {
    alert("Введіть ім'я!");
    return;
  }
  if (text.value == "") {
    alert("Введіть відгук!");
    return;
  }
  if (isOnline()) {
    var date = new Date();
    var dateString = "";
    dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    var element = document.getElementById("responses");
    var out = document.createElement("div");
    out.id = "feedback";
    out.innerHTML = '<div class = "feedback" >' 
                  + '<h2 class="Feedback_heading">' 
                  + author.value + " " 
                  + '<small>' + dateString + '</small> </h2>' 
                  + '<p>' + text.value + '</p>' 
                  + '</div></div>';
    element.insertBefore(out, element.firstChild);
    document.getElementById("text").value = '';
    document.getElementById("name").value = '';
  } else {
    if (useLocalStorage) {
      var text = document.getElementById("text").value;
      var name = document.getElementById("name").value;
      var date1 = new Date();
      var date = "";
      date = date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear();
      i++;
      var list = [];
      list.push({
        "name": name,
        "text": text,
        "date": date
      });
      localStorage.setItem('feedback' + i, JSON.stringify(list));
      document.getElementById("text").value = '';
      document.getElementById("name").value = '';
    } else {
      var transaction = db.transaction(["feedback"], "readwrite");
      var store = transaction.objectStore("feedback");
      var date1 = new Date();
      var date = "";
      date = date1.getDate() + "." + (date1.getMonth() + 1) + "." + date1.getFullYear();
      i++;
      var feedback1 = {
        message: document.getElementById('text').value,
        author: document.getElementById('name').value,
        time: date
      };
     store.add(feedback1);

    document.getElementById("text").value = '';
    document.getElementById("name").value = '';
     //  request.oncomplete = function(event) {
     //  console.log('request complete');
     //  console.log(event);
     // }


    }

  }
}


function readOfflineFeedback() {
  if (useLocalStorage) {
    len = localStorage.length + 1;
    for (var j = 1; j < len; j++) {
      feedback = JSON.parse(localStorage.getItem('feedback' + j));
      var element = document.getElementById("responses");
      var out = document.createElement("div");
      out.id = "feedback";
       out.innerHTML = '<div class = "feedback" >' 
                  + '<h2 class="Feedback_heading">' 
                  + feedback[0].name + " " 
                  + '<small>' + feedback[0].date 
                  + '</small> </h2>' 
                  + '<p>' + feedback[0].text + '</p>' 
                  + '</div></div>';
      element.insertBefore(out, element.firstChild);
    }
  } else {
    var transaction = db.transaction(["feedback"], "readonly");
    var store = transaction.objectStore("feedback");
    store.openCursor().onsuccess = function(e) {
      var cursor = e.target.result;
      if (cursor) {
        cursor.continue();
        var element = document.getElementById("responses");
        var out = document.createElement("div");
        out.id = "feedback";
         out.innerHTML = '<div class = "feedback" >' 
                  + '<h2 class="Feedback_heading">' 
                  + cursor.value.author + " " 
                  + '<small>' + cursor.value.time 
                  + '</small> </h2>' 
                  + '<p>' + cursor.value.message + '</p>' 
                  + '</div></div>';
        element.insertBefore(out, element.firstChild);
      }
    }
  }
}
