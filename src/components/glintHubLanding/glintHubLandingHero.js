import React from "react";
import { googleAuthLogin } from "../../config/firebase";
import heroHut from "../../assets/images/heroHut.png"


class GlintHubLandingHero extends React.Component {
  render() {
    return (
      <div id="glinthubLandingHero">
        <div className="heroContent">
          <p className="big-h1">Welcome to</p>
          <p className="big-h1 cl-lightGreen4 mt--1">Glinthub</p>
          <h3 className="mb-4 fw-600 cl-ft-lightBlack pl-1">Make your projects published for FREE</h3>
          <button className="getStarted h3" onClick={googleAuthLogin}>Get Started</button>
        </div>
        <img className="heroImg" src={heroHut} alt="Hero Hut" />
      </div>
    );
  }
}


export default GlintHubLandingHero
