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
            </div>
        );
    }
}