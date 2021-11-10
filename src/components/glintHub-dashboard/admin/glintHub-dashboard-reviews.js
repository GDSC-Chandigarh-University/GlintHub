import React from "react";
import Send from "../../../assets/images/send.svg";
import { Firestore } from "../../../firebase";
import { v4 } from "uuid";
import { serverTimestamp } from "@firebase/firestore";
import { setDoc, doc, onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import Spinner from "../../spinner/Spinner";
import { app, firestore } from "../../config/firebaseConfig";

export default class GlintHubReviews extends React.Component {
    state = {
        messageContent: '',
        messages: [],
        firstLoad: true,
        reviewApps: this.props.apps.reviewApps,
        user: this.props.currentUser,
        currentChannel: this.props.apps.reviewApps[0],
        sendingMessage: false,
        loadingChannel: false,
        newCurrentChannel: null,
        mount: true
    }

    componentDidMount() {
        this.loadChannelMessages(this.state.currentChannel)
    }

    loadChannelMessages = (currentChannel) => {
        const Query = query(collection(Firestore, "Users", currentChannel.user.uid, "Projects", currentChannel.id, "Messages"), orderBy("timestamp", "asc"))
        onSnapshot(Query, (snapshot) => {
            this.setState(() => {
                return {
                    messages: []
                }
            })
            snapshot.docs.map((doc) => {
                this.setState((prevState) => {
                    return {
                        messages: [
                            ...prevState.messages, doc.data()
                        ]
                    }
                })
            })
        });
        if (this.state.firstLoad) {
            this.setState(() => {
                return {
                    firstLoad: false
                }
            })
        }
    }

    componentDidUpdate() {
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
            await setDoc(doc(Firestore, "Users", currentChannel.user.uid, "Projects", currentChannel.id, "Messages", newmessageId), {
                content: messageContent,
                id: newmessageId,
                user: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                },
                timestamp: serverTimestamp()
            })
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

    render() {
        const { messageContent, reviewApps, firstLoad, sendingMessage, messages, currentChannel } = this.state
        return firstLoad ? <Spinner /> : (
            <div id="glinthub-dashboard-reviews">
                <h1 className="upper-h1">Reviews</h1>
                <hr id="draft-line" />
                <div className="review-wrapper">
                    <div id="channelContainer" className="review-left">
                        {reviewApps.map((reviewApp) => {
                            return (
                                <div className="wrapper-review-card channel" onClick={() => { this.changeChannel(reviewApp) }} key={reviewApp.id}>
                                    <div className="logo-review">
                                        <img src={reviewApp.imageURL} alt="Error" />
                                    </div>
                                    <div className="content">
                                        <h1>{reviewApp.title}</h1>
                                        <p>{reviewApp.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="review-right">
                        <div id="review-message">
                            {messages.map((message) => {
                                if (message.user.uid == currentChannel.user.uid) {
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
                        <div className="search-wrapper">
                            <div className="search-box">
                                <input type="text" disabled={sendingMessage} name="messageContent" value={messageContent} onChange={this.handleChange} placeholder="Type a message..." />
                            </div>
                            <button type="button" className="search-logo btn btn-success" disabled={sendingMessage} onClick={this.sendMessage}>
                                <img src={Send} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}