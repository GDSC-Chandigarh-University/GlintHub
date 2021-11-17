import React from "react";
import { connect } from "react-redux";
import { doc, deleteDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase";
import Modal from "react-modal";

class GlintHubDraftedApp extends React.Component {
    state = {
        user: this.props.currentUser,
        totalProjects: null,
        publishedApps: [],
        draftedApps: [],
        reviewApps: [],
        firstLoad: true,
        modalApp: null,
        modalIsOpen: false,
        title: '',
        technology: '',
        githubURL: '',
        imageURL: '',
        description: '',
        modalLoading: true,
        modalLoaded: false,
        isMounted: true
    }

    componentDidMount() {
        if (this.state.isMounted) {
            // this.initAgain()
        }
    }

    
    componentDidUpdate() {
        if (this.state.isMounted) {
            if (this.state.modalLoaded) {
                this.onModalLoad()
            }
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
        let { modalIsOpen, title, description, githubURL, imageURL, technology, modalLoading } = this.state
        let {publishedApps} = this.props.projects
        return (
            <div id="glinthub-dashboard-published-app">
                <h1 className="upper-h1">Published Apps</h1>
                <hr id="draft-line" />
                <div className="publish-apps-wrapper">
                    <div className="line1">
                        {publishedApps.map((app) => {
                            return (
                                    <div className="app-card" key={app.id}  onClick={() => { this.modalClick(app) }}>
                                        <div className="left-side">
                                            <img src={app.imageURL} alt="" />
                                            <p>{app.title}</p>
                                        </div>
                                        <div className="right-side">
                                            <p>{app.description}</p>

                                            <p className="type-android">{app.technology}</p>
                                        </div>
                                    </div>
                            )
                        })}
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={this.closeModal}
                            ariaHideApp={false}
                        >
                            {modalLoading ? "Loading" : (<div><div>Update App</div>
                                <div>
                                    <input type="text" name="title" value={title} onChange={this.handleChange} />
                                    <input type="text" name="technology" value={technology} onChange={this.handleChange} />
                                    <input type="text" name="description" value={description} onChange={this.handleChange} />
                                    <input type="text" name="imageURL" value={imageURL} onChange={this.handleChange} />
                                    <input type="text" name="githubURL" value={githubURL} onChange={this.handleChange} />
                                </div>
                                <div>
                                    <button onClick={this.handleDeleteModal}>Delete App</button>
                                    <button onClick={this.closeModal}>Close</button>
                                </div></div>)}
                        </Modal>
                        </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(GlintHubDraftedApp)