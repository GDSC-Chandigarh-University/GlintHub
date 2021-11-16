import React from "react";
import { Link, withRouter } from "react-router-dom";
import Modal from "./Modal";
import AddApp from "../../assets/images/plus.png";
import noProject from "../../assets/images/no-project.png"; // Used when user have no projects


class GlintHubDashboard extends React.Component {
    state = {
        user: this.props.user,
        firstLoad: true,
        isMounted: true,
        modalApp: null,
        modalIsOpen: false,
        title: '',
        technology: '',
        githubURL: '',
        image: '',
        description: '',
        modalLoading: true,
        modalLoaded: false,
    }


    modalClick = (app) => {
        this.setState(() => {
            return {
                modalApp: app,
                modalIsOpen: true,
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {
                modalIsOpen: false
            }
        })
    }

    render() {
        let { url } = this.props.match
        let {publishedProjects, draftedProjects, reviewProjects} = this.props.projects
        return (publishedProjects.length > 0 || draftedProjects.length > 0 || reviewProjects.length > 0) ? (
            <div id="glinthubDashboard">
                <h1>Dashboard</h1>
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
                {this.state.modalIsOpen && <Modal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} user={this.props.user} projects={this.props.projects} modalApp={this.state.modalApp}/>}
            </div>
        ) : (
            <div id="glinthubDashboard">
                <h1>Dashboard</h1>
                <h2 className="cl-font-grey">You don’t have added any project yet.</h2>
                <img id="no-project-img" src={noProject} />
                <br />
                <div className="addProject">
                <Link to={`${url}/addApp`} className="img-icn-plus no-project-add" ><img src={AddApp} width="33px" height="31px" alt="Add App" /></Link><span className="h3 cl-darkGreen fw-700">Add Project</span>
                </div>
            </div>);
    }
}


export default withRouter(GlintHubDashboard)