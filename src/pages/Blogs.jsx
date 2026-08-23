import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import { formatDate } from "../hooks/useFormattedDate";



export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get("/blogs");

                setBlogs(response?.data?.data?.blogs);
            } catch (err) {
                console.log(err);
            } finally {
                console.log("All blogs fetched!");
            }
        };

        fetchBlogs();
    }, []);



    return (
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

                                                <button className="btn btn-sm btn-outline-danger">
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
    )
}
