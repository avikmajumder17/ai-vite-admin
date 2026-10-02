import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";
import { PageLoader } from "../components/PageLoader";



export async function loader({ params }) {
    if (!params.id) {
        return {
            blogCategoriesData: null
        }
    }

    try {
        const response = await api.get(`/blog_category/${params.id}`);

        const blogCategories = response?.data?.data?.blogCategory;

        return {
            blogCategoriesData: blogCategories
        }
    } catch (err) {
        console.log(err);

        throw new Response("Failed to load blog categories", { status: 500 });
    }
};

const EditBlogCategory = () => {
    const { blogCategoriesData } = useLoaderData();
    const navigate = useNavigate();

    const [blgCategoryForm, setBlogCategoryForm] = useState({
        category: "",
        ...blogCategoriesData
    });
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const handleChange = (e) => {
        setBlogCategoryForm({
            category: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            if (id) {
                await api.patch(`/blog_category/${id}`, blgCategoryForm);

                toast.success("Blog category successfully updated");
            } else {
                await api.post("/blog_category", blgCategoryForm);  

                toast.success("Blog category submission successful");
            }

            navigate(-1);
        } catch (err) {
            console.log(err);

            toast.error(err?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            {isLoading && <PageLoader />}

            <div className="container py-4">

                <div className="row justify-content-center">

                    <div className="col-md-8 col-lg-6">

                        <div className="card shadow-sm">

                            <div className="card-body p-4">

                                <h2 className="mb-4">
                                    {id ? "Edit" : "Add"} Blog Category
                                </h2>

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label
                                            htmlFor="category"
                                            className="form-label"
                                        >
                                            Category
                                        </label>

                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={blgCategoryForm?.category}
                                            placeholder="Type a category"
                                        />

                                    </div>

                                    <div className="d-flex gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            {id ? "Save Changes" : "Add Category"}
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => navigate(-1)}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default EditBlogCategory;