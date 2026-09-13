import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export const EditBlogCategory = () => {
    const navigate = useNavigate();

    const [blgCategoryForm, setBlogCategoryForm] = useState({
        category: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    const handleChange = (e) => {
        setBlogCategoryForm({
            category: e.target.value
        });
    };

    useEffect(() => {
        if (!id) return;

        const fetchBlogCategory = async () => {
            try {
                setIsLoading(true);

                const response = await api.get(`/blog_category/${id}`);

                setBlogCategoryForm(response?.data?.data?.blogCategory);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            if (id) {
                await api.patch(`/blog_category/${id}`, blgCategoryForm);
            } else {
                await api.post("/blog_category", blgCategoryForm);  
            }

            navigate(-1);
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