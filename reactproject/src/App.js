import Header from './Header'
import './client.css';
import React , {lazy, Suspense} from 'react';

const Maincontenet= lazy(() => import('./Maincontent'));

function App() {
  console.log("Application");
  return (
    <div className="App">
      <Header />
      <Suspense fallback = {<div className="loading"> This is Loading </div>}>
        <Maincontenet />
      </Suspense>
    </div>
  );
}

export default App;
