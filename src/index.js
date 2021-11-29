import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
import registerServiceWorker from './registerServiceWorker';
import "./styles/styles.scss"
import { BrowserRouter as Router, Switch, Route, withRouter, Link } from "react-router-dom"
import { onAuthStateChanged, updateProfile } from '@firebase/auth';
import { auth } from './config/firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './components/reducers';
import { setUser, clearUser, setNewUser } from './components/actions';
import Spinner from './components/spinner/Spinner';
import GlintHubLanding from "./components/glintHubLanding/glintHubLanding";
import Dashboard from './components/glintHub-dashboard/dashboard';
import roles from './config/roles';
import { getDocs } from "@firebase/firestore";
// import AdminDashboard from "./components/glintHub-dashboard/admin/dashboard"
import GlintHubSpace from "./components/glintHubSpace"
import UserProfile from "./components/userProfile"
import { getCollectionUsers } from './config/firebase';
import HorizontalLinearStepper from './components/userStepper';


const store = createStore(rootReducer, composeWithDevTools())


class Root extends React.Component {
    state = {
        timeout: true
    }


    componentDidMount() {
        this.userLoading()
    }


    userLoading = () => {
        onAuthStateChanged(auth, async (user) => {
            if(user) {
                this.props.setUser(user)
                await getDocs(getCollectionUsers(user.uid))
                .then((snapshot) => {
                    if (snapshot.docs.length) {
                        if (roles.indexOf(user.email) == 0) {
                            snapshot.docs[0].data().UserRole = "admin"
                        }
                        this.props.setUser(snapshot.docs[0].data())
                        this.props.setNewUser()
                        // this.props.history.push("/glinthub")
                    } 
                })
            } else {
                // this.props.history.push("/glinthub")
                this.props.clearUser()
                localStorage.clear()
            }
        })
        setTimeout(() => {
            this.setState(() => {
                return {
                    timeout: false
                }
            })
        }, 2300)
    }


    render() {
        return this.state.timeout ? <Spinner /> : this.props.userLoading ? <Spinner /> : this.props.user ? this.props.newUser ? <HorizontalLinearStepper/> : this.props.user.role == "admin" ? 
        (
            <h1>AdminDashboard</h1>
        // <Switch>
        //     <Route path="/" component={AdminDashboard}></Route>
        //     <Route path="/glinthub" component={AdminDashboard}></Route>
        // </Switch>
        ) :
            (<Switch>
                <Route path="/glinthub" component={Dashboard}></Route>
                <Route path="/" exact={true} component={GlintHubLanding}></Route>
                <Route path="/glintHubSpace" exact={true} component={GlintHubSpace}></Route>
                <Route path="/userProfile/:id" exact={true} component={UserProfile}></Route>
            </Switch>) :
            (<Switch>
                <Route path="/" exact={true} component={GlintHubLanding}></Route>
                <Route path="/glintHubSpace" exact={true} component={GlintHubSpace}></Route>
            </Switch>)
    }
}

const mapStateFromProps = (state) => {
    return {
        userLoading: state.userReducer.isLoading,
        user: state.userReducer.user,
        appsloading: state.projectsReducer.isLoading,
        newUser: state.userReducer.newUserLoading
    }
}

const RootwithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser, setNewUser })(Root))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootwithAuth />
        </Router>
    </Provider>,
    document.getElementById('upper-root'));
registerServiceWorker();
