
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
};

var itemBox = React.createClass({
  getItems : function() {
    $.post(
        base_url + "/links",
        {"id" : this.props.userID},
        function(err, data) {
          if (err) {
            console.log(err);
          } else {
            this.setState({data: data});
          }
    })
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getItems();
    setInterval(this.getItems, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="itemsBox">
        <itemList data = {this.state.data} />
      </div>
    )
  }
});

var itemList = React.createClass({
  render: function() {
    var listNodes = this.props.data.map(function(item) {
      return (
        <p>{data}</p>
      );
    });
    return (
      <div className="itemList">
        {listNodes}
      </div>
    );
  }
});


ReactDOM.render(
  <itemsBox userId={userid} pollInterval={2000} />,
  document.getElementById('content')
);
