
import GlintHubLanding from "../glintHub-landing/glintHub-landing";

import Dashboard from "../glintHub-dashboard/dashboard";

const Router = (props) => {
    return (
        !currentUser ? <Route path="/glinthub" component={GlintHubLanding} exact={true}>
            </Route> : 
            <div>
            <Route path="/glinthub" component={Dashboard}>
            </Route>
             </div>
    );
}
