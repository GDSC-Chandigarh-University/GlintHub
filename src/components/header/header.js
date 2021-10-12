import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <div className="header_pos">
                    <Link to="/">
                    <div className="logo">
                        <img src="./logo.png" alt="logo" />
                        <Link to="/">
                            <p className="logo_heading">Google Developer Student Clubs</p>
                            <p className="logo_content">Chandigarh University</p>
                        </Link>
                    </div>
                    </Link>
                    <ul className="header_options">
                        <li>
                            <a className="header_link" target="_blank" href="">About GDSC</a>
                        </li>
                        <li>
                            <a className="header_link" target="_blank" href="">Projects</a>
                        </li>
                        <li>
                            <a className="header_link" target="_blank" href="">Events</a>
                        </li>
                        <li>
                            <a className="header_link" target="_blank" href="/glinthub">GlintHub</a>
                        </li>
                        <li>
                            <a className="header_link" target="_blank" href="">Our Team</a>
                        </li>
                        <li>
                            <a className="header_link" target="_blank" href="">Join US</a>
                        </li>
                        <li>
                            <a className="header_link" target="_blank" href=""><img className="profile_img" src="./profile_img.jpg"
                                alt="" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}