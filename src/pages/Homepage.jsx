import { useLayoutEffect, useState } from "react";

import api from "../api/axios";

import DashboardCard from "../components/DashboardCard";
import { Loader } from "../components/Loader";



export default function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    heroSubHeading: "",
    heroHeading: "",
    heroDescription: "",
    heroRatingLeft: "",
    heroRatingRight: "",
    coreSubHeading: "",
    coreHeading: "",
    coreCapabilities: [
      {
        icon: "",
        title: "",
        description: ""
      },
      {
        icon: "",
        title: "",
        description: ""
      },
      {
        icon: "",
        title: "",
        description: ""
      }
    ],
    codeIntegrationSubHeading: "",
    codeIntegrationHeading: "",
    codeIntegrationDescription: "",
    codeIntegrationSteps: [
      {
        stepCount: "",
        title: "",
        description: ""
      },
      {
        stepCount: "",
        title: "",
        description: ""
      },
      {
        stepCount: "",
        title: "",
        description: ""
      }
    ],
    codeIntegrationSample: "",
    stats: [
      {
        value: "",
        unit: "",
        label: ""
      },
      {
        value: "",
        unit: "",
        label: ""
      },
      {
        value: "",
        unit: "",
        label: ""
      }
    ],
    pricingSubHeading: "",
    pricingHeading: "",
    pricingPlans: [
      {
        planName: "",
        planPurpose: "",
        price: "",
        duration: "",
        planDetails: [""],
        ctaButton: ""
      }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();    

    try {
      setIsLoading(true);

      const response = await api.patch("/homepage", formData);

      console.log(response, "hi");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    const fetchHomePage = async () => {
      try {
        setIsLoading(true);

        const response = await api.get("/homepage");

        const homePage = response.data.data.homePage;

        if (!homePage?.pricingPlans?.length) {
          homePage.pricingPlans = [
            {
              planName: "",
              planPurpose: "",
              price: "",
              duration: "",
              planDetails: [""],
              ctaButton: ""
            }
          ]
        }

        setFormData(homePage);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomePage();
  }, []);


  const handleChange = (e, arrayName = null, index = null, nestedArray = null, nestedIndex = null) => {
    const { name, value } = e.target;

    if (nestedArray !== null) {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, i) => (
          (i === index) ? {
            ...item,
            [nestedArray]: item[nestedArray].map((nestedItem, j) => (
              (j === nestedIndex) ? value : nestedItem
            ))
          }
          : item
        ))
      }))
    } else if (index !== null) {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, i) => (
          (i === index) ? { ...item, [name]: value } : item
        ))
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleAddPlan = () => {
    setFormData((prev) => ({
      ...prev,
      pricingPlans: [
        ...prev.pricingPlans,
        {
          planName: "",
          planPurpose: "",
          price: "",
          duration: "",
          planDetails: [""],
          ctaButton: ""
        }
      ]
    }))
  };


  const handleRemovePlan = (id) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.filter(plan => plan._id !== id)
    }))
  };

  const handleAddFeature = (planId) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.map(plan => 
      (plan._id === planId) ? 
        {
          ...plan,
          planDetails: [...plan.planDetails, ""]
        }
        : plan
      )
    }))
  };

  const handleRemovePlanDetail = (planId, detailIndex) => {
    setFormData(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.map(pricingPlan => 
      (pricingPlan._id === planId) ? 
        {
          ...pricingPlan,
          planDetails: pricingPlan.planDetails.filter(
            (_, index) => index !== detailIndex
          ) 
        }
        : pricingPlan
      )
    }))
  };



  return (
    <>
      {isLoading && <Loader />}

      <div className="page">
        <div className="cards">
          <DashboardCard
            title="Homepage Sections"
            value="8"
          />

          <DashboardCard
            title="Testimonials"
            value="12"
          />

          <DashboardCard
            title="Pricing Plans"
            value="3"
          />

          <DashboardCard
            title="FAQs"
            value="10"
          />

        </div>

        <h2 style={{ marginTop: 40 }}>
          Homepage Sections
        </h2>

        <div className="sdgdhgsfdf">
          <form className="row" onSubmit={handleSubmit}>

            {/* Hero Section */}
            <div className="col-lg-12 mb-3">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="heroSubHeading"
                    value={formData.heroSubHeading}
                    className="form-control"
                    placeholder="Hero Sub Heading"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="heroHeading"
                    value={formData.heroHeading}
                    className="form-control"
                    placeholder="Hero Heading"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mb-3">
                  <textarea
                    name="heroDescription"
                    value={formData.heroDescription}
                    className="form-control"
                    rows="3"
                    onChange={handleChange}
                    placeholder="Hero Description"
                  ></textarea>
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="heroRatingLeft"
                    value={formData.heroRatingLeft}
                    className="form-control"
                    placeholder="Hero Rating Left"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    name="heroRatingRight"
                    value={formData.heroRatingRight}
                    className="form-control"
                    placeholder="Hero Rating Right"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Core Section */}
            <div className="col-lg-12 mb-3">
              <div className="row">
                <div className="col-12 mb-3">
                  <h4>Core Section</h4>
                </div>

                <div className="col-md-6 mb-3">
                  <input value={formData.coreSubHeading} onChange={handleChange} name="coreSubHeading" type="text" className="form-control" placeholder="Core Sub Heading" />
                </div>

                <div className="col-md-6 mb-3">
                  <input value={formData.coreHeading} onChange={handleChange} name="coreHeading" type="text" className="form-control" placeholder="Core Heading" />
                </div>

                <div className="col-lg-12 mb-3">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input value={formData.coreCapabilities[0].icon} onChange={(e) => handleChange(e, "coreCapabilities", 0)} name="icon" type="text" className="form-control" placeholder="Icon 1" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <input value={formData.coreCapabilities[0].title} onChange={(e) => handleChange(e, "coreCapabilities", 0)} name="title" type="text" className="form-control" placeholder="Title 1" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <textarea value={formData.coreCapabilities[0].description} onChange={(e) => handleChange(e, "coreCapabilities", 0)} name="description" className="form-control" rows="1" placeholder="Description 1"></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mb-3">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input value={formData.coreCapabilities[1].icon} onChange={(e) => handleChange(e, "coreCapabilities", 1)} name="icon" type="text" className="form-control" placeholder="Icon 2" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <input value={formData.coreCapabilities[1].title} onChange={(e) => handleChange(e, "coreCapabilities", 1)} name="title" type="text" className="form-control" placeholder="Title 2" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <textarea value={formData.coreCapabilities[1].description} onChange={(e) => handleChange(e, "coreCapabilities", 1)} name="description" className="form-control" rows="1" placeholder="Description 2"></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mb-3">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input value={formData.coreCapabilities[2].icon} onChange={(e) => handleChange(e, "coreCapabilities", 2)} name="icon" type="text" className="form-control" placeholder="Icon 3" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <input value={formData.coreCapabilities[2].title} onChange={(e) => handleChange(e, "coreCapabilities", 2)} name="title" type="text" className="form-control" placeholder="Title 3" />
                    </div>

                    <div className="col-md-4 mb-3">
                      <textarea value={formData.coreCapabilities[2].description} onChange={(e) => handleChange(e, "coreCapabilities", 2)} name="description" className="form-control" rows="1" placeholder="Description 3"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Code Integration */}
            <div className="col-12 mt-4 mb-3">
              <h4>Code Integration</h4>
            </div>

            <div className="col-md-6 mb-3">
              <input value={formData.codeIntegrationSubHeading} onChange={handleChange} name="codeIntegrationSubHeading" type="text" className="form-control" placeholder="Code Integration Sub Heading" />
            </div>

            <div className="col-md-6 mb-3">
              <input value={formData.codeIntegrationHeading} onChange={handleChange} name="codeIntegrationHeading" type="text" className="form-control" placeholder="Code Integration Heading" />
            </div>

            <div className="col-12 mb-3">
              <textarea value={formData.codeIntegrationDescription} onChange={handleChange} name="codeIntegrationDescription" className="form-control" rows="3" placeholder="Code Integration Description"></textarea>
            </div>

            {/* Code Integration Step */}
            <div className="col-md-2 mb-3">
              <input value={formData.codeIntegrationSteps[0].stepCount} onChange={(e) => handleChange(e, "codeIntegrationSteps", 0)} name="stepCount" type="number" className="form-control" placeholder="Step Count" />
            </div>

            <div className="col-md-5 mb-3">
              <input value={formData.codeIntegrationSteps[0].title} onChange={(e) => handleChange(e, "codeIntegrationSteps", 0)} name="title" type="text" className="form-control" placeholder="Step Title" />
            </div>

            <div className="col-md-5 mb-3">
              <textarea value={formData.codeIntegrationSteps[0].description} onChange={(e) => handleChange(e, "codeIntegrationSteps", 0)} name="description" className="form-control" rows="1" placeholder="Step Description"></textarea>
            </div>

            <div className="col-md-2 mb-3">
              <input value={formData.codeIntegrationSteps[1].stepCount} onChange={(e) => handleChange(e, "codeIntegrationSteps", 1)} name="stepCount" type="number" className="form-control" placeholder="Step Count" />
            </div>

            <div className="col-md-5 mb-3">
              <input value={formData.codeIntegrationSteps[1].title} onChange={(e) => handleChange(e, "codeIntegrationSteps", 1)} name="title" type="text" className="form-control" placeholder="Step Title" />
            </div>

            <div className="col-md-5 mb-3">
              <textarea value={formData.codeIntegrationSteps[1].description} onChange={(e) => handleChange(e, "codeIntegrationSteps", 1)} name="description" className="form-control" rows="1" placeholder="Step Description"></textarea>
            </div>

            <div className="col-md-2 mb-3">
              <input value={formData.codeIntegrationSteps[2].stepCount} onChange={(e) => handleChange(e, "codeIntegrationSteps", 2)} name="stepCount" type="number" className="form-control" placeholder="Step Count" />
            </div>

            <div className="col-md-5 mb-3">
              <input value={formData.codeIntegrationSteps[2].title} onChange={(e) => handleChange(e, "codeIntegrationSteps", 2)} name="title" type="text" className="form-control" placeholder="Step Title" />
            </div>

            <div className="col-md-5 mb-3">
              <textarea value={formData.codeIntegrationSteps[2].description} onChange={(e) => handleChange(e, "codeIntegrationSteps", 2)} name="description" className="form-control" rows="1" placeholder="Step Description"></textarea>
            </div>

            <div className="col-12 mb-3">
              <textarea value={formData.codeIntegrationSample} onChange={handleChange} name="codeIntegrationSample" className="form-control" rows="5" placeholder="Code Integration Sample"></textarea>
            </div>

            {/* Stats */}
            <div className="col-12 mt-4">
              <h4>Stats</h4>
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[0].value} onChange={(e) => handleChange(e, "stats", 0)} name="value" type="number" className="form-control" placeholder="Value" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[0].unit} onChange={(e) => handleChange(e, "stats", 0)} name="unit" type="text" className="form-control" placeholder="Unit" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[0].label} onChange={(e) => handleChange(e, "stats", 0)} name="label" type="text" className="form-control" placeholder="Label" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[1].value} onChange={(e) => handleChange(e, "stats", 1)} name="value" type="number" className="form-control" placeholder="Value" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[1].unit} onChange={(e) => handleChange(e, "stats", 1)} name="unit" type="text" className="form-control" placeholder="Unit" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[1].label} onChange={(e) => handleChange(e, "stats", 1)} name="label" type="text" className="form-control" placeholder="Label" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[2].value} onChange={(e) => handleChange(e, "stats", 2)} name="value" type="number" className="form-control" placeholder="Value" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[2].unit} onChange={(e) => handleChange(e, "stats", 2)} name="unit" type="text" className="form-control" placeholder="Unit" />
            </div>

            <div className="col-md-4 mb-4">
              <input value={formData.stats[2].label} onChange={(e) => handleChange(e, "stats", 2)} name="label" type="text" className="form-control" placeholder="Label" />
            </div>

            {/* Pricing */}
            <div className="col-12 mt-4">
              <h4>Pricing Section</h4>
            </div>

            <div className="col-md-6">
              <input value={formData.pricingSubHeading} onChange={handleChange} name="pricingSubHeading" type="text" className="form-control" placeholder="Pricing Sub Heading" />
            </div>

            <div className="col-md-6">
              <input value={formData.pricingHeading} onChange={handleChange} name="pricingHeading" type="text" className="form-control" placeholder="Pricing Heading" />
            </div>

            <div className="udieiojoerr mt-4">
              <div className="d-flex align-items-center justify-content-between">
                <label htmlFor="">Add Plans</label>

                <button type="button" onClick={handleAddPlan} className="btn btn-primary">Add A Plan</button>
              </div>

              <div className="idunjeihewr">
                {formData?.pricingPlans?.map((pricingPlan, index) => (
                  <div className="diuniejkerwr mb-4" key={index}>
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="mb-3">Plan {index + 1}</h4>

                      {formData?.pricingPlans?.length > 1 && (
                        <i onClick={() => handleRemovePlan(pricingPlan?._id)} className="fa-regular fs-2 fa-circle-xmark text-danger"></i>
                      )}
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-4 mb-4">
                        <input type="text" value={pricingPlan.planName} onChange={(e) => handleChange(e, "pricingPlans", index)} name="planName" className="form-control" placeholder="Plan Name" />
                      </div>

                      <div className="col-md-4 mb-4">
                        <input type="text" value={pricingPlan.planPurpose} onChange={(e) => handleChange(e, "pricingPlans", index)} name="planPurpose" className="form-control" placeholder="Plan Purpose" />
                      </div>

                      <div className="col-md-4 mb-4">
                        <input type="number" value={pricingPlan.price} onChange={(e) => handleChange(e, "pricingPlans", index)} name="price" className="form-control" placeholder="Price" />
                      </div>

                      <div className="col-md-4 mb-4">
                        <input type="text" value={pricingPlan.duration} onChange={(e) => handleChange(e, "pricingPlans", index)} name="duration" className="form-control" placeholder="Duration" />
                      </div>

                      <div className="col-md-12 mb-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <label htmlFor="" className="mb-0">Plan Details</label>

                          <button type="button" onClick={() => handleAddFeature(pricingPlan?._id)} className="btn btn-primary">Add A Feature</button>
                        </div>

                        {pricingPlan?.planDetails?.map((planDetail, planDetailIndex) => (
                          <div className="diuewkhrwe d-flex align-items-center justify-content-between gap-4">
                            <input key={planDetailIndex} value={planDetail} onChange={(e) => handleChange(e, "pricingPlans", index, "planDetails", planDetailIndex)} type="text" className="form-control mb-3" placeholder="CTA Button" />

                            {pricingPlan?.planDetails?.length > 1 && (
                              <i onClick={() => handleRemovePlanDetail(pricingPlan._id, planDetailIndex)} className="fa-regular fs-2 fa-circle-xmark text-danger"></i>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  ))}
              </div>
            </div>

            <div className="col-12 mt-5 text-center">
              <button className="btn btn-primary px-5 py-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}