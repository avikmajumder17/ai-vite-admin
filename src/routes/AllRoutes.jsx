import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Blogs from "../pages/Blogs";
import CreateABlog from "../pages/CreateABlog";
import { EditBlog } from "../pages/EditBlog";
import { AboutUs } from "../pages/AboutUs";
import { Login } from "../pages/Login";
import { BlogCategories } from "../pages/BlogCategories";
import { EditBlogCategory } from "../pages/EditBlogCategory";



export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />            

            <Route path="/about-us" element={<AboutUs />} />

            <Route path="/blogs" element={<Blogs />} />

            <Route path="/blogs/:id" element={<EditBlog />} />

            <Route path="/create-blog" element={<CreateABlog />} />

            <Route path="/blog-categories" element={<BlogCategories />} />

            <Route path="/add-blog-category" element={<EditBlogCategory />} />

            <Route path="/blog-categories/:id" element={<EditBlogCategory />} />

            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
