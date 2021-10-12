import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header";


export default class AddApp extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <Sidebar></Sidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <div id="glinthub-dashboard-add-app">
                                <h1>Add App</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}