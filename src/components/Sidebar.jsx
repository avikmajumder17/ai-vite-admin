import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";



export default function Sidebar({ responsiveToggle, setResponsiveToggle }) {  
  const [isMobileResponsive, setIsMobileResponsive] = useState(false);

  useEffect(() => {
    //eslint-disable-next-line
    window.innerWidth < 992 && setIsMobileResponsive(true);
  }, []);



  return (
    <>
      { isMobileResponsive && (<div onClick={() => setResponsiveToggle(false)} className={`sidebar-backdrop ${responsiveToggle ? "sidebar-backdrop-show sidebar-backdrop-hide" : "sidebar-backdrop-hide"}`}></div>) }

      <aside className={`sidebar ${responsiveToggle ? "sidebar-show sidebar-hide" : "sidebar-hide"}`}>
        <h2 className="d-flex align-items-center justify-content-between">AI Admin <i onClick={() => setResponsiveToggle(false)} className="fa-solid d-lg-none fa-xmark"></i></h2>

        <nav>
          <Link to="/">Homepage</Link>          
              
          <Link to="/about-us">About Us</Link>          
          
          <Link to="/blogs">Blogs</Link> 

          <Link to="/blog-categories">Blog Categories</Link>  
        </nav>
      </aside>
    </>
  );
}