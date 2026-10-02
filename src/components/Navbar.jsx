import { useEffect, useState } from "react";
import "./Navbar.css";
import { useLocation } from "react-router-dom";



export default function Navbar({ setResponsiveToggle }) {
  const [navbarTitle, setNavbarTitle] = useState("Dashboard");
  const [isMobileResponsive, setIsMobileResponsive] = useState(false);

  const pathName = useLocation().pathname;

  useEffect(() => {
    if (pathName === "/") {
      //eslint-disable-next-line
      setNavbarTitle("Home");
    } else if (pathName === "/about-us") {
      setNavbarTitle("About Us");
    } else if (pathName === "/blogs") {
      setNavbarTitle("Blogs");
    } else if (pathName === "/blogs/:id") {
      setNavbarTitle("Edit Blog");
    } else if (pathName === "/blog-categories") {
      setNavbarTitle("Blog Categories");
    }
  }, [pathName]);

  useEffect(() => {
    //eslint-disable-next-line
    window.innerWidth < 992 && setIsMobileResponsive(true);
  }, []);



  return (
    <header className="navbar px-4">
      <div className="container">
        <h2>{ isMobileResponsive && <i onClick={() => setResponsiveToggle(prev => !prev)} className="fa-solid fa-bars"></i> } { navbarTitle }</h2>

        <button>Logout</button>
      </div>
    </header>
  );
}