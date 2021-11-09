import React from "react";
import EditButton from "../../../assets/images/edit.png";
import { connect } from "react-redux";
import { appsInit, setPublishedApp, setDraftedApp, setReviewApp, appsLoaded } from "../../actions";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { Firestore } from "../../../firebase";
import Spinner from "../../spinner/Spinner";

class GlintHubDraftedApp extends React.Component {
    state = {
        user: this.props.currentUser,
        totalProjects: null,
        publishedApps: [],
        draftedApps: [],
        reviewApps: [],
        firstLoad: true
    }

    componentDidMount() {
        this.props.appsInit()
        this.setState(() => {
            return {
                publishedApps: [],
                draftedApps: [],
                reviewApps: []
            }
        })
        const Query = query(collection(Firestore, "Users", this.state.user.uid, "Projects"), orderBy("timestamp", "desc"))
        onSnapshot(Query, (snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data().inReview) {
                    this.props.setReviewApp(doc.data())
                    this.setState((prevState) => {
                        return {
                            reviewApps: [
                                ...prevState.reviewApps,
                                doc.data()
                            ]
                        }
                    })
                } else if (doc.data().isDrafted) {
                    this.props.setDraftedApp(doc.data())
                    this.setState((prevState) => {
                        return {
                            draftedApps: [
                                ...prevState.draftedApps,
                                doc.data()
                            ]
                        }
                    })
                } else if (doc.data().isPublished) {
                    this.props.setPublishedApp(doc.data())
                    this.setState((prevState) => {
                        return {
                            publishedApps: [
                                ...prevState.publishedApps,
                                doc.data()
                            ]
                        }
                    })
                }
            })
            this.setState(() => {
                return {
                    totalProjects: snapshot.docs.length
                }
            })
        });
    }

    componentDidUpdate() {
        let { publishedApps, draftedApps, reviewApps, totalProjects, firstLoad } = this.state
        if (totalProjects == publishedApps.length + reviewApps.length + draftedApps.length && firstLoad) {
            this.setState(() => {
                return {
                    firstLoad: false
                }
            })
            this.props.appsLoaded()
        }
    }

    render() {
        let { draftedApps, firstLoad } = this.state
        return firstLoad ? <Spinner /> : (
            <div id="glinthub-dashboard-drafted-app">
                <div id="draft-title">
                    <h1 id="glinthub-dashboard-h1">Drafted Apps</h1>
                </div>
                <hr id="draft-line" />
                <div id="draft-container" className="container">
                    <section className="row">
                        {draftedApps.map((app) => {
                            return (
                                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                                    <div className="draft-tile" id="draft-tile-1">
                                        <div className="img-box">
                                            <img className="icon" src={app.imageURL} />
                                            <a href="#"><img className="edit" src={EditButton} /></a>
                                        </div>
                                        <div className="text-box">
                                            <span>{app.title}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </div>
        );
    }
}

export default connect(null, { appsInit, setPublishedApp, setDraftedApp, setReviewApp, appsLoaded })(GlintHubDraftedApp)