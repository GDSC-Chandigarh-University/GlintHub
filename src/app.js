import React from "react";
import ReactDOM from "react-dom";
// import '../styles/styles.scss';
// import Header from './components/header'
// import Body from "./components/body";
// import Footer from './components/footer'

import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './components/dashboard-sidebar';

// const GDSC = () => {
//     return (
//         <div>
//         <Header/>
//         <Body />
//         <Footer/>
//         </div>
//     );
// }
// ReactDOM.render(<GDSC />, document.getElementById('root'))

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Demo />
  </StyledEngineProvider>,
  document.querySelector("#root")
);