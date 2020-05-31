import React, {createContext, useState} from 'react';
import './App.css';
import { ComponentC } from './component/ComponentC';

export const userContext = createContext()
export const languageContext = createContext()

function App() {
  const [user, setUser] = useState({ name: 'yamada', age: 32 })
  const [language, setLanguage] = useState('日本語')

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <languageContext.Provider value={language}>
          <ComponentC />
        </languageContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
