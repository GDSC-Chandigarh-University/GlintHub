import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { setPublishedApp, setDraftedApp, setReviewApp, appsLoaded } from "../actions";
import { Firestore } from "../../firebase";
import Header from "../header/header";
import GlintHubSidebar from "./glintHub-dashboard-sidebar";
import GlintHubDashboard from "./glintHub-dashboard";
import GlintubAddApp from "./glintHub-dashboard-add-app";
import GlintHubDraftedApp from "./glintHub-dashboard-drafted-app";
import GlintHubPublishedApp from "./glintHub-dashboard-published-app";
import GlintHubReviews from "./glintHub-dashboard-reviews";

class Dashboard extends React.Component {
    state = {
        settingLocalStorage: true
    }

    componentDidMount() {
        this.projectsLoader()
    }

    projectsLoader = () => {
        if(localStorage.getItem("reveiwApps") || localStorage.getItem("draftedApps") || localStorage.getItem("publishedApps")) {
            var storedReviewApps = JSON.parse(localStorage.getItem("reviewApps"));
            var storedDraftedApps = JSON.parse(localStorage.getItem("draftedApps"));
            var storedPublishedApps = JSON.parse(localStorage.getItem("publishedApps"));
            console.log('loading local storage')
            storedReviewApps.map((app) => {
                this.props.setReviewApp(app)
            })
            storedDraftedApps.map((app) => {
                this.props.setDraftedApp(app)
            })
            storedPublishedApps.map((app) => {
                this.props.setPublishedApp(app)
            })
            this.props.appsLoaded()
        } else {
            const Query = query(collection(Firestore, "Users", this.props.user.uid, "Projects"), orderBy("timestamp", "desc"))
            const unSubscribe = onSnapshot(Query, (snapshot) => {
                snapshot.docs.map((doc, key) => {
                    if (doc.data().inReview) {
                        this.props.setReviewApp(doc.data())
                    } else if (doc.data().isDrafted) {
                        this.props.setDraftedApp(doc.data())
                    } else if (doc.data().isPublished) {
                        this.props.setPublishedApp(doc.data())
                    }
                    if(key + 1 == snapshot.docs.length) {
                        this.props.appsLoaded()
                        unSubscribe()
                    }
                })
            });
        }
    }

    componentDidUpdate() {
        if (!this.props.projects.isLoading && this.state.settingLocalStorage && !(localStorage.getItem("reveiwApps") || localStorage.getItem("draftedApps") || localStorage.getItem("publishedApps"))) {
            localStorage.setItem("reviewApps", JSON.stringify(this.props.projects.reviewApps))
            localStorage.setItem("draftedApps", JSON.stringify(this.props.projects.draftedApps))
            localStorage.setItem("publishedApps", JSON.stringify(this.props.projects.publishedApps))
            this.setState(() => {
                return {
                    settingLocalStorage: false
                }
            })
            console.log('setting project to local storage')
        }
    }

    render() {
        let { path } = this.props.match
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <GlintHubSidebar projects={this.props.projects}></GlintHubSidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <Switch>
                                {<Route exact path={path}>
                                    <GlintHubDashboard user={this.props.user} projects={this.props.projects}/>
                                </Route>}
                                <Route path={`${path}/add-app`}>
                                    <GlintubAddApp user={this.props.user} projects={this.props.projects}/>
                                </Route>
                                <Route path={`${path}/published-app`}>
                                    <GlintHubPublishedApp user={this.props.user} projects={this.props.projects}/>
                                </Route>
                                <Route path={`${path}/drafted-app`}>
                                    <GlintHubDraftedApp user={this.props.user} projects={this.props.projects}/>
                                </Route>
                                <Route path={`${path}/reviews`}>
                                    <GlintHubReviews currentUser={this.props.user} apps={this.props.projects}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
      user: state.user_reducer.user,
      projects: state.projects_reducer
    }
  }, { setPublishedApp, setDraftedApp, setReviewApp, appsLoaded })(Dashboard)