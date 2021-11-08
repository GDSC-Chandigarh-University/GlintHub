import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
import registerServiceWorker from './registerServiceWorker';
import "./styles/styles.scss"
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom"
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './components/reducers';
import { setUser, clearUser } from './components/actions';
import Spinner from './components/spinner/Spinner';
import GlintHubLanding from "./components/glintHub-landing/glintHub-landing";
import Dashboard from './components/glintHub-dashboard/dashboard';

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
    state = {
        timeout: true
    }

    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.props.setUser(user)
                // this.props.history.push("/glinthub")
            } else {
                // this.props.history.push("/glinthub")
                this.props.clearUser()
                console.log("No user")
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
        return this.state.timeout ? <Spinner/> : this.props.userLoading ? <Spinner/> : this.props.user ?
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
        userLoading: state.user.isLoading,
        user: state.user.currentUser,
        appsloading: state.apps.isLoading
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
