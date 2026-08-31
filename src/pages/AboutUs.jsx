import { useLayoutEffect, useState } from "react";

import api from "../api/axios";
import { Loader } from "../components/Loader";



export const AboutUs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [aboutUsForm, setAboutUsForm] = useState({
        heroSubHeading: "",
        heroHeading: "",
        heroDescription: "",
        heroImage: "",
        whoWeAreSubHeading: "",
        whoWeAreHeading: "",
        whoWeAreDescription: "",
        whoWeAreCards: [
            {
                icon: "",
                title: ""
            }
        ],
        whatWeDoSubHeading: "",
        whatWeDoHeading: "",
        whatWeDoDescription: "",
        whatWeDoCards: [
            {
                icon: "",
                title: "",
                description: ""
            }
        ],
        ourMissionSubHeading: "",
        ourMissionHeading: "",
        ourMissionDescription: "",
        ourMissionStats: [
            {
                stat: "",
                label: ""
            }
        ]
    });

    useLayoutEffect(() => {
        const fetchAboutUsPage = async () => {
            try {
                setIsLoading(true);

                const response = await api.get("/aboutPage");

                setAboutUsForm(response?.data?.data?.aboutPage);

                console.log(response?.data?.data?.aboutPage);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAboutUsPage();
    }, []);

    const handleChange = (e, arrayName = null, index) => {
        const { name, value } = e.target;

        if (arrayName !== null) {
            setAboutUsForm((prev) => ({
                ...prev,
                [arrayName]: prev[arrayName].map((item, i) => (
                    (i === index) ? { ...item, [name]: value } : item
                ))
            }))
        } else {
            setAboutUsForm({
                ...aboutUsForm,
                [name]: value
            });
        }
    };

    const addWhoWeAreHandler = () => {
        setAboutUsForm((prev) => ({
            ...prev,
            whoWeAreCards: [
                ...prev.whoWeAreCards,
                {
                    icon: "",
                    title: ""
                }
            ]
        }))
    };

    const deleteWhoWeAreCardHandler = (i) => {
        setAboutUsForm((prev) => ({
            ...prev,
            whoWeAreCards: prev.whoWeAreCards?.filter((_, whoWeAreCardIndex) => whoWeAreCardIndex !== i)
        }));
    };

    const addWhatWeDoHandler = () => {
        setAboutUsForm((prev) => ({
            ...prev,
            whatWeDoCards: [
                ...prev.whatWeDoCards,
                {
                    icon: "",
                    title: "",
                    description: ""
                }
            ]
        }));
    };

    const deleteWhatWeDoCardHandler = (i) => {
        setAboutUsForm((prev) => ({
            ...prev,
            whatWeDoCards: prev.whatWeDoCards?.filter((_, whatWeDoCardIndex) => whatWeDoCardIndex !== i)
        }));
    };

    const addNewStatHandler = () => {
        setAboutUsForm((prev) => ({
            ...prev,
            ourMissionStats: [
                ...prev.ourMissionStats,
                {
                    stat: "",
                    label: ""
                }
            ]
        }));
    };

    const deleteOurMissionStatHandler = (i) => {
        setAboutUsForm((prev) => ({
            ...prev,
            ourMissionStats: prev.ourMissionStats?.filter((_, ourMissionStatIndex) => ourMissionStatIndex !== i)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            await api.patch("/aboutPage", aboutUsForm);
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
                <form onSubmit={handleSubmit}>

                    {/* HERO SECTION */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2 className="mb-0">Hero Section</h2>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Hero Sub Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.heroSubHeading}
                                    onChange={handleChange}
                                    name="heroSubHeading"
                                    className="form-control"
                                    placeholder="Enter hero sub heading"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Hero Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.heroHeading}
                                    onChange={handleChange}
                                    name="heroHeading"
                                    className="form-control"
                                    placeholder="Enter hero heading"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Hero Description</label>
                                <textarea
                                    name="heroDescription"
                                    className="form-control"
                                    value={aboutUsForm.heroDescription}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Enter hero description"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Hero Image</label>
                                <input
                                    type="text"
                                    name="heroImage"
                                    value={aboutUsForm.heroImage}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter hero image"
                                />
                            </div>

                        </div>
                    </div>


                    {/* WHO WE ARE SECTION */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2 className="mb-0">Who We Are</h2>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Sub Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.whoWeAreSubHeading}
                                    onChange={handleChange}
                                    name="whoWeAreSubHeading"
                                    className="form-control"
                                    placeholder="Enter sub heading"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.whoWeAreHeading}
                                    onChange={handleChange}
                                    name="whoWeAreHeading"
                                    className="form-control"
                                    placeholder="Enter heading"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="whoWeAreDescription"
                                    value={aboutUsForm.whoWeAreDescription}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="5"
                                    placeholder="Enter description"
                                />
                            </div>


                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h3 className="mb-0">Who We Are Cards</h3>

                                <button type="button" className="btn btn-primary" onClick={addWhoWeAreHandler}>Add +</button>
                            </div>

                            {/* CARD 1 */}
                            {aboutUsForm?.whoWeAreCards?.map((whoWeAreCard, index) => (
                                <div className="border rounded p-3 mb-3" key={index}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="mb-0">Card {index + 1}</h5>

                                        {(aboutUsForm?.whoWeAreCards.length > 1) && <button type="button" onClick={() => deleteWhoWeAreCardHandler(index)} className="btn btn-danger">Delete</button>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Icon</label>

                                        <input
                                            type="text"
                                            value={whoWeAreCard?.icon}
                                            onChange={(e) => handleChange(e, "whoWeAreCards", index)}
                                            name="icon"
                                            className="form-control"
                                            placeholder="Enter icon"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            value={whoWeAreCard?.title}
                                            onChange={(e) => handleChange(e, "whoWeAreCards", index)}
                                            name="title"
                                            className="form-control"
                                            placeholder="Enter title"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* WHAT WE DO SECTION */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2 className="mb-0">What We Do</h2>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Sub Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.whatWeDoSubHeading}
                                    onChange={handleChange}
                                    name="whatWeDoSubHeading"
                                    className="form-control"
                                    placeholder="Enter sub heading"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.whatWeDoHeading}
                                    onChange={handleChange}
                                    name="whatWeDoHeading"
                                    className="form-control"
                                    placeholder="Enter heading"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="whatWeDoDescription"
                                    value={aboutUsForm.whatWeDoDescription}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter description"
                                />
                            </div>


                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h3 className="mb-0">What We Do Cards</h3>

                                <button type="button" onClick={addWhatWeDoHandler} className="btn btn-primary">Add +</button>
                            </div>

                            {aboutUsForm?.whatWeDoCards?.map((whatWeDoCard, index) => (
                                <div className="border rounded p-3 mb-3" key={index}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="mb-0">Card {index + 1}</h5>

                                        {(aboutUsForm?.whatWeDoCards?.length > 1) && <button type="button" onClick={() => deleteWhatWeDoCardHandler(index)} className="btn btn-danger">Delete</button>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Icon</label>
                                        <input
                                            type="text"
                                            value={whatWeDoCard?.icon}
                                            onChange={(e) => handleChange(e, "whatWeDoCards", index)}
                                            name="icon"
                                            className="form-control"
                                            placeholder="Enter icon"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            value={whatWeDoCard?.title}
                                            onChange={(e) => handleChange(e, "whatWeDoCards", index)}
                                            name="title"
                                            className="form-control"
                                            placeholder="Enter title"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            value={whatWeDoCard?.description}
                                            onChange={(e) => handleChange(e, "whatWeDoCards", index)}
                                            className="form-control"
                                            rows="3"
                                            placeholder="Enter description"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* OUR MISSION SECTION */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h2 className="mb-0">Our Mission</h2>
                        </div>

                        <div className="card-body">

                            <div className="mb-3">
                                <label className="form-label">Sub Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.ourMissionSubHeading}
                                    onChange={handleChange}
                                    name="ourMissionSubHeading"
                                    className="form-control"
                                    placeholder="Enter sub heading"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Heading</label>
                                <input
                                    type="text"
                                    value={aboutUsForm.ourMissionHeading}
                                    onChange={handleChange}
                                    name="ourMissionHeading"
                                    className="form-control"
                                    placeholder="Enter heading"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="ourMissionDescription"
                                    value={aboutUsForm.ourMissionDescription}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows="5"
                                    placeholder="Enter description"
                                />
                            </div>


                            {/* MISSION STATS */}

                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h3 className="mb-0">Mission Statistics</h3>

                                <button type="button" onClick={addNewStatHandler} className="btn btn-primary">Add New Stat +</button>
                            </div>


                            {aboutUsForm?.ourMissionStats?.map((ourMissionStat, index) => (
                                <div className="border rounded p-3 mb-3" key={index}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h5 className="mb-0">Statistic {index + 1}</h5>

                                        {(aboutUsForm?.ourMissionStats?.length > 1) && <button type="button" onClick={() => deleteOurMissionStatHandler(index)} className="btn btn-danger">Delete</button>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Stat</label>
                                        <input
                                            type="text"
                                            value={ourMissionStat?.stat}
                                            onChange={(e) => handleChange(e, "ourMissionStats", index)}
                                            name="stat"
                                            className="form-control"
                                            placeholder="Enter stat"
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Label</label>
                                        <input
                                            type="text"
                                            value={ourMissionStat?.label}
                                            onChange={(e) => handleChange(e, "ourMissionStats", index)}
                                            name="label"
                                            className="form-control"
                                            placeholder="Enter label"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* SUBMIT */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary px-4">
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}