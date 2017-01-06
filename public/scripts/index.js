
var base_url = "https://hiliteapp.herokuapp.com";
var userid = "16b8be7599b43835e5dafd448de630664b4cacf551f7ad18ee49ca094cdcc44";

// Contains all the item cards and loads list data
var ItemBox = React.createClass({
  getItems : function() {
    $.post(
        base_url + "/links",
        {"id" : this.props.userID},
        function(err, data) {
            this.setState({data: data});

    }).fail(function() {
      console.log("error");
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.getItems();
    // setInterval(this.getItems, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="itemsBox">
        <itemList data = {this.state.data} />
      </div>
    )
  }
});

// List of each of the item cards
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
  <ItemBox userID={userid} pollInterval={2000} />,
  document.getElementById('content')
);
