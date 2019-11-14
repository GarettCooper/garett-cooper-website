import React from 'react';
import Header from './Header';
import GitPanel from './Git'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>
      <div className="margin">
        <GitPanel/>
      </div>
    </div>
  );
}

export default App;
