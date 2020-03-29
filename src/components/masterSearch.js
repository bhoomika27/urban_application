import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionsTodo from '../actions/actionsTodo';
import ItemsCarousel from 'react-items-carousel';
import axios from 'axios';
import MyFilteringComponent from './filterComponent';
import './urban.css'
import { Link }             from "react-router-dom";

class History extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name:'',
            children:[],
            activeItemIndex: 0,
        }
    }

    componentDidMount(){
        if(localStorage.getItem('response') !== null){
            var tempValue = JSON.parse(localStorage.getItem('response'))
            this.props.setUserData(tempValue);
        }
        else{
            axios.get('./sampleData.json')
            .then(response => {
                localStorage.setItem('response', JSON.stringify(response.data))
                this.props.setUserData(response.data);
                console.log(response)
            })
        }
        
    }
   
    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex: activeItemIndex});
    
    addToFav (id) {
        console.log(id, JSON.parse(localStorage.getItem('response')), 'test');
        var tempObj = JSON.parse(localStorage.getItem('response'));

        tempObj.property.map((eachObj, index) => {
            if(id === eachObj.id){
                eachObj.general.liked = !eachObj.general.liked;
            }
        })

        localStorage.setItem('response', JSON.stringify(tempObj))
        this.props.setUserData(tempObj);

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
        <h2 className="metroLbl">Close to metro</h2>
        <p className="metrodecs">Less than 5 min walk to a metro station</p>     
        <ItemsCarousel
        // Placeholder configurations
        // enablePlaceholder
        // numberOfPlaceholderItems={5}
        // minimumPlaceholderTime={1000}
        // placeholderItem={<div style={{ height: 500, background: '#900' }}>Placeholder</div>}

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
                return (
                    <div className = "container">
                        <div className = "routing">
                        <Link to={'/detail?id='+user.id} >
                        <div style={{ height: 200, background: '#333' , color:'#fff' }} key={i}  value={user.id}>
                   
                            <img src="../images/sampleImg.png" alt="Renting House" height="50%" width="100%"/>
                           
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
     
                    <button onClick = {this.onLogout.bind(this)}>Logout</button>
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
    },dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(History)