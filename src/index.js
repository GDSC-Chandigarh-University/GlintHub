import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
import registerServiceWorker from './registerServiceWorker';
import "./styles/styles.scss"
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom"
import { onAuthStateChanged, updateProfile } from '@firebase/auth';
import { auth } from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './components/reducers';
import { setUser, clearUser } from './components/actions';
import Spinner from './components/spinner/Spinner';
import GlintHubLanding from "./components/glintHub-landing/glintHub-landing";
import Dashboard from './components/glintHub-dashboard/dashboard';
import roles from './components/config/roles';
import AdminDashboard from "./components/glintHub-dashboard/admin/dashboard"

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
    state = {
        timeout: true
    }

    componentDidMount() {
        this.userLoading()
    }

    userLoading = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if(roles.indexOf(user.email) == 0) {
                    user.role = "admin"
                }
                this.props.setUser(user)
                this.props.history.push("/glinthub")
            } else {
                this.props.history.push("/glinthub")
                this.props.clearUser()
                localStorage.clear()
            }
            console.log(user)
        })
        setTimeout(() => {
            this.setState(() => {
                return {
                    timeout: false
                }
            })
        }, 2300)
    }

    componentWillUnmount() {
        this.userLoading()
    }

    render() {
        return this.state.timeout ? <Spinner/> : this.props.userLoading ? <Spinner/> : this.props.user ? this.props.user.role == "admin" ? (<Switch>
            <Route path="/glinthub" component={AdminDashboard}></Route>
        </Switch>) :
        (<Switch>
            <Route path="/glinthub" component={Dashboard}></Route>
        </Switch>) :
        (<Switch>
            <Route path="/glinthub" component={GlintHubLanding}></Route>
        </Switch>)
    }
}

const mapStateFromProps = (state) => {
    return {
        userLoading: state.user_reducer.isLoading,
        user: state.user_reducer.user,
        appsloading: state.projects_reducer.isLoading
    }
}

const RootwithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootwithAuth />
        </Router>
    </Provider>,
    document.getElementById('upper-root'));
registerServiceWorker();
