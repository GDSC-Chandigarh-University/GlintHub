import React from "react";

export default class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <div class="header_pos">
                    <div class="logo">
                        <img src="./logo.png" alt="logo" />
                        <a href="/">
                            <p class="logo_heading">Google Developer Student Clubs</p>
                            <p class="logo_content">Chandigarh University</p>
                        </a>
                    </div>
                    <ul class="header_options">
                        <li>
                            <a class="header_link" target="_blank" href="">About GDSC</a>
                        </li>
                        <li>
                            <a class="header_link" target="_blank" href="">Projects</a>
                        </li>
                        <li>
                            <a class="header_link" target="_blank" href="">Events</a>
                        </li>
                        <li>
                            <a class="header_link" target="_blank" href="/glinthub">GlintHub</a>
                        </li>
                        <li>
                            <a class="header_link" target="_blank" href="">Our Team</a>
                        </li>
                        <li>
                            <a class="header_link" target="_blank" href="">Join US</a>
                        </li>
                        <li>
                            <a class="header_link" target="_blank" href=""><img class="profile_img" src="./profile_img.jpg"
                                alt="" /></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}