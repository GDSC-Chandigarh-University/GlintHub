import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header"


export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <Sidebar></Sidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <div id="glinthub-dashboard">
                            <div className="headingDash glinthub-dashboard-bold glinthub-dashboard-h1" id="board">Dashboard</div>
                                <main>
                                    <div className="dash-container-1 glinthub-dashboard-bold">
                                         {/* upper boxes */}
                                        <div className="bx-1">
                                            <div className="up-bx">Published Apps</div>
                                            <div className="dash-num">06</div>
                                        </div>

                                        <div className="bx-1 bx-clr-2">
                                            <div className="up-bx">Drafted Apps</div>
                                            <div className="dash-num">02</div>
                                        </div>

                                        <div className="bx-1 bx-clr-3">
                                            <div className="up-bx">In-review Apps</div>
                                            <div className="dash-num">01</div>
                                        </div>

                                    </div>

                                    <div className="dash-container-2">
                                        {/* <!-- Upper part --> */}
                                        <div className="dashUp-1">
                                            <span id="pr">Projects</span>
                                            <span id="vie">View All</span>
                                        </div>

                                        <div className="bx-2">
                                            <div className="img-icn"><img src="./main-dashboard/Rectangle 32.png" alt="Error"/></div>
                                            <div className="img-icn"><img src="/main-dashboard/Rectangle 33.png" alt="Error"/></div>
                                            <div className="img-icn"><img src="/main-dashboard/Rectangle 34.png" alt="Error"/></div>
                                            <div className="img-icn"><img src="/main-dashboard/Rectangle 35.png" alt="Error"/></div>
                                            <div className="img-icn"><img src="/main-dashboard/Rectangle 36.png" alt="Error"/></div>
                                            <span className="img-icn-plus" ><img src="/main-dashboard/plus.png" width="33px" height="31px" alt="Error"/></span>
                                        </div>
                                    </div>

                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}