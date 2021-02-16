import './server.css';
import Header from './Header'
//import MainContent from './MainContent'
import React , {useState , lazy , Suspense} from 'react';
import {connect, Provider } from 'react-redux'
import rootReducer from './Reducer'
import {createStore} from 'redux'

const MainContent = lazy( ()=> import('./MainContent') )

const store = createStore(rootReducer);

function App() {

  const [displayTable,SetDisplayTable] = useState("all");

  function setTable(e){
      SetDisplayTable(document.querySelector('.findTable').value);
  }
  return (
    <>
        <Provider store={store}>
            <Header handler = {(setTable)}/>
            <Suspense fallback="This is loading">
              <MainContent table={displayTable}/>
            </Suspense>
        </Provider>
    </>
  
  );
}

connect(null,null)(App);

export default App;