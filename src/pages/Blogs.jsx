import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { formatDate } from "../hooks/useFormattedDate";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [blogDeleteAlert, setBlogDeleteAlert] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true);

                const response = await api.get("/blogs");

                setBlogs(response?.data?.data?.blogs);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const deleteBlogHandler = async (id) => {
        try {
            setIsLoading(true);

            await api.delete(`/blogs/${id}`);

            setBlogs((prev) => prev.filter((blog) => blog._id !== id))
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            {isLoading && <Loader />}

            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0">All Blogs</h3>

                    <Link to="/create-blog">
                        <button className="btn btn-primary">
                            + Create Blog
                        </button>
                    </Link>
                </div>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Author</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {blogs?.map((blog, index) => (
                                        <tr key={blog?._id}>

                                            <td>{index + 1}</td>

                                            <td>
                                                {/* <img
                                                src={blog?.image}
                                                alt={blog?.blogTitle}
                                                width="80"
                                                height="50"
                                                className="rounded object-fit-cover"
                                            /> */}
                                            </td>

                                            <td>
                                                <div className="fw-semibold">
                                                    {blog?.blogTitle}
                                                </div>

                                                <small className="text-muted">
                                                    8 min read
                                                </small>
                                            </td>

                                            <td>
                                                {blog?.blogCategory}
                                            </td>

                                            <td>
                                                Admin
                                            </td>

                                            <td>
                                                {formatDate(blog?.blogPostDate)}
                                            </td>

                                            <td>
                                                <span className="badge bg-success">
                                                    Published
                                                </span>
                                            </td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link to={`/blogs/${blog?._id}`}>
                                                        <button className="btn btn-sm btn-outline-primary">
                                                            Edit
                                                        </button>
                                                    </Link>

                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        onClick={() => setBlogDeleteAlert(blog?._id)}
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
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
                            {blogs
                                .filter((blog) => blog?._id === blogDeleteAlert)
                                .map((blog) => (
                                    <h5 className="mb-0">
                                        Are you sure you want to delete this blog? - <br /> <em><b>"{blog?.blogTitle}"</b></em>
                                    </h5>
                                ))
                            }
                        </div>

                        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            
                            <button onClick={() => deleteBlogHandler(blogDeleteAlert)} type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
