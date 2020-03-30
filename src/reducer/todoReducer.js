import * as actionTypes from '../actions/actionsTodo'

const initialState = {
    data:[],
    items:[],
    id:0,
    username:'',
    history:[],
    isLoggedIn: false,
    favArr:[]

  };
function todoApp(state = initialState, action) {
    
  switch (action.type) {
    case 'ADD_USERS_DATA':
      return state= setUserData(state,action.data);
    case 'SET_FILTERED_ITEMS':
      return state= setFilteredItems(state,action.items);  
    case 'ADD_FIELD_VALUE':
        return state= setFieldsValue(state,action.name,action.value);  
    // case 'SET_FAVORITES':
    //     return state= setFavoritesArray(state,action.favArr);        
    case 'LOGIN_VALUE':
        state= {...state,
          isLoggedIn: action.flag,
          username:action.username
        }
        return state
      // break;
          
    default:
      return state
  }
}

const setFieldsValue=(state,name,value)=>{

  state={
    ...state,
    [name]:value
  }
  return state
}
const setUserData=(state,data)=>{
  state={
    ...state,
    data:data,
    items:data.property
  }
  return state
}
const setFilteredItems=(state,items)=>{
  state={
    ...state,
    items:items
  }
 
  return state
}
// const setFavoritesArray=(state,favArr)=>{

//   const favArr={username:state.username}
//   favArr[state.username]=[favArr];
//   state={
//     ...state,
//     items:items
//   }

//   return state
// }



export default todoApp