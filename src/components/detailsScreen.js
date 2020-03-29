import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsTodo from '../actions/actionsTodo';

class DetailScreen extends PureComponent {
  constructor(props) {
      super(props)
      this.state = {
        detailID : 1,
        detailArr : {}
      }

      

  }
  getId = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  componentDidMount(){
    var detailId = (this.getId('id', window.location.href) !== null && this.getId('id', window.location.href) !== '') ? this.getId('id', window.location.href) : 1;
      this.setState({detailID : detailId})
      console.log(this.props.todoApp.data);
      if(this.props.todoApp.data.property !== undefined)
      {
      Object.values(this.props.todoApp.data.property).map((user, i) => {
        if(parseInt(user.id) === parseInt(detailId)){
          this.setState({detailArr : user})
        }
        })
      }
  }  
  render() {
    console.log(this.state.detailArr,this.state.detailID);
    var self = this;
      return (
      <div className="HistoryDiv">
          {this.state.detailArr != undefined && 
          <div>{this.state.detailArr.neighbourhood}
           <img src="../images/sampleImg.png" alt="Renting House" height="400" width="100%"/><br/>
           <p className='priceLbl'>{this.state.detailArr.title}</p>
           <p className='priceLbl'>{this.state.detailArr.desc}</p>
           <label className='priceLbl'>{this.state.detailArr.price}<span style={{ fontWeight:'normal',color: '#ADADAD',fontSize:12  }} >/YEAR</span></label> <br/>
          <p className='priceLbl'>{this.state.detailArr.neighbourhood}</p>
          {console.log('dddd'+this.state.detailArr.neighbourhood)}</div>
           }
      </div>
      )
  }
}
const mapStateToProps = (state) => {
  return {
      todoApp: state.todoApp
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
     
      setUserData: actionsTodo.setUserData,
  },dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(DetailScreen)