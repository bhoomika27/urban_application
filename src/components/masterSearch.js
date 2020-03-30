import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsTodo from '../actions/actionsTodo';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';
import MyFilteringComponent from './filterComponent';
import './urban.css'
import { Link } from "react-router-dom";

class MasterSearch extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            children:[],
            activeItemIndex: 0,
        }
    }

    componentDidMount(){
        if(localStorage.getItem('response' + this.props.todoApp.username) !== null){
            var tempValue = JSON.parse(localStorage.getItem('response' + this.props.todoApp.username))
            console.log(tempValue)
            this.props.setUserData(tempValue);
        }
        else{
            axios.get('./sampleData.json')
            .then(response => {
                localStorage.setItem('response' + this.props.todoApp.username, JSON.stringify(response.data))
                this.props.setUserData(response.data);
            })
        }
        
    }
   
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex: activeItemIndex});
    
    addToFav(id) { 

        var tempObj = JSON.parse(localStorage.getItem('response' + this.props.todoApp.username));
        tempObj.property.map((eachObj, index) => {
            if(id === eachObj.id){
                eachObj.general.liked = !eachObj.general.liked;
            }
        })
        localStorage.setItem('favData', JSON.stringify(this.props.todoApp.username,tempObj))
        localStorage.setItem('response' + this.props.todoApp.username, JSON.stringify(tempObj))
        this.props.setUserData(tempObj);
       // this.props.setFavorites(tempObj);

        console.log(tempObj, 'test');
    }

    onLogout(){
        localStorage.setItem('isLoggedIn', false)
        this.props.setLoggedInValue(false)
                // window.location.reload()
    }

    render() {
        var self = this;
        return (
    <div className="HistoryDiv">
        {this.props.todoApp.data.property !== undefined && <MyFilteringComponent content={this.props.todoApp.data}/>}
        <div className="filtersdiv">
          <div className="filterLbl">
            <img src="../images/settings-slider.svg" alt="filterIcon"/>
            <p className="metrodecs">Filters</p>
          </div>
       
        <p className="filterLbl">Home Type</p>     
        <p className="filterLbl">Price</p>
        <p className="filterLbl">Br</p>               
        </div>
        <h2 className="metroLbl">Close to metro</h2>
        <p className="metrodecs">Less than 5 min walk to a metro station</p>     
        <ItemsCarousel


        // Carousel configurations
        numberOfCards={3}
        gutter={6}
        showSlither={true}
        firstAndLastGutter={false}
        freeScrolling={false}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={this.state.activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={true}
      >
         {this.props.todoApp.items != undefined &&                
                Object.values(this.props.todoApp.items).map((user, i) => {
                    console.log(user)
                return (
                    <div key={user.id} className = "container">
                        <div className = "routing">
                        <Link to={'/detail?id='+user.id} >
                        <div className="crouselElement" key={user.id}>
                        <img className="houseImg" src="../images/sampleImg.png" alt="Renting House" height="50%" width="100%"/>
                        <div className="bedHalK">
                            <span>
                            <img className="houseIcon" src="../images/hotel-single-bed-1.svg" alt="Renting House" height="50%" width="100%"/>
                            <label>{user.general.bedroom}</label>
                            </span>
                            <span>
                            <img className="houseIcon" src="../images/hotel-single-bed-1.svg" alt="Renting House" height="50%" width="100%"/>
                            <label>{user.general.bathroom}</label>
                            </span>
                            <span>
                            <img className="houseIcon" src="../images/hotel-single-bed-1.svg" alt="Renting House" height="50%" width="100%"/>
                            <label>{user.general.parking}</label>
                            </span>
                            </div>                           
                        <label className='priceLbl'>{user.price}<span style={{ fontWeight:'normal',color: '#ADADAD',fontSize:12  }} >/YEAR</span></label> <br/>
                            {user.address.appartment}.{user.neighbourhood}
                            </div>
                            </Link>
                        </div>
                        <div className = "favImage">
                        <img src={user.general.liked ? "../images/heart.svg":"../images/like1.svg"}  alt="Renting House" height="50%" width="100%" onClick={self.addToFav.bind(this,user.id)}/>
                            </div>
                    
                    </div>
                    )
                    })
                    }
      </ItemsCarousel>
 
                    <button className="logoutBtn" onClick = {this.onLogout.bind(this)}>Logout</button>
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
        setLoggedInValue: actionsTodo.setLoggedInValue,
        setUserData: actionsTodo.setUserData,
        // setFavorites:actionsTodo.setFavorites,
    },dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(MasterSearch)