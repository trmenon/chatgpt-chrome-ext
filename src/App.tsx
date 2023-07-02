import React, {useState, createContext} from 'react';
import { AppContext } from './context';
import './App.css';
import { MainPage } from './pages/main';

function App() {
  
  // State
  const [enable, setEnable] = useState(false);

  // Setter
  const handleEnable = ()=> setEnable(enable === false);

  // Renderer
  return (
    <div className="App">
      <AppContext.Provider value={{ enable, handleEnable }}>
        <MainPage/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
