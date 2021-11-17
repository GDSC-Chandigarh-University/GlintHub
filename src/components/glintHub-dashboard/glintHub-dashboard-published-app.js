import React from "react";
import { connect } from "react-redux";
import { doc, deleteDoc } from "@firebase/firestore";
import { Firestore } from "../../firebase";
import Modal from "./Modal";

class GlintHubDraftedApp extends React.Component {
    state = {
        user: this.props.currentUser,       
        modalApp: null,
        modalIsOpen: false,
    }

    modalClick = (app) => {
        console.log(app)
        this.setState(() => ({
            modalApp: app,
            modalIsOpen: true,
        }))
    }

    closeModal = () => {
        this.setState(() => ({ modalIsOpen: false }))
    }

    render() {
        let { modalIsOpen } = this.state
        let {publishedProjects} = this.props.projects
        return (
            <div id="glinthub-dashboard-published-app">
                <h1 className="upper-h1">Published Apps</h1>
                <hr id="draft-line" />
                <div className="publish-apps-wrapper">
                    <div className="line1">
                        {publishedProjects.map((app) => {
                            return (
                                    <div className="app-card" key={app.id}  onClick={() => { this.modalClick(app) }}>
                                        <div className="left-side">
                                            <img src={app.image} alt="" />
                                            <p>{app.title}</p>
                                        </div>
                                        <div className="right-side">
                                            <p>{app.description}</p>

                                            <p className="Bold">{app.techUsed}</p>
                                        </div>
                                    </div>
                            )
                        })}
                        </div>
                        {this.state.modalIsOpen && <Modal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} user={this.props.user} projects={this.props.projects} modalApp={this.state.modalApp} />}
                </div>
            </div>
        );
    }
}

export default connect(null)(GlintHubDraftedApp)