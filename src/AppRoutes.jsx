import React, {Component} from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import HomeContainer from './Home'
import SuccessContainer from './Success'

class AppRoute extends Component {
  render() { 
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/home" component={HomeContainer}/>
          <Route path="/success" component={SuccessContainer} />    
        </Switch>
      </Router>
    );
  }
}
export default AppRoute;