import Header from './Header'
import Maincontenet from './Maincontent.js'
import './client.css';
// import { createStore } from 'redux';
// import rootReducer from './Reducer.js';
// import { Provider } from 'react-redux';

// let store = createStore(rootReducer);

function App() {
  console.log("Application");
  return (
      <div className="App">
        <Header />
        <Maincontenet />
      </div>
  );
}

// store.subscribe(App);

export default App;
