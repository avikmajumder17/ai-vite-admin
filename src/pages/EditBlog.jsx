import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export const EditBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [blog, setBlog] = useState({
        image: "",
        blogCategory: "",
        blogTitle: "",
        blogDescription: ""
    });

    const { id } = useParams();


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);

                setBlog(response?.data?.data?.blog);
            } catch (err) {
                console.log(err);
            } finally {
                console.log("Blog fetched successfully");
            }
        };

        fetchBlog();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBlog({
            ...blog,
            [name]: value
        })
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await api.patch(`/blogs/${id}`, blog);

            console.log(response);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(blog, "hi");



    return (
        <>
            {isLoading && <Loader />}

            <div className="container py-4">
                <form onSubmit={handleEdit}>
                    <h3 className="mb-4">Edit Blog</h3>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            name="blogCategory"
                            value={blog?.blogCategory}
                            onChange={handleChange}
                            placeholder="Artificial Intelligence"
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                        <label className="form-label">Blog Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="blogTitle"
                            value={blog?.blogTitle}
                            onChange={handleChange}
                            placeholder="How AI is Changing the Future"
                        />
                    </div>

                    {/* Slug */}
                    {/* <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                        type="text"
                        className="form-control"
                        name="slug"
                        onChange={handleChange}
                        placeholder="how-ai-is-changing-the-future"
                    />
                </div> */}

                    {/* Featured Image */}
                    {/* <div className="mb-3">
                    <label className="form-label">Featured Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleChange}
                        name="image"
                    />
                </div> */}

                    <div className="row">

                        {/* Author */}
                        {/* <div className="col-md-4 mb-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            name="author"
                            onChange={handleChange}
                            placeholder="Admin"
                        />
                    </div> */}

                        {/* Published Date */}
                        {/* <div className="col-md-4 mb-3">
                        <label className="form-label">Published Date</label>
                        <input
                            type="date"
                            className="form-control"
                            onChange={handleChange}
                            name="publishedDate"
                        />
                    </div> */}

                        {/* Read Time */}
                        {/* <div className="col-md-4 mb-3">
                        <label className="form-label">Read Time</label>
                        <input
                            type="text"
                            className="form-control"
                            name="readTime"
                            onChange={handleChange}
                            placeholder="8 min read"
                        />
                    </div> */}
                    </div>

                    {/* Key Takeaways */}
                    {/* <div className="mb-4">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <label className="form-label mb-0">
                            Key Takeaways
                        </label>

                        <button
                            type="button"
                            className="btn btn-primary btn-sm"
                        >
                            + Add Takeaway
                        </button>
                    </div>

                    <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            name="keyTakeaways"
                            placeholder="AI automates repetitive tasks."
                        />

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                        >
                            Remove
                        </button>
                    </div>

                </div> */}

                    {/* Blog Content */}
                    <div className="mb-4">
                        <label className="form-label">Blog Content</label>

                        <textarea
                            className="form-control"
                            rows="12"
                            name="blogDescription"
                            value={blog?.blogDescription}
                            onChange={handleChange}
                            placeholder="Write your complete blog content here..."
                        />
                    </div>

                    {/* Status */}
                    {/* <div className="mb-4">
                    <label className="form-label">Status</label>

                    <select
                        className="form-select"
                        name="status"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div> */}

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </>
    )
}