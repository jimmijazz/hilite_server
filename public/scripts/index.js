
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
        function(result, status) {
          this.setState({data: result.data.items});
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
  deleteComment: function(item_id, user_id) {
    $.post(
      base_url + "/deleteitem",
      {"_id" : user_id, "item" : item_id},
      function() {
        this.getItems();
      }.bind(this)
    ).fail(function() {
      console.log("error");
    });
  },

  render: function() {
    return (
      <div className="itemsBox">
        <ItemList data = {this.state.data} handleDelete={this.deleteComment} />
      </div>
    )
  }
});

// List of each of the item cards
var ItemList = React.createClass({


  render: function() {
    var listNodes = this.props.data.map(function(item) {
      return (
        <ItemCard
            key={item.item_id}
            id ={item.item_id}  // key is a special prop so also need to use id.
            user = {item.user_id}
            host={item.hostname}
            text={item.text}
            url={item.url}
            date = {item.date}
            onDelete={this.props.handleDelete}>
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
    return this.props.onDelete(this.props.id, this.props.user);
  },
  render: function() {
    return (
      <div className="ItemCard">
        <h3 className="itemHost">
          {this.props.host}
        </h3>
        <h4>
          {this.props.date}
        </h4>
        <p>
          {this.props.text}
        </p>
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
