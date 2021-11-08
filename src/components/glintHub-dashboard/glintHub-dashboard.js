import React from "react";
import { Link, withRouter } from "react-router-dom";
import Orbus from "../../assets/images/Orbus.png";
import AddApp from "../../assets/images/plus.png";
import { connect } from "react-redux";
import { appsInit, setPublishedApp, setDraftedApp, setReviewApp, appsLoaded } from "../actions";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { Firestore } from "../../firebase";
import Spinner from "../spinner/Spinner";
import noProject from "../../assets/images/no-project.png"

class GlintHubDashboard extends React.Component {
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
        if(totalProjects == publishedApps.length + reviewApps.length + draftedApps.length && firstLoad) {
            console.log('Pump')
            this.setState(() => {
                return {
                    firstLoad: false
                }
            })
            this.props.appsLoaded()
        }
    }

    render() {
        let { url } = this.props.match
        let { publishedApps, draftedApps, reviewApps, firstLoad } = this.state
        return firstLoad ? <Spinner/> : (publishedApps.length > 0 && draftedApps.length > 0 && reviewApps.length > 0) ? (
            <div id="glinthub-dashboard">
                <div className="headingDash glinthub-dashboard-bold glinthub-dashboard-h1" id="board">Dashboard</div>
                <div className="dash-container-1 glinthub-dashboard-bold">
                    {/* upper boxes */}
                    <div className="bx-1">
                        <div className="up-bx">Published Apps</div>
                        <div className="dash-num">{publishedApps.length}</div>
                    </div>

                    <div className="bx-1 bx-clr-2">
                        <div className="up-bx">Drafted Apps</div>
                        <div className="dash-num">{draftedApps.length}</div>
                    </div>

                    <div className="bx-1 bx-clr-3">
                        <div className="up-bx">In-Review Apps</div>
                        <div className="dash-num">{reviewApps.length}</div>
                    </div>
                </div>

                {publishedApps.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">Published Apps</span>
                        <span id="vie">View All</span>
                    </div>

                    <div className="bx-2">
                        {publishedApps.map((app) => {
                            return (
                                <div key={app.id} className="img-icn"><img src={Orbus} alt="Error" /></div>
                            )
                        })}
                        <Link to={`${url}/add-app`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                    </div>
                </div>}
                {draftedApps.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">Drafted Apps</span>
                        <span id="vie">View All</span>
                    </div>

                    <div className="bx-2">
                        {draftedApps.map((app) => {
                            return (
                                <div key={app.id} className="img-icn"><img src={Orbus} alt="Error" /></div>
                            )
                        })}
                        <Link to={`${url}/add-app`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                    </div>
                </div>}
                {reviewApps.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">In-reveiw Apps</span>
                        <span id="vie">View All</span>
                    </div>

                    <div className="bx-2">
                        {reviewApps.map((app) => {
                            return (
                                <div key={app.id} className="img-icn"><img src={Orbus} alt="Error" /></div>
                            )
                        })}
                        <Link to={`${url}/add-app`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                    </div>
                </div>}
            </div>
        ) : (
        <div id="glinthub-dashboard">
            <div className="headingDash glinthub-dashboard-bold glinthub-dashboard-h1" id="board">Dashboard</div>
            <img src={noProject}/>
        </div>);
    }
}

export default withRouter(connect(null, { appsInit, setPublishedApp, setDraftedApp, setReviewApp, appsLoaded })(GlintHubDashboard))