import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './components/App';
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom"
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './components/reducers';
// import { setUser, ClearUser } from './components/actions';
import Spinner from './components/spinner/Spinner';
import GlintHubLanding from "./components/glintHub-landing/glintHub-landing";

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component {
    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.props.setUser(user)
                this.props.history.push("/")
            } else {
                this.props.history.push("/login")
                this.props.ClearUser()
                console.log("No user")
            }
        })
    }
    render() {
        return this.props.userLoading ? <Spinner/> : (
            <Switch>
                <Route path="/glinthub" component={GlintHubLanding} exact={true}></Route>
            </Switch>
        )
    }
}

const mapStateFromProps = (state) => {
    return {
        userLoading: state.user.isLoading
    }
}

const RootwithAuth = withRouter(connect(mapStateFromProps, { setUser, ClearUser })(Root))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootwithAuth />
        </Router>
    </Provider>,
    document.getElementById('upper-root'));
registerServiceWorker();
