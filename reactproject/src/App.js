import Header from './Header.js'
import Maincontenet from './Maincontent.js'
import './client.css';
import { createStore } from 'redux';
import rootReducer from './Reducer.js';
import { Provider } from 'react-redux';


let store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Maincontenet />
      </div>
    </Provider>
  );
}

store.subscribe(App);

export default App;
