import React from "react";
import { connect } from "react-redux";
import Header from "../header";
import GlintHubLandingHero from "./glintHubLandingHero";
import GlintHubLandingProjects from "./glintHubLandingProjects";
import GlintHubLandingSteps from "./glintHubLandingSteps";
import GlintHubLandingFooter from "./glintHubLandingFooter";


class GlintHubLanding extends React.Component {
    render() {
        return (
            <div id="glinthubLanding">
                <Header user={this.props.user} activeLink="glintHub" />
                <GlintHubLandingHero />
                <GlintHubLandingProjects />
                <GlintHubLandingSteps />
                <GlintHubLandingFooter/>
            </div>
        );
    }
}


export default connect((state) => {
    return {
        user: state.userReducer.user,
    }
})(GlintHubLanding)
