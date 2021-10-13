import React from "react";
import Sidebar from "./glintHub-dashboard-sidebar";
import Header from "../header/header"
import ReviewCard from "./review-card";


export default class Reviews extends React.Component {
    render() {
        return (
            <div>
                <Header></Header>
                <div id="root">
                    <Sidebar></Sidebar>
                    <div id="root-1">
                        <div className="upper-div">
                            <div id="glinthub-dashboard-reviews">
                                <h1 className="upper-h1">Reviews</h1>
                                <hr id="draft-line" />
                                <div className="review-wrapper">
                                    <div className="review-left">
                                        <ReviewCard heading={"Orbus"} para={"Avenge - For the family"} image={"./main-dashboard/Rectangle 32.png"} />
                                        <ReviewCard heading={"Left n Right"} para={"A mediational game"} image={"./main-dashboard/Rectangle 33.png"} />
                                        <ReviewCard heading={"Covid19"} para={"Stay home, stay safe"} image={"./main-dashboard/Rectangle 34.png"} />
                                        <ReviewCard heading={"Hang on"} para={"Bring back culture"} image={"./main-dashboard/Rectangle 35.png"} />
                                        <ReviewCard heading={"Codera"} para={"Education without price tag"} image={"./main-dashboard/Rectangle 36.png"} />
                                    </div>
                                    <div className="review-right">
                                        <div className="sender">
                                            Hey Ade, <br/>
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
                                                <input type="text" placeholder="Type a message..."/>
                                            </div>
                                            <div className="search-logo">
                                                <img src="./main-dashboard/send.svg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}