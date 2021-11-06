import React from "react";
import { NavLink, useRouteMatch } from 'react-router-dom'
import AddAppSvg from "../../assets/images/add-svg.svg"
import DashboardSvg from "../../assets/images/dashboard-svg.svg"
import DraftedSvg from "../../assets/images/drafted-svg.svg"
import PublishedSvg from "../../assets/images/published-svg.svg"
import ReviewsSvg from "../../assets/images/review-svg.svg"

export default function GlintHubSidebar() {
    let { url } = useRouteMatch();
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
                    <NavLink to={`${url}/drafted-app`} activeClassName="is-active">Drafted App</NavLink>
                </div>
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src={PublishedSvg} />
                    <NavLink to={`${url}/published-app`} activeClassName="is-active">Published App</NavLink>
                </div>
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src={ReviewsSvg} />
                    <NavLink to={`${url}/reviews`} activeClassName="is-active">Reviews</NavLink>
                </div>
            </div>
        </div>
    );
}