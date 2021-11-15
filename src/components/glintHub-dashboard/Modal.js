import React from "react";
import ReactModal from "react-modal";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    updateDoc,
    deleteDoc,
} from "@firebase/firestore";
import { connect } from "react-redux";
import { updateApp, deleteApp } from "../actions";
import { Firestore } from "../../firebase";

class Modal extends React.Component {
    state = {
        user: this.props.user,
        title: this.props.modalApp.title,
        technology: this.props.modalApp.technology,
        githubURL: this.props.modalApp.githubURL,
        imageURL: this.props.modalApp.imageURL,
        description: this.props.modalApp.description,
        modalApp: this.props.modalApp,
    };

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value,
            };
        });
    };
    handleUpdateModal = async () => {
        let {
            user,
            modalApp,
            title,
            technology,
            description,
            githubURL,
            imageURL,
        } = this.state;
        const data = {
            title,
            technology,
            imageURL,
            description,
            githubURL
        }
        await updateDoc(
            doc(Firestore, "Users", user.uid, "Projects", modalApp.id), data
        );
        this.props.updateApp(modalApp, data)
        this.props.closeModal();
    };

    handleDeleteModal = async () => {
        let { user, modalApp } = this.state;
        await deleteDoc(doc(Firestore, "Users", user.uid, "Projects", modalApp.id));
        this.props.deleteApp(modalApp)
        this.props.closeModal();
    };

    render() {
        let { title, description, githubURL, imageURL, technology } = this.state;
        return (
            <ReactModal
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                ariaHideApp={false}
            >
                <div>
                    <div>Update App</div>
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="technology"
                            value={technology}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="imageURL"
                            value={imageURL}
                            onChange={this.handleChange}
                        />
                        <input
                            type="text"
                            name="githubURL"
                            value={githubURL}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button onClick={this.handleUpdateModal}>Update App</button>
                        <button onClick={this.handleDeleteModal}>Delete App</button>
                        <button onClick={this.props.closeModal}>Close</button>
                    </div>
                </div>
            </ReactModal>
        );
    }
}

export default connect(null , { updateApp, deleteApp })(Modal)