import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import PrivateRoute from './components/Common/PrivateRoute'
import Alerts from './components/layout/Alerts'
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Advertisement from './pages/Advertisement';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import UserSetting from './pages/UserSetting';

import Header from './components/layout/Header';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/api/auth'

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import Cookies from 'js-cookie'

const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

const httpLink = new HttpLink({
  uri: '/api/graphql/'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(graphQLErrors) {
    graphQLErrors.map(({ message }) => console.log(message));
  }

  if(networkError) {
    console.log(networkError);
  }
})

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Fragment>
              <Alerts />
              <Router>
                <Header />
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/Login" component={Login}/>
                  <Route exact path="/Register" component={Register}/>
                  <Route exact path="/SearchResult" component={Search}/>
                </Switch>
                <Footer />
              </Router>
            </Fragment>
          </AlertProvider>
        </Provider>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
