import React from "react";
import Send from "../../assets/images/send.svg";
import { Firestore } from "../../config/firebase";
import { v4 } from "uuid";
import { serverTimestamp } from "@firebase/firestore";
import { setDoc, doc, onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import Spinner from "../spinner/Spinner";
import { getCollectionMessages, setDocMessage } from "../../config/firebase";

export default class GlintHubReviews extends React.Component {
    state = {
        messageContent: '',
        messages: [],
        firstLoad: true,
        reviewProjects: this.props.projects.reviewProjects,
        user: this.props.user,
        currentChannel: this.props.projects.reviewProjects[0],
        sendingMessage: false,
        loadingChannel: false,
        newCurrentChannel: null,
        mount: true,
        isMounted: true
    }

    componentDidMount() {
        if(this.state.isMounted) {
        this.loadChannelMessages(this.state.currentChannel)
        }
    }

    loadChannelMessages = (currentChannel) => {
        onSnapshot(getCollectionMessages(currentChannel.id), (snapshot) => {
            this.setState(() => ({ messages: [] }))
            snapshot.docs.map((doc) => {
                this.setState((prevState) => ({
                        messages: [
                            ...prevState.messages, doc.data()
                        ]
                    }))
            })
        });
        if (this.state.firstLoad) {
            this.setState(() => ({ firstLoad: false  }))
        }
    }

    componentDidUpdate() {
        if(this.state.isMounted) {
        if (this.state.newCurrentChannel) {
            if (this.state.currentChannel.id !== this.state.newCurrentChannel.id) {
                this.setState(() => {
                    return {
                        currentChannel: this.state.newCurrentChannel,
                        loadingChannel: true
                    }
                })
            }
        }
        if (this.state.currentChannel && this.state.loadingChannel) {
            this.loadChannelMessages(this.state.currentChannel)
            this.setState(() => {
                return {
                    loadingChannel: false
                }
            })
        }

        // Get the container element
        var channelContainer = document.getElementById("channelContainer");

        // Get all buttons with class="btn" inside the container
        var channels = channelContainer.getElementsByClassName("channel");

        if (this.state.mount) {
            channels[0].classList.add('active-channel')

            // Loop through the buttons and add the active class to the current/clicked button
            for (var i = 0; i < channels.length; i++) {
                channels[i].addEventListener("click", function () {
                    var current = document.getElementsByClassName("active-channel");
                    current[0].className = current[0].className.replace(" active-channel", "");
                    this.className += " active-channel";
                });
            }

            this.setState(() => {
                return {
                    mount: false
                }
            })
        }
    }
    }

    componentWillUnmount() {
        this.state.isMounted = false;
    }

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    sendMessage = async () => {
        let { user, currentChannel, messageContent } = this.state
        if (messageContent) {
            const newmessageId = v4()
            this.setState(() => {
                return {
                    sendingMessage: true
                }
            })
            const messageData = {
                content: messageContent,
                id:  currentChannel.id,
                userUid: user.uid,
                userDisplayName: user.displayName,
                userPhotoURL: user.photoURL,
                timestamp: serverTimestamp()
            }
            await setDocMessage(newmessageId, messageData)
            this.setState(() => {
                return {
                    sendingMessage: false,
                    messageContent: ''
                }
            })
        }
    }

    changeChannel = (channel) => {
        this.setState(() => {
            return {
                newCurrentChannel: channel
            }
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        document.querySelector(".search-logo").click()
    }

    render() {
        const { messageContent, reviewProjects, firstLoad, sendingMessage, messages, currentChannel } = this.state
        return firstLoad ? <Spinner /> : (
            <div id="glinthub-dashboard-reviews">
                <div className="review-wrapper">
                    <div id="channelContainer" className="review-left">
                        {reviewProjects.map((reviewApp) => {
                            return (
                                <div className="wrapper-review-card channel" onClick={() => { this.changeChannel(reviewApp) }} key={reviewApp.id}>
                                    <div className="logo-review">
                                        <img src={reviewApp.image} alt="Error" />
                                    </div>
                                    <div className="content">
                                        <h1>{reviewApp.title}</h1>
                                        <p>{reviewApp.description.substr(0, 35)}...</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="review-right">
                        <div id="review-message">
                            {messages.map((message) => {
                                if (message.userUid == currentChannel.userUid) {
                                    return (
                                        <div className="sender">
                                            {message.content}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="receiver">
                                            {message.content}
                                        </div>
                                    )
                                }
                                
                            })}
                        </div>
                        <form className="search-wrapper" onSubmit={this.onSubmit}>
                                <div className="search-box">
                                    <input type="text" disabled={sendingMessage} name="messageContent" value={messageContent} onChange={this.handleChange} placeholder="Type a message..." />
                                </div>
                                <button type="button" className="search-logo btn btn-success" disabled={sendingMessage} onClick={this.sendMessage}>
                                    <img src={Send} alt="" />
                                </button>
                            </form>
                    </div>
                </div>
            </div>
        );
    }
}