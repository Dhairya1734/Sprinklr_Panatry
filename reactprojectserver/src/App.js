import './server.css';
import Header from './Header.js'
import MainContent from './MainContent.js'
import Parent from './Parnet'
import React , {useState} from 'react';

function App() {

  const [displayTable,SetDisplayTable] = useState("all");

  function setTable(e){
      SetDisplayTable(document.querySelector('.Find_Table').value);
  }
  return (
    <>
      <Header handler = {(setTable)}/>
      <MainContent table={displayTable}/>
      {/* <Parent /> */}
    </>
  );
}

export default App;
