import React from "react";
import ReviewCard from "./review-card";
import Orbus from "../../assets/images/Orbus.png"
import Send from "../../assets/images/send.svg"

export default class GlintHubReviews extends React.Component {
    render() {
        return (
            <div id="glinthub-dashboard-reviews">
                <h1 className="upper-h1">Reviews</h1>
                <hr id="draft-line" />
                <div className="review-wrapper">
                    <div className="review-left">
                        <ReviewCard heading={"Orbus"} para={"Avenge - For the family"} image={Orbus} />
                    </div>
                    <div className="review-right">
                        <div className="sender">
                            Hey Ade, <br />
                            We’ve gone through your awesome game.
                            Great work. But there are few minor bugs.
                            Can you fix them? A detailed bug report
                            is already sent on your email, please check.
                        </div>
                        <div className="receiver">
                            Yeah sure, <br />
                            I’ll fix those bugs and update the package.
                            Thanks for your support!
                        </div>
                        <div className="search-wrapper">
                            <div className="search-box">
                                <input type="text" placeholder="Type a message..." />
                            </div>
                            <div className="search-logo">
                                <img src={Send} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}