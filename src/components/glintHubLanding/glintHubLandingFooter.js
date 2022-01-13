import React from "react";
import gdscCuLogo from "../../assets/images/gdscCuLogo.svg";
import facebook from "../../assets/images/facebook.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import youtube from "../../assets/images/youtube.svg";

export default class GlintHubLandingFooter extends React.Component {
  render() {
    return (
      <div
        id="glinthubLandingFooter"
        className="mt-100 glinthubLandingFooter_main_div"
      >
        <div className="glinthubLandingFooter_h5_div">
          <h5 className="large-h1 fw-600 cl-lightBlack">Get Featured</h5>
          <br />
          <h5 className="large-h1 fw-600 mt--1 mb-4 cl-lightBlack glinthubLandingFooter_h5_div_2h5">
            on GDSC CU
          </h5>
          <br />
          <a href="mailto:gdsc.chandigarhuniversity@gmail.com">Contact Us</a>
        </div>
        <div id="gdscLogo">
          <img src={gdscCuLogo} />
          <h3 className="fw-600 cl-lightBlack">
            Google Developer Student Clubs
          </h3>
          <h3 className="fw-600 cl-lightBlack">Chandigarh University</h3>
          <div className="glinthubLandingFooter_link_div">
            <a href="https://twitter.com/gdsc_cu" target="_blank">
              <img src={twitter} />
            </a>
            <a href="https://www.instagram.com/gdsc.cu/" target="_blank">
              <img src={instagram} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100072150879234"
              target="_blank"
            >
              <img src={facebook} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCv68rl5yx1evXXn3YUsDwew"
              target="_blank"
            >
              <img src={youtube} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
