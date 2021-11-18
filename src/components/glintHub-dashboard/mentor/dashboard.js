import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { onSnapshot } from "@firebase/firestore";
import { setPublishedProject, setDraftedProject, setReviewProject, projectsLoaded } from "../../actions";
import { getAllCollectionProjects } from "../../../firebase";
import Header from "../../header/header";
import GlintHubSidebar from "./glintHubDashboardSidebar";
import GlintHubDashboard from "./glintHubDashboard";
import GlintHubPublishedApp from "./glintHub-dashboard-published-app";
import GlintHubReviews from "./glintHub-dashboard-reviews";


class AdminDashboard extends React.Component {
    state = {
        settingLocalStorage: true
    }


    componentDidMount() {
        this.projectsLoader()
    }

    componentWillUnmount() {
        console.log('unmounted')
    }


    projectsLoader = () => {
        console.log(this.props.user.uid)
        const getLocalPublishedProjects = JSON.parse(localStorage.getItem("publishedProjects"));
        const getLocalDraftedProjects = JSON.parse(localStorage.getItem("draftedProjects"));
        const getLocalReviewProjects = JSON.parse(localStorage.getItem("reviewProjects"));
        console.log(this.props.projects)
        // getLocalPublishedProjects || getLocalDraftedProjects || getLocalReviewProjects
        if (false) {
            const unSubscribe = onSnapshot(getAllCollectionProjects(this.props.user.uid), (snapshot) => {
                // console.log(snapshot)
                console.log(getLocalReviewProjects)
                if (snapshot.docs.length != getLocalPublishedProjects.length + getLocalDraftedProjects.length + getLocalReviewProjects.length) {
                    console.log(snapshot.docs.length, getLocalPublishedProjects.length + getLocalDraftedProjects.length + getLocalReviewProjects.length, this.props.projects.draftedProjects.length + this.props.projects.reviewProjects.length + this.props.projects.publishedProjects.length)
                    // console.log("Setting up new data");
                    console.log(getLocalReviewProjects)
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
                            console.log(getLocalReviewProjects)
                            console.log('errorplace')
                            this.props.projectsLoaded()
                            unSubscribe()
                        }
                    })
                    if (snapshot.docs.length == 0) { // key starts from 0
                        console.log(getLocalReviewProjects)
                        console.log('errorplace')
                        this.props.projectsLoaded()
                        unSubscribe()
                    }
                }
                else {
                    // console.log(getLocalReviewProjects, getLocalPublishedProjects, getLocalDraftedProjects)
                    // console.log('loading local storage');
                    console.log('errorplace')
                    getLocalPublishedProjects.map((project) => {
                        this.props.setPublishedProject(project)
                    })
                    getLocalDraftedProjects.map((project) => {
                        this.props.setDraftedProject(project)
                    })
                    getLocalReviewProjects.map((project) => {
                        this.props.setReviewProject(project)
                    })
                    console.log('errorplace')
                    this.props.projectsLoaded()
                    this.setState(() => ({ settingLocalStorage: false }))
                }
            });
        } else {
            const unSubscribe = onSnapshot(getAllCollectionProjects, (snapshot) => {
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
                        unSubscribe()
                    }
                })
            });
        }
    }


    componentDidUpdate() {
        // Updating Local Storage with New Data if any
        // if (!this.props.projects.isLoading && this.state.settingLocalStorage) {
        //     localStorage.setItem("reviewProjects", JSON.stringify(this.props.projects.reviewProjects))
        //     localStorage.setItem("draftedProjects", JSON.stringify(this.props.projects.draftedProjects))
        //     localStorage.setItem("publishedProjects", JSON.stringify(this.props.projects.publishedProjects))
        //     console.log('errorplace')
        //     this.setState(() => {
        //         return {
        //             settingLocalStorage: false
        //         }
        //     })
        //     // console.log("Setting project to local storage")
        // }
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
                                <Route path={`${path}/publishedApp`}>
                                    <GlintHubPublishedApp user={this.props.user} projects={this.props.projects} />
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
}, { setPublishedProject, setDraftedProject, setReviewProject, projectsLoaded })(AdminDashboard)