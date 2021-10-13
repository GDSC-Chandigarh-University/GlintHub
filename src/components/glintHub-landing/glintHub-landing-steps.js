import React from "react";
import { Link } from "react-router-dom";

export default class GlintHubLandingSteps extends React.Component {
    render() {
        return (
            <div id="glinthub-landing-steps">
                <div id="outer-box">
                    <div id="process-outer-box" className="col-lg-5 col-md-3 col-sm-4 col-xs-8 hero_content">
                        <div id="width700">
                            <h1>Four Steps Process</h1>
                        </div>
                        <div id="get-started-box">
                            <p>Four easy steps to publish your applications to the storefronts.</p>
                            <Link to="/glinthub">Get Started</Link>
                        </div>
                    </div>
                    <div id="card-container" className="container col-lg-5 col-md-3 col-sm-4 col-xs-6">
                        <section className="row">
                        <div className="col-lg-5 col-md-3 col-sm-4 col-xs-6">
                                <div className="mid-tile" id="tile-1">
                                    <div className="img-box">
                                        <img src="images/Icon_folder.png"/>
                                    </div>
                                    <div className="text-box">
                                        <h1 className="number">1.</h1>
                                        <h1 className="text">Submit</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-3 col-sm-4 col-xs-6">
                                <div className="mid-tile" id="tile-2">
                                    <div className="img-box">
                                        <img src="images/Icon_chart.png"/>
                                    </div>
                                    <div className="text-box">
                                        <h1 className="number">2.</h1>
                                        <h1 className="text">Review</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-3 col-sm-4 col-xs-6">
                                <div className="mid-tile" id="tile-3">
                                    <div className="img-box">
                                        <img src="images/Icon_navigation.png"/>
                                    </div>
                                    <div className="text-box">
                                        <h1 className="number">3.</h1>
                                        <h1 className="text">Improve</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-3 col-sm-4 col-xs-6">
                                <div className="mid-tile" id="tile-4">
                                    <div className="img-box">
                                        <img src="images/Icon_star.png"/>
                                    </div>
                                    <div className="text-box">
                                        <h1 className="number">4.</h1>
                                        <h1 className="text">Publish</h1>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    </div>
            </div>
        );
    }
}