import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Dashboard from "../glintHub-dashboard/glintHub-dashboard";
import GlintHubLanding from "../glintHub-landing/glintHub-landing";
import AddApp from "../glintHub-dashboard/glintHub-dashboard-add-app";
import DraftedApp from "../glintHub-dashboard/glintHub-dashboard-drafted-app";
import PublishedApp from "../glintHub-dashboard/glintHub-dashboard-published-app";
import Reviews from "../glintHub-dashboard/glintHub-dashboard-reviews";
import { AuthState } from "../config/firebase";

const Router = () => {
    const currentUser = AuthState()
    return (
        <BrowserRouter>
        {!currentUser ? <Route path="/glinthub" component={GlintHubLanding} exact="true">
            </Route> : <div><Route path="/glinthub" component={Dashboard}>
            </Route>
            <Route path="/glintub/add-app" component={AddApp}>
            </Route>
            <Route path="/published-app" component={PublishedApp}>
            </Route>
            <Route path="/drafted-app" component={DraftedApp}>
            </Route>
            <Route path="/reviews" component={Reviews}>
            </Route> </div>}
        </BrowserRouter>
    );
}

export default Router