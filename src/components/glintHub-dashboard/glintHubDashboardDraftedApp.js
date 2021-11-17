import React from "react";
import EditButton from "../../assets/images/edit.png";
import { connect } from "react-redux";
import Modal from "./Modal";



class GlintHubDraftedApp extends React.Component {
    state = {
        user: this.props.user,
        projects: this.props.projects,
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
        let {draftedProjects} = this.props.projects
        return  (
            <div id="glinthubDashboardDraftedApp">
            <h1>Drafted Apps</h1>
                <hr className="hrLine" />
                    <section className="grid">
                        {draftedProjects.map((project) => {
                            return (
                                <div className="grid-column" key={project.id} onClick={() => { this.modalClick(project) }}>
                                        <div className="img-box">
                                            <img src={project.image} alt={project.title}/>
                                        </div>
                                        <div className="text-box">
                                            <span>{project.title}</span>
                                        </div>
                                </div>
                            )
                        })}
                        {this.state.modalIsOpen && <Modal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} user={this.props.user} projects={this.props.projects} modalApp={this.state.modalApp} />}
                    </section>
                </div>
        );
    }
}


export default connect(null)(GlintHubDraftedApp)