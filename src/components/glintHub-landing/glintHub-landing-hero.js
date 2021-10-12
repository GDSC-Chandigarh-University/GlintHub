import React from "react";
import { Link } from "react-router-dom";

export default class GlintHubLandingHero extends React.Component {
  render() {
    return (
      <div id="glinthub-landing-hero">
        <div id="hero">
          <img
            className="hero_img"
            src="./hero_img.png"
            alt="Vector image of a hut"
          />
          <div className="hero_content">
            <h1>Glinthub</h1>
            <p>Make your projects<br></br>published for FREE</p>
            <Link className="btn" to="/glinthub">Get Started</Link>
          </div>
        </div>
      </div>
    );
  }
}