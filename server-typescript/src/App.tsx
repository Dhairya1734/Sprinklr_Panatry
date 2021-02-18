import './server.css';
import Header from './Header'
//import MainContent from './MainContent'
import React , {useState ,useRef, /* lazy , */ Suspense, useCallback} from 'react';
import {connect, Provider } from 'react-redux'
import rootReducer from './Reducer'
import {createStore} from 'redux'

// const MainContent = lazy( ()=> import('./MainContent') )

const store = createStore(rootReducer);

function App() {

  const searchRef = useRef<HTMLSelectElement | undefined>();

  const [/* displayTable */,setDisplayTable] = useState("all");

  const onSetTable = useCallback((e : React.ChangeEvent<HTMLSelectElement>) : void=>{
    if(searchRef.current){
      setDisplayTable(searchRef.current.value);
      console.log(searchRef.current.value);
    }
  },[]);
  return (
    <>
        <Provider store={store}>
            <Header onSetTable = {(onSetTable)} searchRef={searchRef}/>
            <Suspense fallback="This is loading">
              {/* <MainContent table={displayTable}/> */}
            </Suspense>
        </Provider>
    </>
  
  );
}

connect(null,null)(App);

export default App;