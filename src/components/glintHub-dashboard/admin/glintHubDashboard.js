import React from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "../Modal";
import AddApp from "../../../assets/images/plus.png";
import noProject from "../../../assets/images/no-project.png"; // Used when user have no projects


class GlintHubDashboard extends React.Component {
    state = {
        user: this.props.user,
        modalApp: null,
        modalIsOpen: false,
    }

    modalClick = (app) => {
        console.log(app)
        this.setState(() => ({
            modalApp: app,
            modalIsOpen: true,
        }))
    }

    closeModal = () => {
        this.setState(() => ({ modalIsOpen: false }))
    }

    render() {
        let { url } = this.props.match
        let { publishedProjects, draftedProjects, reviewProjects } = this.props.projects
        return (
            <div id="glinthubDashboard">
                <h1>Admin Dashboard</h1>
                <div className="dash-container-1 glinthub-dashboard-bold">
                    {/* upper boxes */}
                    <div className="bx-1">
                        <div className="up-bx">Published Apps</div>
                        <div className="dash-num">{publishedProjects.length}</div>
                    </div>

                    <div className="bx-1 bx-clr-2">
                        <div className="up-bx">Drafted Apps</div>
                        <div className="dash-num">{draftedProjects.length}</div>
                    </div>

                    <div className="bx-1 bx-clr-3">
                        <div className="up-bx">In-Review Apps</div>
                        <div className="dash-num">{reviewProjects.length}</div>
                    </div>
                </div>

                {publishedProjects.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">Published Apps</span>
                        <Link to={`${url}/published-app`}><span id="vie">View All</span></Link>
                    </div>

                    <div className="bx-2">
                        {publishedProjects.map((app) => {
                            return (
                                <div key={app.id} onClick={() => { this.modalClick(app) }} className="img-icn"><img src={app.image} alt="Error" /></div>
                            )
                        })}
                    </div>
                </div>}
                {draftedProjects.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">Drafted Apps</span>
                        <Link to={`${url}/drafted-app`}><span id="vie">View All</span></Link>
                    </div>

                    <div className="bx-2">
                        {draftedProjects.map((app) => {
                            return (
                                <div key={app.id} onClick={() => { this.modalClick(app) }} className="img-icn"><img src={app.image} alt="Error" /></div>
                            )
                        })}
                        <Link to={`${url}/addApp`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                    </div>
                </div>}
                {reviewProjects.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">In-review Apps</span>
                        <Link to={`${url}/reviews`}><span id="vie">View All</span></Link>
                    </div>

                    <div className="bx-2">
                        {reviewProjects.map((app) => {
                            return (
                                <div key={app.id} onClick={() => { this.modalClick(app) }} className="img-icn"><img src={app.image} alt="Error" /></div>
                            )
                        })}
                        <Link to={`${url}/addApp`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                    </div>
                </div>}
                {this.state.modalIsOpen && <Modal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} user={this.props.user} projects={this.props.projects} modalApp={this.state.modalApp} />}
            </div>
        );
    }
}


export default withRouter(GlintHubDashboard)