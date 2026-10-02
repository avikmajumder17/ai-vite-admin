import { useEffect, useState } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";



const Root = () => {
    const [responsiveToggle, setResponsiveToggle] = useState(false);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.js");
    }, []);

    const pathName = useLocation().pathname;

    const navNotIncluded = pathName.includes("/login");

    useEffect(() => {
        //eslint-disable-next-line
        setResponsiveToggle(false);
    }, [pathName]);



    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css" integrity="sha512-QeR2VH+lsBE5LSAe1Q5EnTBbe7XTBubt8dG93Y7gidSgdMCr8nVqKcfKAMyN96SV8KDbZVTDXChatu5G2KQGzg==" crossorigin="anonymous" referrerpolicy="no-referrer"></link>
                <Meta />
                <Links />
            </head>
            <body suppressHydrationWarning>
                <ToastContainer position="top-right" autoClose={3000} />

                <div className="app">
                    {!navNotIncluded && <Sidebar responsiveToggle={responsiveToggle} setResponsiveToggle={setResponsiveToggle} />}

                    <div className="main">
                        {!navNotIncluded && <Navbar setResponsiveToggle={setResponsiveToggle} />}

                        <div className={`content ${navNotIncluded ? "p-0" : ""}`}>
                            <Outlet />
                        </div>                    
                    </div>    
                </div>                

                <ScrollRestoration />

                <Scripts />
            </body>
        </html>
    )
}

export default Root;