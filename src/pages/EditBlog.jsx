import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export const EditBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [blogCategories, setBlogCategories] = useState([]);
    const [imageBaseUrl, setImageBaseUrl] = useState("");
    const [blog, setBlog] = useState({        
        blogCategory: "",
        blogTitle: "",
        blogSlug: "",
        image: null,
        blogDescription: "",
        blogKeyTakeways: [""]
    });
    const [updateNewImage, setUpdateNewImage] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);

                const response = await api.get(`/blogs/${id}`);

                setBlog(response?.data?.data?.blog);
                setImageBaseUrl(response?.data?.imageBaseUrl);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, []);

    const handleAddTakeaway = () => {
        setBlog(prev => ({
            ...prev,
            blogKeyTakeways: [...prev.blogKeyTakeways, ""]
        }))
    };

    const handleChange = (e, arrayName = null, index) => {
        const { name, value } = e.target;

        if (arrayName !== null) {
            setBlog((prev) => ({
                ...prev,
                blogKeyTakeways: prev.blogKeyTakeways.map((blogKeyTakeway, i) => (
                    (i === index) ? value : blogKeyTakeway
                ))
            }));
        } else {
            setBlog({
                ...blog,
                [name]: value
            })
        }        
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const formData = new FormData();

            formData.append("blogCategory", blog.blogCategory);
            formData.append("blogTitle", blog.blogTitle);
            formData.append("blogSlug", blog.blogSlug);
            formData.append("blogDescription", blog.blogDescription);

            formData.append("blogKeyTakeways", JSON.stringify(blog.blogKeyTakeways));

            formData.append("image", updateNewImage);

            await api.patch(`/blogs/${id}`, formData);

            console.log(formData, "hi")
            
            navigate(-1);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(blog);



    return (
        <>
            {isLoading && <Loader />}

            <div className="container py-4">
                <form onSubmit={handleEdit}>
                    <h3 className="mb-4">Edit Blog</h3>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>

                        <select onChange={handleChange} className="form-select" name="blogCategory" id="">
                            <option value={blog?.blogCategory}>{blog?.blogCategory}</option>

                            {blogCategories
                                .filter((blogCategory) => blogCategory?.category?.toLowerCase() !== blog?.blogCategory?.toLocaleLowerCase())
                                .map((blogCategory) => (
                                    <option key={blogCategory?._id} value={blogCategory?.category}>{blogCategory?.category}</option>
                                ))
                            }
                        </select>
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
                    <div className="mb-3">
                        <label className="form-label">Slug</label>
                        <input
                            type="text"
                            className="form-control"
                            name="slug"
                            value={blog?.blogSlug}
                            onChange={handleChange}
                            placeholder="how-ai-is-changing-the-future"
                        />
                    </div>

                    {/* Featured Image */}
                    <div className="mb-3">
                        <label className="form-label">Featured Image</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setUpdateNewImage(e.target.files[0])}
                            name="image"
                        />

                        <img
                            src={`${imageBaseUrl}/${blog?.image}`}
                            alt=""
                            width="150"
                            className="rounded mt-3"
                        />
                    </div>

                    {/* Key Takeaways */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <label className="form-label mb-0">
                                Key Takeaways
                            </label>

                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={handleAddTakeaway}
                            >
                                + Add Takeaway
                            </button>
                        </div>

                        {blog?.blogKeyTakeways.map((blogKeyTakeway, index) => (
                            <div className="input-group mb-2" key={index}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="keyTakeaways"
                                    value={blogKeyTakeway}
                                    onChange={(e) => handleChange(e, "blogKeyTakeways", index)}
                                    placeholder="AI automates repetitive tasks."
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

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