import React from "react";
import { Link, withRouter } from "react-router-dom"; // If the user present then redirects it to /dashboard
import { googleAuthLogin, googleAuthLogout } from "../config/firebase";
import glintHubLogo from "../assets/images/glintHubLogo.svg";
import arrow from "../assets/images/arrow.svg";
import logOut from "../assets/images/logOut.svg";
import xCircle from "../assets/images/x-circle.svg";


class Header extends React.Component {
    state = {
        openProfile: false,
        error: false // Changed to error message
    }


    componentDidMount() {
        { (this.props.user && this.props.activeLink === "glintHub") && this.props.history.push("/glintHub") }
        window.addEventListener("click", (event) => {
            if (event && event.target) {
                // console.log( event.target == "html")
                try {
                    if (event.target.id !== "profile" && event.target.parentNode.id !== "profile" && event.target.id !== "profileDropdown" && event.target.parentNode.id !== "profileDropdown" && event.target.parentNode.parentNode.id !== "profileDropdown" && event.target.parentNode.parentNode.parentNode.id !== "profileDropdown") {
                        this.setState(() => ({ openProfile: false }))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }


    openProfile = () => {
        this.setState((prevState) => ({ openProfile: !prevState.openProfile }))
    }


    disableScroll = () => {
        if (!this.props.user) {
            if (document.body.style.overflow === "hidden") {
                document.body.style.overflow = "auto"
            }
            else {
                document.body.style.overflow = "hidden"
            }
        }
        setTimeout(() => {
            document.querySelector('#menu').querySelector('.menu').scrollTo({  // For mobile view
                top: 0,
                behavior: "smooth"
            });
        }, 150)
    }


    closeMenu = () => {
        document.getElementById("menuInput").click()
        setTimeout(() => {
            document.querySelector('#menu').querySelector('.menu').scrollTo({  // For mobile view
                top: 0,
                behavior: "smooth"
            });
        }, 150)
    }


    handleClick = (event) => {
        event.preventDefault()
        document.querySelector('#menu').querySelector('.menu').scrollTo({  // For mobile view
            top: 0,
            behavior: "smooth"
        });
        this.setState(() => ({ error: `No App ${event.target.name} Yet!` }))
        setTimeout(() => {
            this.setState(() => ({ error: false }))
        }, 2000)
    }


    userStepperOut = () => {
        if (this.props.activeLink === "userStepper") {
            googleAuthLogout().then(() => {
                window.location.reload()
            })
            this.closeMenu()
        }
    }


    render() {
        const { user, projects, activeLink } = this.props
        const { openProfile, error } = this.state
        const { url } = this.props.match
        return (
            <div id="header">
                {error && <div className="redSignal">{error}<img src={xCircle} /></div>}
                <Link to={user ? "/glintHub" : "/"}>
                    {activeLink === "userStepper" ? <img className="logo" src={glintHubLogo} alt="glintHub Logo" onClick={this.userStepperOut} /> : <img className="logo" src={glintHubLogo} alt="glintHub Logo" />}
                </Link>
                <div id="navbar">
                    <Link to="/liveSoon" onClick={this.userStepperOut} target="_blank">GDSC CU</Link>
                    <Link onClick={this.userStepperOut} to={activeLink === "userStepper" ? "/glintHubSpace" : activeLink !== "glintHub" ? "/glintHub" : "/glintHubSpace"}>{activeLink === "userStepper" ? "GlintHub Space" : activeLink !== "glintHub" ? "GlintHub" : "GlintHub Space"}</Link>
                    <Link onClick={this.userStepperOut} to={activeLink !== "glintHubStreak" ? "/glintHubStreak" : "/glintHubSpace"}>{activeLink !== "glintHubStreak" ? "GlintHub Streak" : "GlintHub Space"}</Link>
                    <a href="https://gdsc.community.dev/chandigarh-university-chandigarh/" target="_blank">Join Our Community</a>
                    {user ? (<div>
                        <div id="profile" onClick={this.openProfile}>
                            <img className="profileImg" src={user.image ? user.image : user.photoURL} alt="User" />
                            <img className="arrow" src={arrow} alt="Arrow Dropdown" />
                        </div>
                        {openProfile && <div id="profileDropdown">
                            <div className="userInfo mb-3">
                                <img className="profileImg" src={user.image ? user.image : user.photoURL} alt="User" />
                                <div>
                                    <p className="medium">{user.firstName ? `${user.firstName} ${user.lastName}` : user.displayName}</p>
                                    <p className="small">{user.role ? user.role : "Student"}</p>
                                </div>
                            </div>
                            <Link to={`/userProfile/${user.uid}`}>Edit Profile</Link>
                            <a href="/" onClick={googleAuthLogout}>Log out</a>
                        </div>}
                    </div>) :
                        <span className="mr-3" onClick={googleAuthLogin}>Sign In</span>}
                </div>
                <input type="checkbox" id="menuInput" />
                <label id="burger" htmlFor="menuInput" onClick={this.disableScroll}>
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
                <div id="menu">
                    <div className="menu">
                        {(user && projects) && ( // Projects take bit time to setup in redux state
                            <div className="userInfo">
                                <img className="profileImg mt-3" src={user.image ? user.image : user.photoURL} alt="User" />
                                <p className="h3 mt-2">{user.displayName}</p>
                                <p className="medium mb-3">{"Dummy Role"}</p>
                                <div className="thinLine w-80 mb-3"></div>
                                <Link to="/glintHub" onClick={this.userStepperOut}>Dashboard</Link>
                                <Link to={`${url}/addApp`} onClick={this.userStepperOut}>Add App</Link>
                                {projects.publishedProjects.length > 0 ? <Link to={`${url}/publishedApp`} onClick={this.userStepperOut}>Published App</Link> : <Link name="Published" to="/" onClick={this.handleClick}>Published App</Link>}
                                {projects.draftedProjects.length > 0 ? <Link to={`${url}/draftedApp`} onClick={this.userStepperOut}>Drafted App</Link> : <Link name="Drafted" to="/" onClick={this.handleClick}>Drafted App</Link>}
                                {projects.reviewProjects.length > 0 ? <Link className="mb-3" to={`${url}/reviewApp`} onClick={this.userStepperOut}>Review App</Link> : <Link className="mb-3" name="In-Review" to="/" onClick={this.handleClick}>Review App</Link>}
                                <div className="thinLine w-80 mb-3"></div>
                            </div>
                        )}
                        <Link to="/liveSoon" target="_blank" onClick={this.userStepperOut}>GDSC CU</Link>
                        <Link to={activeLink !== "glintHub" ? "/glintHub" : "/glintHubSpace"}>{activeLink !== "glintHub" ? "GlintHub" : "GlintHub Space"}</Link>
                        <Link to={activeLink !== "glintHubStreak" ? "/glintHubStreak" : "/glintHubSpace"}>{activeLink !== "glintHubStreak" ? "GlintHub Streak" : "GlintHub Space"}</Link>
                        <Link to="https://gdsc.community.dev/chandigarh-university-chandigarh/" target="_blank" onClick={this.userStepperOut}>Join Our Community</Link>
                        {!user && <span className="mr-3" onClick={googleAuthLogin}>Sign In</span>}
                        {user && (
                            <div className="profileDropdown">
                                <Link to={`/userProfile/${user.uid}`} className="mb-3">Edit Profile</Link>
                                <div className="thinLine w-80 mb-3"></div>
                                <a href="/" className="logOut mb-4" onClick={googleAuthLogout}><img src={logOut} alt="Log Out" />Log out</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Header)
