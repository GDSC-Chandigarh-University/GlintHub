import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import DashboardSvg from "../../../assets/images/dashboard-svg.svg";
import AddAppSvg from "../../../assets/images/add-svg.svg";
import DraftedSvg from "../../../assets/images/drafted-svg.svg";
import PublishedSvg from "../../../assets/images/published-svg.svg";
import ReviewsSvg from "../../../assets/images/review-svg.svg";
import xCircle from "../../../assets/images/x-circle.svg";


class GlintHubSidebar extends React.Component {
    state = {
        error: false // Changed to error message
    }


    handleClick = (event) => {
        event.preventDefault()
        this.setState(() => ({error: `No App ${event.target.name} Yet!`}))
        setTimeout(() => {
            this.setState(() => ({error: false}))
        }, 2000)
    }


    render() {
        let { url } = this.props.match
        let { error } = this.state
        let { draftedProjects, publishedProjects, reviewProjects } = this.props.projects
        return (
            <div id="glinthubSidebar">
                <div id="sidebar-mid">
                    { error && <div className="redSignal">{error}<img src={xCircle} /></div>}
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={DashboardSvg} />
                        <NavLink to={url} exact={true} activeClassName="is-active">Dashboard</NavLink>
                    </div>
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={PublishedSvg} />
                        {publishedProjects.length > 0 ? <NavLink to={`${url}/publishedApp`} activeClassName="is-active">Published App</NavLink> : <NavLink name="Published" to="" onClick={this.handleClick}>Manage App</NavLink>}
                    </div>
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={ReviewsSvg} />
                        {reviewProjects.length > 0 ? <NavLink to={`${url}/reviewApp`} activeClassName="is-active">Review App</NavLink> : <NavLink name="In-Review" to="" onClick={this.handleClick}>Review App</NavLink>}
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(GlintHubSidebar)