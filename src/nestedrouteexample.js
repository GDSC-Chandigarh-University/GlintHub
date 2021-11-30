import React from "react";  
import ReactDOM from "react-dom";  
import {  
  BrowserRouter as Router,  
  Switch,  
  Route,  
  Link,  
  useParams,  
  useRouteMatch  
} from "react-router-dom";

function Topic() {  
  let { topicId } = useParams(); return (  
    <div>  
      <h3>{topicId}</h3>  
    </div>  
  );  
}

function Topics() {  
  let { path, url } = useRouteMatch(); return (  
    <div>  
      <h2>Topics</h2>  
      <ul>  
        <li>  
          <Link to={`${url}/foo`}>Foo</Link>  
        </li>  
        <li>  
          <Link to={`${url}/bar`}>Bar</Link>  
        </li>  
        <li>  
          <Link to={`${url}/baz`}>Baz</Link>  
        </li>  
      </ul> <Switch>  
        <Route exact path={path}>  
          <h3>Please select a topic.</h3>  
        </Route>  
        <Route path={`${path}/:topicId`}>  
          <Topic />  
        </Route>  
      </Switch>  
    </div>  
  );  
}

function App() {  
  return (  
    <Router>  
      <div>  
        <ul>  
          <li>  
            <Link to="/">Home</Link>  
          </li>  
          <li>  
            <Link to="/topics">Topics</Link>  
          </li>  
        </ul> <hr /> <Switch>  
          <Route exact path="/">  
            <p>Home</p>  
          </Route>  
          <Route path="/topics">  
            <Topics />  
          </Route>  
        </Switch>  
      </div>  
    </Router>  
  );  
}const rootElement = document.getElementById("root");  
ReactDOM.render(<App />, rootElement);