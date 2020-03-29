import React from 'react';
// import AddList from './components/addList';
import History from './components/masterSearch'
import DetailScreen from './components/detailsScreen'
import HeaderScreen from './components/header'
import './App.css'

function App() {
  return (
    <div className="App">
          <History/>
          <DetailScreen/>
          <HeaderScreen/>
    </div>
  );
}

export default App;
