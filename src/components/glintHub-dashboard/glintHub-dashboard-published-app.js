import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header"
import PublishCard from "./publish-app-card";


export default class PublishedApp extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <Sidebar></Sidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <div id="glinthub-dashboard-published-app">
                                <h1 className="upper-h1">Published Apps</h1>
                                <hr id="draft-line" />
                                <div className="publish-apps-wrapper">
                                    <div className="line1">
                                        <PublishCard image={"./main-dashboard/Rectangle 32.png"} imageText={"Orbus"} para1={"An adventure land avenge for the family. Defeat trians avenge the death of Orbus, the home land of Orby."} para2={"Android"} />
                                        <PublishCard image={"./main-dashboard/Rectangle 33.png"} imageText={"Left n Right"} para1={"A meditational game. Increase focus and efficiency of brain by just playing a game."} para2={"Android"} />
                                    </div>
                                    <div className="line1">
                                        <PublishCard image={"./main-dashboard/Rectangle 34.png"} imageText={"Covid 19"} para1={"Track Corona Virus, get latest feeds, make yourself screened, donate, meditational tracks and more."} para2={"Android"} />
                                        <PublishCard image={"./main-dashboard/Rectangle 35.png"} imageText={"Hang on"} para1={"Indian own cultural and tradional short videos app. Share your ethical talent with the world. Just hit record."} para2={"Android"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}