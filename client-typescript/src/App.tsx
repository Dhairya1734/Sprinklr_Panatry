import './client.css';
import Header from './Header';
import React , {lazy, Suspense} from 'react';
const Maincontenet= lazy(() => import('./Maincontent'));

const App : React.FC = () => {
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
