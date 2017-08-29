/*
 *
 * Home
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class Home extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      listItems:[],
      inputItem:""
    }
  };

  componentWillMount() {
    this.getTasks();
  };

  getTasks = () => {
    fetch('http://localhost:8000/api/getTasks', {
      method:'Get'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        listItems:json.tasks
      })
    }.bind(this))
  };

  storeTask = () => {
    let data = new FormData;
    data.append('taskContent', this.state.inputItem);

    fetch('http://localhost:8000/api/storeTask', {
      method:'Post',
      body:data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let listItems = this.state.listItems;
      listItems.push(json.task);
      this.setState({
        listItems:listItems
      })
      this.forceUpdate();
    }.bind(this))
  };

  storeItem = () => {

    var listItems = this.state.listItems;
    var inputItem = this.state.inputItem;

    if (inputItem !== "") {
      listItems.push(inputItem);

      this.setState({
        listItems: listItems,
        inputItem:""
      })
    }
  };

  handleEnter = (event) => {
    if (event.keyCode === 13)
    this.storeItem();
  };

  handleItem = (event) => {
    this.setState({
      inputItem: event.target.value
    })
  };

  strikeThrough = (event) => {
    let item = event.target;
    item.style.textDecoration = 'line-through';
  };

  clearButton = () => {
    this.setState ({
      listItems:[]
    })
  };

  render() {
    return (
      <div className="container">
        <Helmet title="To Do List" meta={[ { name: 'description',
          content: 'Description of Home' }]}/>
        <div className="inputContainer">
            <input type="text"
              className="todoInput"
              onChange={this.handleItem}
              onKeyDown={this.handleEnter}
              value={this.state.inputItem} />
            <input type="submit"
              value="Add to List"
              className="todoButton"
              onClick={this.storeTask} />
            <input type="submit"
              value="Clear List"
              className="clearList"
              onClick={this.clearButton} />
        </div>
        <div className="todoList">
          {this.state.listItems.map((item, index) => (
            <div type="button"
              className="listItem"
              key={index}
              onClick={this.strikeThrough}>
              {item.taskContent}
            </div>
          ))}
        </div>
        </div>
    );
  }
};

Home.contextTypes = {
  router: React.PropTypes.object
};
