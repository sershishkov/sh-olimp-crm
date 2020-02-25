import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

import Container from '@material-ui/core/Container';

import Navbar from './shared/navbar/Navbar';

import { makeStyles } from '@material-ui/core/styles';

import AboutUs from './shared/landing/AboutUs';
import Landing from './shared/landing/Landing';
import Footer from './shared/footer/Footer';
import Alert from './shared/alert/Alert';

import Login from './user/pages/Login';
import Register from './user/pages/Register';
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './dashboard/Dashboard';
import UserDetail from './user/pages/UserDetail';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 70
  }
}));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const classes = useStyles();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Container maxWidth='md' className={classes.root}>
          <Route exact path='/' component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/aboutus' component={AboutUs} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/user-detail' component={UserDetail} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
