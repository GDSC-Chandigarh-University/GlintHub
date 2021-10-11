import React from "react";
import Sidebar from "../dashboard/sidebar";

export default class Error extends React.Component {
    render() {
        return (
            <div id="root">
                <Sidebar></Sidebar>
                <div id="root-1">
                    <Header></Header>
                    <div className="upper-div">

                    </div>
                </div>
            </div>
        );
    }
}