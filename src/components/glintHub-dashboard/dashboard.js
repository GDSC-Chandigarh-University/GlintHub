import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getDocs, onSnapshot } from "@firebase/firestore";
import { setPublishedProject, setDraftedProject, setReviewProject, projectsLoaded, projectsInit } from "../actions";
import { getCollectionProjects } from "../../firebase";
import Header from "../header/header";
import GlintHubSidebar from "./glintHubDashboardSidebar";
import GlintHubDashboard from "./glintHubDashboard";
import GlintubDashboardAddApp from "./glintHubDashboardAddApp";
import GlintHubDraftedApp from "./glintHubDashboardDraftedApp";
import GlintHubPublishedApp from "./glintHub-dashboard-published-app";
import GlintHubReviews from "./glintHub-dashboard-reviews";


class Dashboard extends React.Component {
    state = {
        settingLocalStorage: true
    }


    componentDidMount() {
        this.projectsLoader()
    }

    componentWillUnmount() {
        console.log('unmounted')
        this.props.projectsInit()
    }


    projectsLoader = async () => {
        // console.log(this.props.user.uid)
        const getLocalPublishedProjects = JSON.parse(localStorage.getItem("publishedProjects"));
        const getLocalDraftedProjects = JSON.parse(localStorage.getItem("draftedProjects"));
        const getLocalReviewProjects = JSON.parse(localStorage.getItem("reviewProjects"));
        // getLocalPublishedProjects || getLocalDraftedProjects || getLocalReviewProjects
        if (getLocalPublishedProjects || getLocalDraftedProjects || getLocalReviewProjects) {
            console.log("local project present")
            const snapshot = await getDocs(getCollectionProjects(this.props.user.uid))
                console.log(snapshot)
                if (snapshot.docs.length != getLocalPublishedProjects.length + getLocalDraftedProjects.length + getLocalReviewProjects.length) {
                    console.log(snapshot.docs.length, getLocalPublishedProjects.length + getLocalDraftedProjects.length + getLocalReviewProjects.length, this.props.projects.draftedProjects.length + this.props.projects.reviewProjects.length + this.props.projects.publishedProjects.length)
                    console.log('firebase and local storage are different')
                    console.log("Setting up new data");
                //     console.log(getLocalReviewProjects)
                    snapshot.docs.map((doc, key) => {
                        // Fututre Optimization Load only those projects which are not present in Local Storage
                        if (doc.data().projectStatus == 'isPublished') {
                            this.props.setPublishedProject(doc.data())
                        } else if (doc.data().projectStatus == 'isDrafted') {
                            this.props.setDraftedProject(doc.data())
                        } else if (doc.data().projectStatus == 'inReview') {
                            this.props.setReviewProject(doc.data())
                        }
                        if (key + 1 == snapshot.docs.length) { // key starts from 0
                            console.log("setting up new data completed")
                            this.props.projectsLoaded()
                        }
                    })
                    if (snapshot.docs.length == 0) { // key starts from 0
                        this.props.projectsLoaded()
                    }
                    this.setState(() => ({ settingLocalStorage: false }))
                }
                else {
                    console.log(getLocalReviewProjects, getLocalPublishedProjects, getLocalDraftedProjects)
                    console.log('loading local storage');
                    getLocalPublishedProjects.map((project) => {
                        this.props.setPublishedProject(project)
                    })
                    getLocalDraftedProjects.map((project) => {
                        this.props.setDraftedProject(project)
                    })
                    getLocalReviewProjects.map((project) => {
                        this.props.setReviewProject(project)
                    })
                    this.setState(() => ({ settingLocalStorage: false }))
                    this.props.projectsLoaded()
                }
        } else {
            const snapshot = getDocs(getCollectionProjects(this.props.user.uid))
                // console.log(snapshot)
                console.log('errorplace')
                snapshot.docs.map((doc, key) => {
                    if (doc.data().projectStatus == 'inReview') {
                        this.props.setReviewProject(doc.data())
                    } else if (doc.data().projectStatus == 'isDrafted') {
                        this.props.setDraftedProject(doc.data())
                    } else if (doc.data().projectStatus == 'isPublished') {
                        this.props.setPublishedProject(doc.data())
                    }
                    if (key + 1 == snapshot.docs.length) {
                        console.log('errorplace')
                        this.props.projectsLoaded()
                    }
                })
        }
    }


    componentDidUpdate() {
        // Updating Local Storage with New Data if any
        if (!this.props.projects.isLoading && this.state.settingLocalStorage) {
            console.log("Setting project to local storage", this.state.settingLocalStorage)
            localStorage.setItem("reviewProjects", JSON.stringify(this.props.projects.reviewProjects))
            localStorage.setItem("draftedProjects", JSON.stringify(this.props.projects.draftedProjects))
            localStorage.setItem("publishedProjects", JSON.stringify(this.props.projects.publishedProjects))
            console.log('errorplace')
            this.setState(() => {
                return {
                    settingLocalStorage: false
                }
            })
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
                                    <GlintHubDashboard user={this.props.user} projects={this.props.projects} />
                                </Route>}
                                <Route path={`${path}/addApp`}>
                                    <GlintubDashboardAddApp user={this.props.user} projects={this.props.projects} />
                                </Route>
                                <Route path={`${path}/publishedApp`}>
                                    <GlintHubPublishedApp user={this.props.user} projects={this.props.projects} />
                                </Route>
                                <Route path={`${path}/draftedApp`}>
                                    <GlintHubDraftedApp user={this.props.user} projects={this.props.projects} />
                                </Route>
                                <Route path={`${path}/reviewApp`}>
                                    <GlintHubReviews user={this.props.user} projects={this.props.projects} />
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
}, { setPublishedProject, setDraftedProject, setReviewProject, projectsLoaded, projectsInit })(Dashboard)