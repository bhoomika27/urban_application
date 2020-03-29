import React, { PureComponent } from 'react';
import * as actionsTodo from '../actions/actionsTodo';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class MyFilteringComponent extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            initialItems: [],
            items: []
        }
        console.log(this.props, 'dsadsadsadtest');
    }

    componentDidMount(){
        this.setState({
            initialItems: this.props.content.property,
            items: this.props.content.property
        })
      
    }
    
    filterList = (event) => {

      let items = this.state.initialItems;
      console.log(items)
      items = items.filter((item) => {
          console.log(item)
          console.log(item.neighbourhood)
          console.log(item.appartment)
        return item.neighbourhood.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      console.log(items)
      this.props.setFilteredItems(items)
     // this.setState({items: items});
    }

    render() {
      return (
        <div>
          <form>
            <input type="text" placeholder="Search Neighbourhood,building...." Class="SearchInput" onChange={this.filterList}/>
          </form>
          <div>
            {this.props.todoApp.items!==undefined &&
                this.props.todoApp.items.map(function(item) {

                    return <div key={item}></div>
                })
            }
            </div>
        </div>
      );
    }
};
const mapStateToProps = (state) => {
    return {
        todoApp: state.todoApp
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
       
        setFilteredItems: actionsTodo.setFilteredItems,
    },dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(MyFilteringComponent)