import React from "react";
import Header from "../header/header";
import GlintHubLandingHero from "./glintHub-landing-hero";
import GlintHubLandingSteps from "./glintHub-landing-steps";
import GlintHubLandingProjects from "./glintHub-landing-projects";

export default class GlintHubLanding extends React.Component {
    render() {
        return (
            <div id="glinthub-landing">
                <Header/>
                <GlintHubLandingHero/>
                <GlintHubLandingSteps/>
                <GlintHubLandingProjects/>
            </div>
        );
    }
}