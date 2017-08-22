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
  }
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
  }

  handleEnter = (event) => {
    if (event.keyCode === 13)
    this.storeItem();
  }

  handleItem = (event) => {
    this.setState({
      inputItem: event.target.value
    })
  }

  strikeThrough = (event) => {
    let item = event.target;
    item.style.textDecoration = 'line-through';
  }

  clearButton = () => {
    this.setState ({
      listItems:[]
    })
  }

  render() {
    return (
      <div className="container">
        <Helmet title="To Do List
          " meta={[ { name: 'description',
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
              onClick={this.storeItem} />
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
            {item}
            </div>
          ))}
        </div>
        </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object
};
