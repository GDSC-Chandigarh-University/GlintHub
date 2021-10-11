import React from "react";
import { NavLink } from 'react-router-dom'

export default class Sidebar extends React.Component {
    render() {
        return (
            <div id="sidebar">
            <div id="sidebar-mid">
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src="./dashboard-svg.svg" />
                    <NavLink to="/glinthub" exact="true" activeClassName="is-active">Dashboard</NavLink>
                </div>
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src="./add-svg.svg" />
                    <NavLink to="/add-app" activeClassName="is-active" >Add App</NavLink>
                </div>
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src="./drafted-svg.svg" />
                    <NavLink to="/drafted-app" activeClassName="is-active">Drafted App</NavLink>
                </div>
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src="./published-svg.svg" />
                    <NavLink to="/published-app" activeClassName="is-active">Published App</NavLink>
                </div>
                <div className="sidebar-mid-option">
                    <img className="sidebar-icon" src="./review-svg.svg" />
                    <NavLink to="/reviews" activeClassName="is-active">Reviews</NavLink>
                </div>
            </div>
        </div>
        );
    }
}