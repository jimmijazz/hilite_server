
var base_url = "https://hiliteapp.herokuapp.com";
var userid = "16b8be7599b43835e5dafd448de630664b4cacf551f7ad18ee49ca094cdcc44";

// Contains all the item cards and loads list data
var ItemBox = React.createClass({
  getItems : function() {
    $.post(
        base_url + "/links",
        {"id" : this.props.userID},
        function(data, status) {
            this.setState({data: data});
            console.log(data);
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
        <p>{item}</p>
      );
    });
    return (
      <div className="itemList">
        {listNodes}
      </div>
    );
  }
});

// individual item
var itemCard = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
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
