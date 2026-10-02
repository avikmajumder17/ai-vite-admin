import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AllRoutes } from './routes/AllRoutes';

import './App.css';



function App() {
  const [responsiveToggle, setResponsiveToggle] = useState(false);

  const pathName = useLocation().pathname;

  const navNotIncluded = pathName.includes("/login");

  useEffect(() => {
    //eslint-disable-next-line
    setResponsiveToggle(false);
  }, [pathName]);

  

  return (
    <div className="app">
      {!navNotIncluded && <Sidebar responsiveToggle={responsiveToggle} setResponsiveToggle={setResponsiveToggle} />}

      <div className="main">
        {!navNotIncluded && <Navbar setResponsiveToggle={setResponsiveToggle} />}

        <div className={`content ${navNotIncluded ? "p-0" : ""}`}>
          <AllRoutes />
        </div>
      </div>
    </div>
  )
}

export default App
