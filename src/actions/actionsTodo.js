

export const setFieldsValue = (name,value)=>({
    type:'ADD_FIELD_VALUE',
    name:name,
    value:value
})
export const setCheckboxValue = (name,value)=>({
    type:'ADD_CHECKBOX_VALUE',
    name:name,
    value:value
})
//to start here

export const setFilteredItems = (items)=>({
    type:'SET_FILTERED_ITEMS',
    items:items
})
export const setUserData = (data)=>({
    type:'ADD_USERS_DATA',
    data:data
})
// to end here
export const setTaskList = (tasklist ,userId)=>({
type:'ADD_TASK',
tasklist:tasklist,
userId:userId
})

export const updateTaskList = (tasklist ,userId, val,checkval)=>({
type:'UPDATE_TASK',
tasklist:tasklist,
userId:userId,
title:val,
completed:checkval
})

export const deleteTask = (todo)=>({
    type:'DELETE_TASK',
    todo:todo
})
export const editTask = (todo,i)=>({
    type:'EDIT_TASK',
    index:i,
    todo:todo
})
export const setEditedList = ()=>({
    type:'SET_EDITED_LIST',
})
export const updateCheckboxValue = (name,checked ,id)=>({
    type:'UPDATE_CHECKBOX',
    name:name,
    checked:checked,
    id:id
    })



