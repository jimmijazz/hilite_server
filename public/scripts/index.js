
var base_url = "https://hiliteapp.herokuapp.com";
var userid = "16b8be7599b43835e5dafd448de630664b4cacf551f7ad18ee49ca094cdcc44";


var getItems = function(userID) {
  $.post(
      base_url + "/links",
      {"id" : userID},
      function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
  })
}

$(document).ready(function() {
  console.log(getItems(userid));
});