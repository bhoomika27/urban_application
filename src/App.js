import React, { Component } from 'react';
import MasterSearch from './components/masterSearch'
import Login from './components/login'
import {connect} from 'react-redux';
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
  }

  render(){
    if(this.props.todoApp.isLoggedIn){
      return (
        <div className="App">
              <MasterSearch/>
        </div>
      );
    }
    else{
      return (
        <div className="App">
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
