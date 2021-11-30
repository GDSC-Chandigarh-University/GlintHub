import React from "react";
import { connect } from "react-redux";
import { doc, deleteDoc } from "@firebase/firestore";
import { Firestore } from "../../config/firebase";
import Modal from "./Modal";
import ProjectCard from "../projectCard"


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
        let { publishedProjects } = this.props.projects
        return (
            <div id="glinthub-dashboard-published-app">
                <h1>Published Apps</h1>
                <hr className="hrLine" />
                <div className="projectDashboardGrid">
                        {publishedProjects.map((app) => {
                            return (
                                <div className="grid-column" key={app.id} onClick={() => { this.modalClick(app) }}>
                                    <ProjectCard project={app} />
                                </div>
                            )
                        })}
                    {this.state.modalIsOpen && <Modal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} user={this.props.user} projects={this.props.projects} modalApp={this.state.modalApp} />}
                </div>
            </div>
        );
    }
}

export default connect(null)(GlintHubDraftedApp)