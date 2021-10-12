import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header"


export default class Reviews extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <Sidebar></Sidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <div id="glinthub-dashboard-reviews">
                                <h1>Reviews</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}