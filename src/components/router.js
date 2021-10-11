import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import Landing from "../landing/landing";
import Error from "./error";
import AddApp from "./add-app";
import DraftedApp from "./drafted-app";
import PublishedApp from "./published-app";
import Reviews from "./reviews";

const Router = (props) => {
    console.log(props);
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact="true">
            </Route>
            <Route path="/glinthub" component={Dashboard}>
            </Route>
            <Route path="/add-app" component={AddApp}>
            </Route>
            <Route path="/published-app" component={PublishedApp}>
            </Route>
            <Route path="/drafted-app" component={DraftedApp}>
            </Route>
            <Route path="/reviews" component={Reviews}>
            </Route>
        </BrowserRouter>
    );
}

export default Router