import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

import Container from '@material-ui/core/Container';

import Navbar from './shared/navbar/Navbar';

import { makeStyles } from '@material-ui/core/styles';

import DescriptionOf_Works from './descriptionOfWorks/DescriptionOf_Works';

import ForOSBB from './shared/landing/ForOSBB';
import ForIndividuals from './shared/landing/ForIndividuals';
import ListOfClientsRequests from './requestFromClient/ListOfClientsRequests';
import AddNewClientRequest from './requestFromClient/AddNewClientRequest';
import EditNewClientRequest from './requestFromClient/EditNewClientRequest';
import Landing from './shared/landing/Landing';
import Footer from './shared/footer/Footer';
import Alert from './shared/alert/Alert';

import Login from './user/auth/Login';
import Register from './user/auth/Register';
import UserDetail from './user/auth/UserDetail';
import PrivateRoute from './routing/PrivateRoute';
import AddPhoto from './editPhoto/AddPhoto';
import EditPhotoList from './editPhoto/EditPhotoList';
import EditPhotoItem from './editPhoto/EditPhotoItem';
import GroupOfImage from './editPhoto/GroupOfImage';
import AddGroupOfImage from './editPhoto/AddGroupOfImage';
import GroupOfImageEdit from './editPhoto/GroupOfImageEdit';
import UserAdmin from './user/admin/UserAdmin';
import UserCreate from './user/admin/UserCreate';
import UserEdit from './user/admin/UserEdit';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 70
    // border: '1px solid blue'
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
        <Container maxWidth='lg' className={classes.root}>
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/for-osbb' component={ForOSBB} />
            <Route exact path='/for-individuals' component={ForIndividuals} />

            <Route
              exact
              path='/request-from-client'
              component={ListOfClientsRequests}
            />
            <Route
              exact
              path='/request-from-client-add'
              component={AddNewClientRequest}
            />
            <Route
              exact
              path='/description/:id'
              component={DescriptionOf_Works}
            />

            <PrivateRoute exact path='/user-detail' component={UserDetail} />
            <PrivateRoute
              exact
              path='/request-from-client-edit/:id'
              component={EditNewClientRequest}
            />
            <PrivateRoute exact path='/user-admin' component={UserAdmin} />
            <PrivateRoute exact path='/user-admin/:id' component={UserEdit} />
            <PrivateRoute
              exact
              path='/user-admin-create'
              component={UserCreate}
            />
            <PrivateRoute exact path='/addphoto' component={AddPhoto} />
            <PrivateRoute exact path='/editphoto' component={EditPhotoList} />
            <PrivateRoute
              exact
              path='/editphoto/:id'
              component={EditPhotoItem}
            />
            <PrivateRoute
              exact
              path='/group-of-image'
              component={GroupOfImage}
            />
            <PrivateRoute
              exact
              path='/group-of-image-add'
              component={AddGroupOfImage}
            />
            <PrivateRoute
              exact
              path='/group-of-image/:id'
              component={GroupOfImageEdit}
            />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
