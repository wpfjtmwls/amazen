import React from 'react';
import axios from 'axios';

export default class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {descriptors: []};
    this.addButtonOnClick = this.addButtonOnClick.bind(this);
    this.searchButtonOnClick = this.searchButtonOnClick.bind(this);
  }

  searchButtonOnClick() {
    var descriptors_str = this.state.descriptors.join(",");
    window.location.href = "search_page?query=" + this.refs.New_search.value + "&descriptors=" + descriptors_str;
    // axios.get("search_page?query=" + {this.refs.New_search.value} + "&descriptors=" + descriptors_str)
    //   .then(res => {
    //     const posts = res.data.data.children.map(obj => obj.data);
    //     this.setState({ posts });
    //   });
  }

  addButtonOnClick() {
    var new_d = this.refs.New_descriptor.value;
    this.refs.New_descriptor.value = "";
    if(new_d != "" && this.state.descriptors.indexOf(new_d) == -1)
      this.setState((prevState, props) => ({
        descriptors: [...prevState.descriptors, new_d]
      }));
  };

  deleteButtonOnClick(deletedName) {
    var arr = this.state.descriptors;
    var i = arr.indexOf(deletedName);
    arr.splice(i, 1);
    this.setState({descriptors: arr});
  };

  render() {
    return (
      <div>
        <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/static/main.css" />
        <div className="text-center">
          <img src="/static/img/logo.png" width="400" />
        </div>
        <form className="form-inline global-search search-wrapper">
          <div className="search-bar">
            <input className="search-bar-input input-lg" type="text" placeholder="What are you looking for today?" ref="New_search"/>
            <div className="input-group-btn">
              <button className="btn btn-lg search-bar-button" type="button" onClick={this.searchButtonOnClick}>
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
          <br />
          <div className="search-bar descriptor-bar">
            <div className="descriptor-wrapper">
              <input type="text" className="input-lg descriptor-bar-input" placeholder="Descriptors" ref="New_descriptor"/>
              {this.state.descriptors.map((d) =>
                <div key={d} className="descriptor-tag-wrapper">
                    <span className="badge badge-default descriptor-tag">
                      {d}
                      <button className="btn descriptor-tag-button" type="button" onClick={() => this.deleteButtonOnClick(d)}>
                        <span className="glyphicon glyphicon-remove"></span>
                      </button>
                    </span>
                </div>
              )}
            </div>
            <div className="input-group-btn">
              <button className="btn btn-lg search-bar-button" type="button" onClick={this.addButtonOnClick}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
