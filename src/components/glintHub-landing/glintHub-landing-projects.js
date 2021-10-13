import React from "react";
import { Link } from "react-router-dom";

export default class GlintHubLandingProjects extends React.Component {
  render() {
    return (
      <div id="glinthub-landing-projects">
      <div id="glinthub-landing-steps">
        <div id="outer-box">
          <div id="process-outer-box" className="col-lg-5 col-md-3 col-sm-4 col-xs-8 hero_content">
            <div id="width700">
              <h1>Get featured on GDSC @CU</h1>
            </div>
            <div id="get-started-box">
              <p>Get your projects promoted by
Google DSC Chandigarh University.</p>
              <Link to="/glinthub">Veiw all projects</Link>
            </div>
          </div>
          <div id="project-container">
            <img src="./glinthub-landing-projects.png"/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}