import React from "react";

export default class GlintHubDraftedApp extends React.Component {
    render() {
        return (
            <div id="glinthub-dashboard-drafted-app">
                <div id="draft-title">
                    <h1 id="glinthub-dashboard-h1">Drafted Apps</h1>
                </div>
                <hr id="draft-line" />
                <div id="draft-container" className="container">
                    <section className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                            <div className="draft-tile" id="draft-tile-1">
                                <div className="img-box">
                                    <img className="icon" src="../images/Rectangle 32.png" />
                                    <a href="#"><img className="edit" src="../images/Group 4.png" /></a>
                                </div>
                                <div className="text-box">
                                    <span>Orbus</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                            <div className="draft-tile" id="tile-2">
                                <div className="img-box">
                                    <img className="icon" src="../images/Rectangle 34.png" />
                                    <a href="#"><img className="edit" src="../images/Group 4.png" /></a>
                                </div>
                                <div className="text-box">
                                    <span>Left n Right</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                            <div className="draft-tile" id="tile-3">
                                <div className="img-box">
                                    <img src="../images/Rectangle 37.png" />
                                    <a href="#"><img className="edit" src="../images/Group 4.png" /></a>
                                </div>
                                <div className="text-box">
                                    <span>Covid19</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                            <div className="draft-tile" id="tile-4">
                                <div className="img-box">
                                    <img src="../images/Rectangle 38.png" />
                                    <a href="#"><img className="edit" src="../images/Group 4.png" /></a>
                                </div>
                                <div className="text-box">
                                    <span>Hang on</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                            <div className="draft-tile" id="tile-5">
                                <div className="img-box">
                                    <img className="icon" src="../images/Rectangle 40.png" />
                                    <a href="#"><img className="edit" src="../images/Group 4.png" /></a>
                                </div>
                                <div className="text-box">
                                    <span>Codera</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}