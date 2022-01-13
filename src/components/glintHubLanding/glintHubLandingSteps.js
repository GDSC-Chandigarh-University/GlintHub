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
            <div id="glinthubLandingSteps" className="mt-100 glinthubLandingSteps_main_div">
                <div className="flex glinthubLandingSteps_left_div">
                    <div className="boxFlex mr-4 mb-5 glinthubLandingSteps_left_div1">
                        <h3 className="ml-2 mb-2 fw-600">Submit</h3>
                        <div className="box mb-4 bg-cl-p-2 p-4">
                            <h4 className="lh-28">Submit your app to glintHub by submitting the given form with proper information.</h4>
                        </div>
                        <h3 className="ml-2 mb-2 mt-2 fw-600">Publish</h3>
                        <div className="box bg-cl-p-6 p-4">
                            <h4 className="lh-28">After mentor approval we will provide you with free domain and hosting to host your app.</h4>
                        </div>
                    </div>
                    <div className="boxFlex ml-4 mt-5 glinthubLandingSteps_left_div2">
                    <h3 className="ml-2 mb-2 fw-600">Review</h3>
                        <div className="box mb-4 p-4 bg-cl-lightGreen5">
                            <h4 className="lh-28">Mentors will review the submitted app and help you to improve your app via real time chat.</h4>
                        </div>
                        <h3 className="ml-2 mb-2 mt-2 fw-600">Featured</h3>
                        <div className="box bg-cl-p-1 p-4">
                            <h4 className="lh-28">After publishing your app will get featured on glintHubSpace where other users can upvote and comment on your app.</h4>
                        </div>
                    </div>
                </div>
                <div className="stepContent glinthubLandingSteps_right_div">
                    <h1 className="medium-h1">Four Step Process</h1>
                    <h3 className="mb-3 fw-600 pl-1">Four easy steps to publish your applications  <br/>  to the storefronts.</h3>
                    <h3 className="fw-700 cl-lightGreen4 fw-600 hover" onClick={googleAuthLogin}>Get Started</h3>
                </div>
            </div>
        );
    }
}