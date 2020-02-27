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
import EditPhoto from './editPhoto/EditPhoto';
import TypeOfImage from './editPhoto/TypeOfImage';
import TypeOfImageEdit from './editPhoto/TypeOfImageEdit';
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
            <PrivateRoute exact path='/editphoto' component={EditPhoto} />
            <PrivateRoute exact path='/user-detail' component={UserDetail} />
            <PrivateRoute exact path='/type-of-image' component={TypeOfImage} />
            <PrivateRoute
              exact
              path='/type-of-image/:id'
              component={TypeOfImageEdit}
            />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
