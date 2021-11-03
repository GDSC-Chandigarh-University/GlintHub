import React from "react";
import ReactDOM from "react-dom";
import './styles/styles.scss';
import Router from './components/router/router';
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from "./components/config/firebaseConfig"
import configureStore from "./components/store/configureStore";
import { Provider } from "react-redux";

const store = configureStore()

ReactDOM.render(<Provider store={store}>
<Router />
</Provider>, document.getElementById('upper-root'))
