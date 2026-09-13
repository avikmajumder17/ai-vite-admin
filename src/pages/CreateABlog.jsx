import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export default function CreateABlog() {
    const [blogData, setBlogData] = useState({
        image: "",
        blogCategory: "",
        blogTitle: "",
        blogDescription: "",
        blogKeyTakeways: [""]
    });
    const [blogCategories, setBlogCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleAddTakeaway = () => {
        setBlogData(prev => ({
            ...prev,
            blogKeyTakeways: [...prev.blogKeyTakeways, ""]
        }))
    };

    const handleRemoveTakeways = (takeawayIndex) => {
        setBlogData(prev => ({
            ...prev,
            blogKeyTakeways: prev.blogKeyTakeways.filter(
                (_, index) => takeawayIndex !== index
            )
        }));
    };

    const handleChange = (e, arrayName = null, index) => {
        const { name, value } = e.target;

        if (arrayName !== null) {
            setBlogData((prev) => ({
                ...prev,
                [arrayName]: prev.blogKeyTakeways.map((item, i) => 
                    (i === index) ? value : item
                )
            }));
        } else {
            setBlogData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    };

    const submitBlogData = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            await api.post("/blogs", blogData);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);

            navigate(-1);
        }
    };

    console.log(blogData);



    return (
        <>
            {isLoading && <Loader />}

            <div className="container py-4">
                <form onSubmit={submitBlogData}>
                    <h3 className="mb-4">Create Blog</h3>

                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        {/* <input
                        type="text"
                        className="form-control"
                        name="blogCategory"
                        onChange={handleChange}
                        placeholder="Artificial Intelligence"
                    /> */}

                        <select className="form-select" name="blogCategory" onChange={handleChange}>
                            <option>Choose a category</option>
                            {blogCategories?.map((blogCategory) => (
                                <option
                                    value={blogCategory?.category}
                                    key={blogCategory?._id}
                                >
                                    {blogCategory?.category}
                                </option>
                            ))}
                        </select>
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

                        {blogData?.blogKeyTakeways?.map((_, index) => (
                            <div className="input-group mb-2" key={index}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="blogKeyTakeways"
                                    onChange={(e) => handleChange(e, "blogKeyTakeways", index)}
                                    placeholder="AI automates repetitive tasks."
                                />

                                {blogData?.blogKeyTakeways?.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTakeways(index)}
                                        className="btn btn-outline-danger"
                                    >
                                        Remove
                                    </button>
                                )}
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
