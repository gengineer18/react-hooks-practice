import React from 'react';
import './App.css';
import { DocTitleUpdateOne } from './component/DocTitleUpdateOne';
import { DocTitleUpdateTwo } from './component/DocTitleUpdateTwo';


function App() {
  return (
    <div className="App">
      <h1>CustomHook</h1>
      <DocTitleUpdateOne />
      <DocTitleUpdateTwo />
    </div>
  );
}

export default App;
