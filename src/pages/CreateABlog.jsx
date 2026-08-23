import { useState } from "react";

import api from "../api/axios";



export default function CreateABlog() {
    const [blogData, setBlogData] = useState({
        image: "",
        blogCategory: "",
        blogTitle: "",
        blogDescription: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBlogData({
            ...blogData,
            [name]: value,
        })
    };

    const submitBlogData = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/blogs", blogData);

            console.log(response.data.data);            
        } catch (err) {
            console.log(err);
        } finally {
            console.log("Blog submission successful!");
        }
    };    



    return (
        <div className="container py-4">
            <form onSubmit={submitBlogData}>
                <h3 className="mb-4">Create Blog</h3>

                {/* Category */}
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        name="blogCategory"
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
    )
}
