import React from "react";

export default class Modal extends React.Component {
    state = {
        modalApp: this.props.modalApp,
        modalIsOpen: this.props.modalIsOpen
    }
    closeModal = () => {
        this.props.closeModal()
    }
    render() {
        let { modalApp, modalIsOpen } = this.state
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={this.closeModal}
                ariaHideApp={false}
            >
                <button onClick={this.closeModal}>close</button>
                <div>Add new Channel</div>
                {/* <input type="text" name="channelName" value={this.state.channelName} onChange={this.handleChange} />
                <input type="text" name="channelDetails" value={this.state.channelDetails} onChange={this.handleChange} />
                <button onClick={this.handleSubmit}>Submit</button>
                <p>{errors}</p> */}
            </Modal>
        )
    }
}