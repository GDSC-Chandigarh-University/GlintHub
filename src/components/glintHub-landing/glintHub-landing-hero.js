import React from "react";
import { GoogleAuthLogin } from "../../config/firebase";
import Hero from "../../assets/images/hero_img.png"

export default function GlintHubLandingHero() {
   const handleGoogleAuthLogin = async () => {
    try {
      await GoogleAuthLogin()
    } catch (error) {
      console.log(error);
    }
  }
    return (
      <div id="glinthub-landing-hero">
        <div id="hero">
          <img
            className="hero_img"
            src={Hero}
            alt="Vector image of a hut"
          />
          <div className="hero_content">
            <h1>Glinthub</h1>
            <p>Make your projects<br></br>published for FREE</p>
            <button className="btn" onClick={handleGoogleAuthLogin}>Get Started</button>
          </div>
        </div>
      </div>
    );
  }