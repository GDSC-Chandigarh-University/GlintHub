import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import AddAppSvg from "../../assets/images/add-svg.svg";
import DashboardSvg from "../../assets/images/dashboard-svg.svg";
import DraftedSvg from "../../assets/images/drafted-svg.svg";
import PublishedSvg from "../../assets/images/published-svg.svg";
import ReviewsSvg from "../../assets/images/review-svg.svg";
import xCircle from "../../assets/images/x-circle.svg";


class GlintHubSidebar extends React.Component {
    state = {
        errorDrafted: false,
        errorPublished: false,
        errorReview: false
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState(() => {
            return {
                [event.target.name]: true
            }
        })
        setTimeout(() => {
            this.setState(() => {
                return {
                    [event.target.name]: false
                }
            })
        }, 2000)
    }

    render() {
        let { url } = this.props.match
        let { errorDrafted, errorPublished, errorReview } = this.state
        let { draftedApps, publishedApps, reviewApps } = this.props.apps
        return (
            <div id="sidebar">
                <div id="sidebar-mid">
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={DashboardSvg} />
                        <NavLink to={url} exact={true} activeClassName="is-active">Dashboard</NavLink>
                    </div>
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={AddAppSvg} />
                        <NavLink to={`${url}/add-app`} activeClassName="is-active" >Add App</NavLink>
                    </div>
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={DraftedSvg} />
                        {draftedApps.length > 0 ? <NavLink to={`${url}/drafted-app`} activeClassName="is-active">Drafted App</NavLink> : <NavLink name="errorDrafted" to="" onClick={this.handleClick}>Drafted App</NavLink>}
                        { errorDrafted && <div className="onError">No App Drafted Yet!<img src={xCircle} /></div>}
                    </div>
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={PublishedSvg} />
                        {publishedApps.length > 0 ? <NavLink to={`${url}/published-app`} activeClassName="is-active">Published App</NavLink> : <NavLink name="errorPublished" to="" onClick={this.handleClick}>Published App</NavLink>}
                        {errorPublished && <div className="onError">No App Published Yet!<img src={xCircle} /></div>}
                    </div>
                    <div className="sidebar-mid-option">
                        <img className="sidebar-icon" src={ReviewsSvg} />
                        {reviewApps.length > 0 ? <NavLink to={`${url}/reviews`} activeClassName="is-active">Reviews</NavLink> : <NavLink name="errorReview" to="" onClick={this.handleClick}>Reviews</NavLink>}
                        {errorReview && <div className="onError">No App In-Review Yet!<img src={xCircle} /></div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(GlintHubSidebar)