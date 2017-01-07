
// Api URL
var base_url = "https://hiliteapp.herokuapp.com";

// Locally stored key generated by chrome extension
var userid = localStorage.getItem('userid');

// Contains all the item cards and loads list data
var ItemBox = React.createClass({
  getItems : function() {
    $.post(
        base_url + "/getitems",
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
    // setInterval(this.getItems, this.props.pollInterval);
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
  handleDelete: function(commentId) {
    $.post(
        base_url + "/deleteitems",
        {"id" : this.props.data._id},
        function(data, status) {
          console.log(data.data.items);
            this.setState({data: data.data.items});
    }.bind(this)
  ).fail(function() {
      console.log("error");
    });
  },
  render: function() {
    var listNodes = this.props.data.map(function(item) {
      return (
        <ItemCard
            key={item._id}
            id ={item._id}  // key is a special prop so also need to use id.
            host={item.hostname}
            text={item.text}
            url={item.url}
            onDelete={this.handleDelete}>
          {item.text}
        </ItemCard>
      );
    }.bind(this));
    return (
      <div className="ItemList">
        {listNodes}
      </div>
    );
  }
});

// Individual item
var ItemCard = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  handleClick:function(e) {
    e.preventDefault();
    return this.props.onDelete(this.props.id);
  },
  render: function() {
    return (
      <div className="ItemCard">
        <h2 className="itemHost">
          {this.props.host}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button type="submit" className="delete" onClick={this.handleClick}>
          &times;
        </button>
      </div>
    );
  }
});


ReactDOM.render(
  <ItemBox userID={userid} pollInterval={2000} />,
  document.getElementById('content')
);
