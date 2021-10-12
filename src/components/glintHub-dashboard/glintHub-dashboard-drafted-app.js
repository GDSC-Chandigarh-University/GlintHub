import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header"


export default class DraftedApp extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <Sidebar></Sidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <div id="glinthub-dashboard-drafted-app">
                                <h1>Drafted App</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}