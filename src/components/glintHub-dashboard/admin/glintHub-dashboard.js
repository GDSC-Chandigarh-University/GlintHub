import React from "react";
import { Link, withRouter } from "react-router-dom";
import AddApp from "../../../assets/images/plus.png";
import { connect } from "react-redux";
import { appsInit, setPublishedApp, setDraftedApp, setReviewApp, appsLoaded } from "../../actions";
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, collectionGroup } from "@firebase/firestore";
import { Firestore } from "../../../firebase";
import Spinner from "../../spinner/Spinner";
import noProject from "../../../assets/images/no-project.png";
import Modal from "react-modal";

class GlintHubDashboard extends React.Component {
    state = {
        totalProjects: null,
        publishedApps: [],
        draftedApps: [],
        reviewApps: [],
        firstLoad: true,
        isMounted: true,
        modalApp: null,
        modalIsOpen: false,
        title: '',
        technology: '',
        githubURL: '',
        imageURL: '',
        description: '',
        modalLoading: true,
        modalLoaded: false,
    }

    componentDidMount() {
        if (this.state.isMounted) {
            this.initAgain()
        }
    }

    initAgain = () => {
        this.props.appsInit()
        this.setState(() => {
            return {
                publishedApps: [],
                draftedApps: [],
                reviewApps: []
            }
        })
        const Query = query(collectionGroup(Firestore, "Projects"), orderBy("timestamp", "desc"))
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
        if (this.state.isMounted) {
            let { publishedApps, draftedApps, reviewApps, totalProjects, firstLoad, modalLoaded } = this.state
            if (totalProjects == publishedApps.length + reviewApps.length + draftedApps.length  && firstLoad) {
                this.setState(() => {
                    return {
                        firstLoad: false
                    }
                })
                this.props.appsLoaded()
            }
            if (modalLoaded) {
                this.onModalLoad()
            }
            console.log(totalProjects, publishedApps.length, reviewApps.length, draftedApps.length)
        }
    }

    componentWillUnmount() {
        this.state.isMounted = false;
    }

    modalClick = (app) => {
        this.setState(() => {
            return {
                modalApp: app,
                modalIsOpen: true,
                modalLoading: false,
                modalLoaded: true
            }
        })
    }

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {
                modalIsOpen: false
            }
        })
    }

    handlePublishModal = async () => {
        let { user, modalApp } = this.state
        await updateDoc(doc(Firestore, "Users", modalApp.user.uid, "Projects", modalApp.id), {
            isPublished: true,
            inReview: false
        })
        this.initAgain()
        this.closeModal()
    }

    handleDeleteModal = async () => {
        let { user, modalApp } = this.state
        await deleteDoc(doc(Firestore, "Users", user.uid, "Projects", modalApp.id))
        this.initAgain()
        this.closeModal()
    }

    onModalLoad = () => {
        console.log(this.state.modalApp)
        this.setState(() => {
            return {
                modalLoaded: false,
                title: this.state.modalApp.title,
                technology: this.state.modalApp.technology,
                description: this.state.modalApp.description,
                githubURL: this.state.modalApp.githubURL,
                imageURL: this.state.modalApp.imageURL
            }
        })
    }

    render() {
        let { url } = this.props.match
        let { publishedApps, modalApp, reviewApps, firstLoad, modalIsOpen, title, description, githubURL, imageURL, technology, modalLoading } = this.state
        return firstLoad ? <Spinner /> : (
            <div id="glinthub-dashboard">
                <div className="headingDash glinthub-dashboard-bold glinthub-dashboard-h1" id="board">Dashboard</div>
                <div className="dash-container-1 glinthub-dashboard-bold">
                    {/* upper boxes */}
                    <div className="bx-1">
                        <div className="up-bx">Published Apps</div>
                        <div className="dash-num">{publishedApps.length}</div>
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
                        <Link to={`${url}/published-app`}><span id="vie">View All</span></Link>
                    </div>

                    <div className="bx-2">
                        {publishedApps.map((app) => {
                            return (
                                <div key={app.id} onClick={() => { this.modalClick(app) }} className="img-icn"><img src={app.imageURL} alt="Error" /></div>
                            )
                        })}
                    </div>
                </div>}
                {reviewApps.length > 0 && <div className="dash-container-2">
                    {/* <!-- Upper part --> */}
                    <div className="dashUp-1">
                        <span id="pr">In-reveiw Apps</span>
                        <Link to={`${url}/reviews`}><span id="vie">View All</span></Link>
                    </div>

                    <div className="bx-2">
                        {reviewApps.slice(0,5).map((app) => {
                            return (
                                <div key={app.id} onClick={() => { this.modalClick(app) }} className="img-icn"><img src={app.imageURL} alt="Error" /></div>
                            )
                        })}
                        <Link to={`${url}/add-app`} className="img-icn-plus" ><img src={AddApp} width="33px" height="31px" alt="Error" /></Link>
                    </div>
                </div>}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                >
                    {modalLoading ? "Loading" : (<div><div>Update App</div>
                    <div>
                        <img src={modalApp.user.photoURL}/>
                        <span><h1>{modalApp.user.displayName}</h1></span>
                    </div>
                        <div>
                            <input type="text" disabled name="title" value={title} onChange={this.handleChange} />
                            <input type="text" disabled name="technology" value={technology} onChange={this.handleChange} />
                            <input type="text" disabled name="description" value={description} onChange={this.handleChange} />
                            <input type="text" disabled name="imageURL" value={imageURL} onChange={this.handleChange} />
                            <input type="text" disabled name="githubURL" value={githubURL} onChange={this.handleChange} />
                        </div>
                        <div>
                            <button onClick={this.handlePublishModal}>Publish App</button>
                            <button onClick={this.handleDeleteModal}>Delete App</button>
                            <button onClick={this.closeModal}>Close</button>
                        </div></div>)}
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect(null, { appsInit, setPublishedApp, setDraftedApp, setReviewApp, appsLoaded })(GlintHubDashboard))