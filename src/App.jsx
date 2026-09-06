import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AllRoutes } from './routes/AllRoutes';

import './App.css';



function App() {
  const pathName = useLocation().pathname;

  const navNotIncluded = pathName.includes("/login");

  

  return (
    <div className="app">
      {!navNotIncluded && <Sidebar />}

      <div className="main">
        {!navNotIncluded && <Navbar />}

        <div className={`content ${navNotIncluded ? "p-0" : ""}`}>
          <AllRoutes />
        </div>
      </div>
    </div>
  )
}

export default App
