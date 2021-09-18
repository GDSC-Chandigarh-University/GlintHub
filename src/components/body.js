import React from "react";

export default class Body extends React.Component {
    render() {
        return (
            <div>
                <section class="glinthub-frontend glinthub-frontend-top">
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
                <section class="glinthub-frontend glinthub-frontend-mid">
                    <div class="info">
                        <h2>Four Steps Process</h2>
                        <p>Four easy steps to publish your
                            applications to the storefronts.</p>
                        <a>Learn more</a>
                    </div>
                    <div class="img">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
                <section class="glinthub-frontend glinthub-frontend-bottom">
                    <div class="info">
                        <h2>Get featured on GDSC @CU</h2>
                        <p>Get your projects promoted by Google DSC Chandigarh University.</p>
                        <a>Learn more</a>
                    </div>
                    <div class="img">
                        
                    </div>
                </section>
            </div>
        );
    }
}