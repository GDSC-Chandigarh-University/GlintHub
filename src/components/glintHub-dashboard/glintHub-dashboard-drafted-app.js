import React from "react";
import Orbus from "../../assets/images/Orbus.png"
import EditButton from "../../assets/images/edit.png"

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
                                    <img className="icon" src={Orbus} />
                                    <a href="#"><img className="edit" src={EditButton} /></a>
                                </div>
                                <div className="text-box">
                                    <span>Orbus</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}