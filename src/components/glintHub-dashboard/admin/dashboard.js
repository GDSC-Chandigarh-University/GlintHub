import React from "react";
import GlintHubSidebar from "./glintHub-dashboard-sidebar";
import Header from "../../header/header";
import { Switch, Route, withRouter } from "react-router-dom";
import GlintubAddApp from "./glintHub-dashboard-add-app";
import GlintHubDashboard from "./glintHub-dashboard";
import GlintHubPublishedApp from "./glintHub-dashboard-published-app";
import GlintHubDraftedApp from "./glintHub-dashboard-drafted-app";
import GlintHubReviews from "./glintHub-dashboard-reviews";
import { connect } from "react-redux";
import Spinner from "../../spinner/Spinner";

class Dashboard extends React.Component {
    render() {
        let { path } = this.props.match
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <GlintHubSidebar apps={this.props.apps}></GlintHubSidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <Switch>
                                {<Route exact path={path}>
                                    <GlintHubDashboard currentUser={this.props.currentUser}/>
                                </Route>}
                                <Route path={`${path}/add-app`}>
                                    <GlintubAddApp currentUser={this.props.currentUser} apps={this.props.apps}/>
                                </Route>
                                <Route path={`${path}/published-app`}>
                                    <GlintHubPublishedApp currentUser={this.props.currentUser}/>
                                </Route>
                                <Route path={`${path}/drafted-app`}>
                                    <GlintHubDraftedApp currentUser={this.props.currentUser}/>
                                </Route>
                                <Route path={`${path}/reviews`}>
                                    <GlintHubReviews currentUser={this.props.currentUser} apps={this.props.apps}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state) => {
    return {
      currentUser: state.user.currentUser,
      apps: state.apps
    }
  })(Dashboard))