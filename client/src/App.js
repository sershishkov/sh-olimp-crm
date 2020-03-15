import React, { useEffect, Suspense } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

import Spinner from './shared/spinner/Spinner';

import Container from '@material-ui/core/Container';

import Navbar from './shared/navbar/Navbar';

import { makeStyles } from '@material-ui/core/styles';

import Landing from './shared/landing/Landing';
import AboutUs from './shared/landing/AboutUs';
import Footer from './shared/footer/Footer';
import Alert from './shared/alert/Alert';
import Login from './user/auth/Login';
import Register from './user/auth/Register';
import PrivateRoute from './routing/PrivateRoute';
import ForOSBB from './shared/landing/ForOSBB';
import ForIndividuals from './shared/landing/ForIndividuals';

const DescriptionOf_Works = React.lazy(() =>
  import('./descriptionOfWorks/DescriptionOf_Works')
);
const ListOfClientsRequests = React.lazy(() =>
  import('./requestFromClient/ListOfClientsRequests')
);
const AddNewClientRequest = React.lazy(() =>
  import('./requestFromClient/AddNewClientRequest')
);
const EditNewClientRequest = React.lazy(() =>
  import('./requestFromClient/EditNewClientRequest')
);
const UserDetail = React.lazy(() => import('./user/auth/UserDetail'));
const AddPhoto = React.lazy(() => import('./photoWork/AddPhoto'));
const EditPhotoList = React.lazy(() => import('./photoWork/EditPhotoList'));
const EditPhotoItem = React.lazy(() => import('./photoWork/EditPhotoItem'));
const GroupOfImage = React.lazy(() => import('./groupOfImage/GroupOfImage'));
const AddGroupOfImage = React.lazy(() =>
  import('./groupOfImage/AddGroupOfImage')
);
const GroupOfImageEdit = React.lazy(() =>
  import('./groupOfImage/GroupOfImageEdit')
);
const UserAdmin = React.lazy(() => import('./user/admin/UserAdmin'));
const UserCreate = React.lazy(() => import('./user/admin/UserCreate'));
const UserEdit = React.lazy(() => import('./user/admin/UserEdit'));

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
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/aboutus' component={AboutUs} />
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
          </Suspense>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
