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
                    + '<h2 class="Feedback_heading">' + author.value + " " 
                    + '<small>' + dateString + '</small> </h2>' 
                    + '<p>' + text.value + '</p>' 
                    + '</div></div>';
    element.insertBefore(out, element.firstChild);
    document.getElementById("text").value = '';
    document.getElementById("name").value = '';
  } else {
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
    localStorage.setItem('r' + i, JSON.stringify(list));
    document.getElementById("text").value = '';
    document.getElementById("name").value = '';
  }
}

function readOfflineFeedback() {
  len = localStorage.length + 1;
  for (var j = 1; j < len; j++) {
    feedback = JSON.parse(localStorage.getItem('r' + j));
    var element = document.getElementById("responses");
    var out = document.createElement("div");
    out.id = "feedback";
    out.innerHTML = '<div class = "feedback" >' + 
                    '<h2 class="Feedback_heading">' + feedback[0].name + " " 
                    + '<small>' + feedback[0].date + '</small> </h2>' 
                    + '<p>' + feedback[0].text + '</p>'
                    + '</div></div>';
    element.insertBefore(out, element.firstChild);
    // localStorage.removeItem(j);
  }
}

