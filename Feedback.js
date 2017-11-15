
function addFeedback() {
  var feedbackText = document.getElementById("FeedbackText");
  var author = document.getElementById("NameText");
     if(author.value == ""){
    alert("Введіть ім'я!");
    return;
   }
   if(feedbackText.value == ""){
    alert("Введіть відгук!");
    return;
  }
  var date = new Date();
  var dateString = "";
   dateString = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() ;
  var element = document.getElementById("responses");
  var out = document.createElement("div");
  out.innerHTML = 
      '<div class = "feedback" >' + 
      '<h2 class="Feedback_heading">' + author.value + " " + 
      '<small>' + dateString + '</small> </h2>' +
      '<p>' + feedbackText.value + '</p>' +
      '</div></div>';
  element.insertBefore(out, element.firstChild);
  document.getElementById("FeedbackText").value = '';
  document.getElementById("NameText").value = '';


}

