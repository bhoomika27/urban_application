
export const setLoggedInValue = (flag,username)=>({
    type:'LOGIN_VALUE',
    flag: flag,
    username:username
})
export const setFilteredItems = (items)=>({
    type:'SET_FILTERED_ITEMS',
    items:items
})
export const setUserData = (data)=>({
    type:'ADD_USERS_DATA',
    data:data
})
// export const setFavorites = (favArr)=>({
//     type:'SET_FAVORITES',
//     favArr:favArr
// })

// to end here




