import React from "react";
import Sidebar from "./sidebar";
import Header from "../header/header"


export default class Reviews extends React.Component {
    render() {
        return (
            <div id="root">
                <Sidebar></Sidebar>
                <div id="root-1">
                    <Header></Header>
                    <div className="upper-div">
                        <h1>Reviews</h1>
                    </div>
                </div>
            </div>
        );
    }
}