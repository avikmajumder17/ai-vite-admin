import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export const BlogCategories = () => {
    const [blogCategories, setBlogCategories] = useState([]);
    const [blogCategoryDeleteAlert, setBlogCategoryDeleteAlert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);    

    const deleteCategoryHandler = async (id) => {
        try {
            setIsLoading(true);

            await api.delete(`/blog_category/${id}`);

            setBlogCategories(prev => (
                prev?.filter(ctgy => ctgy._id !== id)
            ));
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchBlogCategories = async () => {
            try {
                setIsLoading(true);

                const response = await api.get("/blog_category");

                setBlogCategories(response?.data?.data?.blogCategory);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogCategories();
    }, []);



    return (
        <>
            {isLoading && <Loader />}

            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Blog Categories</h2>

                    <Link to="/add-blog-category">
                        <button className="btn btn-primary">
                            Add Category
                        </button>
                    </Link>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: "10%" }}>#</th>
                                        <th>Category</th>
                                        <th style={{ width: "20%" }}>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {blogCategories?.map((blogCategory, index) => (
                                        <tr key={blogCategory?._id}>
                                            <td>{index + 1}</td>
                                            <td>{blogCategory?.category}</td>
                                            <td>
                                                <Link to={`/blog-categories/${blogCategory?._id}`}>
                                                    <button className="btn btn-sm btn-warning me-2">
                                                        Edit
                                                    </button>
                                                </Link>

                                                <button
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal" 
                                                    onClick={() => setBlogCategoryDeleteAlert(blogCategory?._id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header border-bottom-0">
                            <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                            
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body text-center">
                            {blogCategories
                                .filter((blogCategory) => blogCategory?._id === blogCategoryDeleteAlert)
                                .map((blogCategory) => (
                                    <h5 className="mb-0">
                                        Do you want to delete the blog category? - <br /> <em><b>"{blogCategory?.category}"</b></em>
                                    </h5>
                                ))
                            }
                        </div>

                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            
                            <button onClick={() => deleteCategoryHandler(blogCategoryDeleteAlert)} type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}