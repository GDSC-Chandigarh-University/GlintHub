import React from "react";
import { Link, withRouter } from "react-router-dom";
import Orbus from "../../assets/images/Orbus.png"
import AddApp from "../../assets/images/plus.png"

class GlintHubDashboard extends React.Component {
    render() {
        let { url } = this.props.match
        console.log(url)
        return (
                <div id="glinthub-dashboard">
                    <div className="headingDash glinthub-dashboard-bold glinthub-dashboard-h1" id="board">Dashboard</div>
                    <div className="dash-container-1 glinthub-dashboard-bold">
                        {/* upper boxes */}
                        <div className="bx-1">
                            <div className="up-bx">Published Apps</div>
                            <div className="dash-num">0</div>
                        </div>

                        <div className="bx-1 bx-clr-2">
                            <div className="up-bx">Drafted Apps</div>
                            <div className="dash-num">0</div>
                        </div>

                        <div className="bx-1 bx-clr-3">
                            <div className="up-bx">In-review Apps</div>
                            <div className="dash-num">12</div>
                        </div>

                    </div>

                    <div className="dash-container-2">
                        {/* <!-- Upper part --> */}
                        <div className="dashUp-1">
                            <span id="pr">Projects</span>
                            <span id="vie">View All</span>
                        </div>

                        <div className="bx-2">
                            <div className="img-icn"><img src={Orbus} alt="Error" /></div>
                            <Link to={`${url}/add-app`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                        </div>
                    </div>
                </div>
        );
    }
}

export default  withRouter(GlintHubDashboard)