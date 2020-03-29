import React, { Component } from 'react';
// import AddList from './components/addList';
import History from './components/masterSearch'
import Login from './components/login'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import './App.css'

class App extends Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.todoApp.isLoggedIn){
      return (
        <div className="App">
              <History/>
              {/* <Login/> */}
        </div>
      );
    }
    else{
      return (
        <div className="App">
              {/* <History/> */}
              <Login/>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
      todoApp: state.todoApp
  }
}

export default connect(mapStateToProps)(App);
