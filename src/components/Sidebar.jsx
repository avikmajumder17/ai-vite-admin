import { Link } from "react-router-dom";

import "./Sidebar.css";



export default function Sidebar() {  
  return (
    <aside className="sidebar">

      <h2>AI Admin</h2>

      <nav>
        <Link to="/">Homepage</Link>          
            
        <Link to="/homepage">About Us</Link>          
        
        <Link to="/blogs">Blogs</Link>  
      </nav>
    </aside>
  );
}