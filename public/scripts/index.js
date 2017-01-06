
var base_url = "https://hiliteapp.herokuapp.com";



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

$(document.ready) {

}
