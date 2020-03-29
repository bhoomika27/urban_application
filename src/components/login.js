import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsTodo from '../actions/actionsTodo';
import TextField from 'material-ui/TextField';
import axios from 'axios'

class Login extends PureComponent {
    constructor(props){
      super(props);
      this.state={
      username:'',
      password:'',
      data: [],
      isLoggedIn: false
      }
     }

     componentDidMount(){
        axios.get('./users.json')
        .then(response => {
            this.setState({data:response.data})
            localStorage.setItem('userlist', JSON.stringify(response.data))
            // this.props.setUserData(response.data);
            // console.log(response)
        })
     }

     handleClick(){
         this.state.data.map((eachUser, index) => {
             if(this.state.username === eachUser.username && this.state.password === eachUser.password){
                localStorage.setItem('isLoggedIn', true)
                this.setState({isLoggednIn: true})
        this.props.setLoggedInValue(true)


             }
         })
     }

    render() {
        return (
          <div className="loginContainer">
            <MuiThemeProvider>
              <div>
               <TextField
                 hintText="Enter your Username"
                 floatingLabelText="Username"
                 onChange = {(event,newValue) => this.setState({username:newValue})}
                 />
               <br/>
                 <TextField
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   onChange = {(event,newValue) => this.setState({password:newValue})}
                   />
                 <br/>
                 <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
             </div>
             </MuiThemeProvider>
          </div>
        );
      }
    }
    const style = {
     margin: 15,
    };

    const mapStateToProps = (state) => {
        return {
            todoApp: state.todoApp
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return bindActionCreators({
            setLoggedInValue: actionsTodo.setLoggedInValue
        },dispatch)
    };
    
    export default connect(mapStateToProps,mapDispatchToProps)(Login)
