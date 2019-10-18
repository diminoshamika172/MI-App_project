import React from "react";

import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import { Provider, connect } from "react-redux";

import { loadUser } from "./actions/auth";

import store from "./store";
import Login from "./components/users/login";
import Register from "./components/users/register";
import Nav from "./components/layouts/Main";
import QuaryList from "./components/QuaryList";
import Main from "./components/layouts/Main";
import MyPage from "./components/users/MyPage";

class RootContainerComponent extends React.Component {
  componentDidMount() {
    this.props.loadUser();
  }
  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isLoading) {
            return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };
  render() {
    let { PrivateRoute } = this;
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/mypage" component={MyPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

let RootContainer = connect(
  mapStateToProps,
  { loadUser }
)(RootContainerComponent);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
