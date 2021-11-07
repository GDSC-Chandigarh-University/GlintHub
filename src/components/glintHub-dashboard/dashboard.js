import React from "react";
import GlintHubSidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header"
import { Switch, Route, useRouteMatch } from "react-router-dom";
import GlintubAddApp from "./glintHub-dashboard-add-app";
import GlintHubDashboard from "./glintHub-dashboard";
import GlintHubPublishedApp from "./glintHub-dashboard-published-app";
import GlintHubDraftedApp from "./glintHub-dashboard-drafted-app";
import GlintHubReviews from "./glintHub-dashboard-reviews";

export default function Dashboard() {
    let { path } = useRouteMatch();
    console.log(path)
    return (
        <div>
            <Header></Header>
            <div id="root">
                <GlintHubSidebar></GlintHubSidebar>
                <div id="root-1">
                    <div className="upper-div">
                        <Switch>
                            <Route exact path={path}>
                                <GlintHubDashboard/>
                            </Route>
                            <Route path={`${path}/add-app`}>
                                <GlintubAddApp/>
                            </Route>
                            <Route path={`${path}/published-app`}>
                                <GlintHubPublishedApp/>
                            </Route>
                            <Route path={`${path}/drafted-app`}>
                                <GlintHubDraftedApp/>
                            </Route>
                            <Route path={`${path}/reviews`}>
                                <GlintHubReviews/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}