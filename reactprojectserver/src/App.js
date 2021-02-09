import './server.css';
import Header from './Header.js'
import MainContent from './MainContent.js'
import React , {useState} from 'react';

function App() {

  const [displayTable,SetDisplayTable] = useState("all");

  function setTable(e){
      //console.log(document.querySelector('.Find_Table').value);
      SetDisplayTable(document.querySelector('.Find_Table').value);
      //console.log(displayTable);
  }
  return (
    <>
      <Header handler = {(setTable)}/>
      <MainContent table={displayTable}/>
    </>
  );
}

export default App;
