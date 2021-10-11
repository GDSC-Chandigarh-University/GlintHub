import React from "react";
import LandingTop from "./landing-top";
// import LandingEvent from "./landing-events";
// import LandingFooter from "./landing-footer";
// import ClubsToJoin from "./clubstojoin";
// import EventOrganised from "./event-organised";

export default class Landing extends React.Component {
    render(){
        return (
            <div id="landing">
            <LandingTop/>
            {/* <LandingEvent/>
            <EventOrganised/>
            <ClubsToJoin/>
            <LandingFooter/> */}
  </div>
        );
    }
}