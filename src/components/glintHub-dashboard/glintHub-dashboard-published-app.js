import React from "react";
import PublishCard from "./publish-app-card";
import Orbus from "../../assets/images/Orbus.png"

export default class GlintHubPublishedApp extends React.Component {
    render() {
        return (
            <div id="glinthub-dashboard-published-app">
                <h1 className="upper-h1">Published Apps</h1>
                <hr id="draft-line" />
                <div className="publish-apps-wrapper">
                    <div className="line1">
                        <PublishCard image={Orbus} imageText={"Orbus"} para1={"An adventure land avenge for the family. Defeat trians avenge the death of Orbus, the home land of Orby."} para2={"Android"} />
                    </div>
                </div>
            </div>
        );
    }
}