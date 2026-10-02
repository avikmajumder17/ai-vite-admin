import { route, index } from "@react-router/dev/routes";



export default [
    index("pages/Homepage.jsx"),
    route("about-us", "pages/AboutUs.jsx"),
    route("blogs", "pages/Blogs.jsx"),
    route("blogs/:id", "pages/EditBlog.jsx"),
    route("create-blog", "pages/CreateABlog.jsx"),
    route("blog-categories", "pages/BlogCategories.jsx"),
    route("add-blog-category", "pages/EditBlogCategory.jsx", { id: "add-blog-category" }),
    route("blog-categories/:id", "pages/EditBlogCategory.jsx", { id: "edit-blog-category" }),
    route("login", "pages/Login.jsx")
];