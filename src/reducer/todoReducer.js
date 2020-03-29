import * as actionTypes from '../actions/actionsTodo'

const initialState = {
    tasklist:[],
    data:[],
    items:[],
    todos:'',
    id:0,
    title:'',
    desc:'',
    status:"default",
    edit:false,
    taskStatus:false,
    addFlag: false,
    updateCheckBox:'',
    updateTodoId:'',
    history:[],
    isLoggedIn: false

  };
function todoApp(state = initialState, action) {
    
  switch (action.type) {
    case 'ADD_USERS_DATA':
      return state= setUserData(state,action.data);
    case 'SET_FILTERED_ITEMS':
      return state= setFilteredItems(state,action.items);  
    case 'ADD_FIELD_VALUE':
        return state= setFieldsValue(state,action.name,action.value);
    case 'ADD_CHECKBOX_VALUE':
        return state= setCheckboxValue(state,action.name,action.value);           
    case 'ADD_USERS_TODOS':
        return state= setUserTodos(state,action.data);          
    case 'UPDATE_CHECKBOX':
        return state= updateCheckboxValue(state,action.name,action.checked,action.id);
      case 'LOGIN_VALUE':
        state= {...state,
          isLoggedIn: action.flag
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
const setCheckboxValue=(state,name,value)=>{
 
  state={
    ...state,
    [name]:value
  }
  return state
}
const updateCheckboxValue=(state,name,checked,id)=>{

  state={
    ...state,
    [name]:checked
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
  console.log(state)
  return state
}
const setUserTodos=(state,data)=>{
  state={
    ...state,
    todos:data
  }
  return state
}


const setTodoList=(state,counter,userId)=>{
  const tasklist = {userId:userId, id:counter,title: state.title,completed:state.taskStatus};
  state={
    ...state,
    todos:[...state.todos,tasklist]
  }
return state
}


export default todoApp