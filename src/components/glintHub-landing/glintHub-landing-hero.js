import React from "react";

export default class GlintHubLandingHero extends React.Component {
  render() {
    return (
      <div id="glinthub-landing-hero">
        <div id="hero">
          <img
            class="hero_img"
            src="./hero_img.png"
            alt="Vector image of a hut"
          />
          <div class="hero_content">
            <h1>Glinthub</h1>
            <p>Make your projects<br></br>published for FREE</p>
            <a class="btn" href="">Get Started</a>
          </div>
        </div>
      </div>
    );
  }
}