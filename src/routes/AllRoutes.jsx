import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Blogs from "../pages/Blogs";
import CreateABlog from "../pages/CreateABlog";
import { EditBlog } from "../pages/EditBlog";
import { AboutUs } from "../pages/AboutUs";



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="/about-us" element={<AboutUs />} />

            <Route path="/blogs" element={<Blogs />} />

            <Route path="/blogs/:id" element={<EditBlog />} />

            <Route path="/create-blog" element={<CreateABlog />} />
        </Routes>
    )
}
