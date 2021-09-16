import React from "react";

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <header>

                </header>
                <section id="top">
                    <div class="info">
                        <h2>GlintHub</h2>
                        <p>Make your projects published for FREE</p>
                        <button>Get Started</button>
                    </div>
                    <div class="img">
                        <img src="./assets/svg/GlintHub.svg" alt="GlintHut" />
                        <img id="downarrow" src="./assets/svg/Downarrow.svg" alt="Downarrow" />
                    </div>
                </section>
                <section id="top">
                    <div class="info">
                        <h2>Four Steps Process</h2>
                        <p>Four easy steps to publish your
                            applications to the storefronts.</p>
                        <a>Learn more</a>
                    </div>
                    <div class="img">
                        <img src="./assets/svg/GlintHub.svg" alt="GlintHut" />
                        <img id="downarrow" src="./assets/svg/Downarrow.svg" alt="Downarrow" />
                    </div>
                </section>
            </div>
        );
    }
}