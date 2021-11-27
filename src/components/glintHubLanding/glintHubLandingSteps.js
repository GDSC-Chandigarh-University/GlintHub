import React from "react";
import { Link } from "react-router-dom";
import { googleAuthLogin } from "../../config/firebase";
import chart from "../../assets/images/Icon_chart.png"
import star from "../../assets/images/Icon_star.png"
import folder from "../../assets/images/Icon_folder.png"
import navigation from "../../assets/images/Icon_navigation.png"

export default class GlintHubLandingSteps extends React.Component {
    render() {
        return (
            <div id="glinthubLandingSteps" className="mt-100">
                <div className="flex">
                    <div className="boxFlex mr-4 mb-5">
                        <h3 className="ml-2 mb-2">Submit</h3>
                        <div className="box mb-4 p-bg-cl-1">
                            <h3></h3>
                        </div>
                        <h3 className="ml-2 mb-2 mt-2">Publish</h3>
                        <div className="box p-bg-cl-2">

                        </div>
                    </div>
                    <div className="boxFlex ml-4 mt-5">
                    <h3 className="ml-2 mb-2">Review</h3>
                        <div className="box mb-4 p-bg-cl-3">

                        </div>
                        <h3 className="ml-2 mb-2 mt-2">Featured</h3>
                        <div className="box p-bg-cl-4">

                        </div>
                    </div>
                </div>
                <div className="stepContent">
                    <h1>Four Step Process</h1>
                    <h3 className="mb-4 fw-600 cl-ft-lightBlack pl-1">Four easy steps to publish your <br/> applications to the storefronts.</h3>
                    <h3 className="fw-600 cl-darkGreen" onClick={googleAuthLogin}>Get Started</h3>
                </div>
            </div>
        );
    }
}