import { useState } from "react";

import api from "../api/axios";

import DashboardCard from "../components/DashboardCard";



export default function Homepage() {
  const [formData, setFormData] = useState({
    heroSubHeading: "",
    heroHeading: "",
    heroDescription: "",
    heroRatingLeft: "",
    heroRatingRight: "",
    codeIntegrationSubHeading: "",
    codeIntegrationHeading: "",
    codeIntegrationDescription: "",
    codeIntegrationSample: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.patch("/homepage", formData);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  return (
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
          {/* <div className="col-lg-12 mb-3">
            <div className="row">
              <div className="col-12 mb-3">
                <h4>Core Section</h4>
              </div>

              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Core Sub Heading" />
              </div>

              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Core Heading" />
              </div>

              <div className="col-md-4 mb-3">
                <input type="text" className="form-control" placeholder="Icon" />
              </div>

              <div className="col-md-4 mb-3">
                <input type="text" className="form-control" placeholder="Title" />
              </div>

              <div className="col-md-4 mb-3">
                <textarea className="form-control" rows="1" placeholder="Description"></textarea>
              </div>
            </div>
          </div> */}


          {/* Code Integration */}
          <div className="col-12 mt-4 mb-3">
            <h4>Code Integration</h4>
          </div>

          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Code Integration Sub Heading" />
          </div>

          <div className="col-md-6 mb-3">
            <input type="text" className="form-control" placeholder="Code Integration Heading" />
          </div>

          <div className="col-12 mb-3">
            <textarea className="form-control" rows="3" placeholder="Code Integration Description"></textarea>
          </div>

          {/* Code Integration Step */}
          {/* <div className="col-md-2 mb-3">
            <input type="number" className="form-control" placeholder="Step Count" />
          </div>

          <div className="col-md-5 mb-3">
            <input type="text" className="form-control" placeholder="Step Title" />
          </div>

          <div className="col-md-5 mb-3">
            <textarea className="form-control" rows="1" placeholder="Step Description"></textarea>
          </div> */}

          <div className="col-12 mb-3">
            <textarea className="form-control" rows="5" placeholder="Code Integration Sample"></textarea>
          </div>

          {/* Stats */}
          {/* <div className="col-12 mt-4">
            <h4>Stats</h4>
          </div>

          <div className="col-md-6">
            <input type="number" className="form-control" placeholder="Value" />
          </div>

          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Label" />
          </div> */}

          {/* Pricing */}
          {/* <div className="col-12 mt-4">
            <h4>Pricing Section</h4>
          </div>

          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Pricing Sub Heading" />
          </div>

          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Pricing Heading" />
          </div> */}

          <div className="col-12">
            <button className="btn btn-primary">Submit</button>
          </div>

        </form>
      </div>

    </div>
  );
}