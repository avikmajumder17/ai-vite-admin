import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AllRoutes } from './routes/AllRoutes';

import './App.css';



function App() {

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <AllRoutes />
        </div>
      </div>
    </div>
  )
}

export default App
