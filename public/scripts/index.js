
var base_url = "https://hiliteapp.herokuapp.com";

// var userid = "16b8be7599b43835e5dafd448de630664b4cacf551f7ad18ee49ca094cdcc44";
var userid = localStorage.getItem('userid');
console.log(localStorage);
console.log(userid);
// Contains all the item cards and loads list data
var ItemBox = React.createClass({
  getItems : function() {
    $.post(
        base_url + "/links",
        {"id" : this.props.userID},
        function(data, status) {
          console.log(data.data.items);
            this.setState({data: data.data.items});
    }.bind(this)
  ).fail(function() {
      console.log("error");
    });
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
        <ItemList data = {this.state.data} />
      </div>
    )
  }
});

// List of each of the item cards
var ItemList = React.createClass({
  render: function() {
    var listNodes = this.props.data.map(function(item) {
      return (
        <ItemCard host={item.hostname} text={item.text} url={item.url} >
          {item.text}
        </ItemCard>
      );
    });
    return (
      <div className="ItemList">
        {listNodes}
      </div>
    );
  }
});

// individual item
var ItemCard = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="ItemCard">
        <h2 className="itemHost">
          {this.props.host}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

ReactDOM.render(
  <ItemBox userID={userid} pollInterval={2000} />,
  document.getElementById('content')
);
