import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

import Container from '@material-ui/core/Container';

import Navbar from './shared/navbar/Navbar';

import { makeStyles } from '@material-ui/core/styles';

// import DescriptionAsfalt from './descriptionOfWorks/DescriptionAsfalt';
// import DescriptionFasad from './descriptionOfWorks/DescriptionFasad';
// import DescriptionInsideWorks from './descriptionOfWorks/DescriptionInsideWorks';
// import DescriptionRoof from './descriptionOfWorks/DescriptionRoof';
// import DescriptionWindowPl from './descriptionOfWorks/DescriptionWindowPl';
// import DescriptionMetalloconstr from './descriptionOfWorks/DescriptionMetalloconstr';
// import DescriptionSanteh from './descriptionOfWorks/DescriptionSanteh';
// import DescriptionEmergency from './descriptionOfWorks/DescriptionEmergency';
// import DescriptionElectro from './descriptionOfWorks/DescriptionElectro';
import DescriptionOf_Works from './descriptionOfWorks/DescriptionOf_Works';

import AboutUs from './shared/landing/AboutUs';
import Landing from './shared/landing/Landing';
import Footer from './shared/footer/Footer';
import Alert from './shared/alert/Alert';

import Login from './user/pages/Login';
import Register from './user/pages/Register';
import PrivateRoute from './routing/PrivateRoute';
import AddPhoto from './editPhoto/AddPhoto';
import EditPhotoList from './editPhoto/EditPhotoList';
import EditPhotoItem from './editPhoto/EditPhotoItem';
import GroupOfImage from './editPhoto/GroupOfImage';
import AddGroupOfImage from './editPhoto/AddGroupOfImage';
import GroupOfImageEdit from './editPhoto/GroupOfImageEdit';
import UserDetail from './user/pages/UserDetail';
import UserAdmin from './user/pages/admin/UserAdmin';
import UserCreate from './user/pages/admin/UserCreate';
import UserEdit from './user/pages/admin/UserEdit';

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
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/aboutus' component={AboutUs} />
            <Route
              exact
              path='/description/:id'
              component={DescriptionOf_Works}
            />

            <PrivateRoute exact path='/user-detail' component={UserDetail} />
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
