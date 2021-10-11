import React from "react";
import Header from "../header/header"

export default class LandingTop extends React.Component {
    render(){
        return (
            
<div id="lander-main-div">
  <Header/>
  <div id="hero" class="container">
      <img
        class="hero_img"
        src="./hero_img.png"
        alt="Vector image of a hut"
      />
      <div class="hero_content">
        <h1>Glinthub</h1>
        <p>Make your projects published for FREE</p>
        <a class="btn" href="">Get Started</a>
      </div>
    </div>
  </div>
        );
    }
}