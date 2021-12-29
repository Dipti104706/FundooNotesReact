import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import SignIn from "../signin/signin";
import Signup from "../signup/signup";
import AuthorRoute from "./authorRoute";
import ProtectedRoute from "./protected";

export default function RouterDom() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <AuthorRoute exact path="/" component={SignIn}/>
          <AuthorRoute path = "/signUp" component = {Signup} />
          <ProtectedRoute path = "/dashboard" exact component = {Dashboard}/>
        </Switch>
    </Router>
  );
}