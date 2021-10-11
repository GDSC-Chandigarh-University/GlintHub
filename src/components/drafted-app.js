import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";


export default class DraftedApp extends React.Component {
    render() {
        return (
            <div id="root">
                <Sidebar></Sidebar>
                <div id="root-1">
                    <Header></Header>
                    <div className="upper-div">
                        <h1>Drafted App</h1>
                    </div>
                </div>
            </div>
        );
    }
}