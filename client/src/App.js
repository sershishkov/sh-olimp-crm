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
const EditPhotoList = React.lazy(() => import('./photoWork/PhotoList'));
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

/////////////////accountant referenceData ////////////////////
const Unit_List = React.lazy(() =>
  import('./accountant/referenceData/unit/Unit_List')
);
const Unit_Edit = React.lazy(() =>
  import('./accountant/referenceData/unit/Unit_Edit')
);
const Unit_Add = React.lazy(() =>
  import('./accountant/referenceData/unit/Unit_Add')
);

const TypeOf_Unit_Add = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Unit/TypeOf_Unit_Add')
);
const TypeOf_Unit_Edit = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Unit/TypeOf_Unit_Edit')
);
const TypeOf_Unit_List = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Unit/TypeOf_Unit_List')
);

const TypeOf_TaxPayerOn_Add = React.lazy(() =>
  import('./accountant/referenceData/typeOf_TaxPayerOn/TypeOf_TaxPayerOn_Add')
);
const TypeOf_TaxPayerOn_Edit = React.lazy(() =>
  import('./accountant/referenceData/typeOf_TaxPayerOn/TypeOf_TaxPayerOn_Edit')
);
const TypeOf_TaxPayerOn_List = React.lazy(() =>
  import('./accountant/referenceData/typeOf_TaxPayerOn/TypeOf_TaxPayerOn_List')
);

const TypeOf_Street_Add = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Street/TypeOf_Street_Add')
);
const TypeOf_Street_Edit = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Street/TypeOf_Street_Edit')
);
const TypeOf_Street_List = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Street/TypeOf_Street_List')
);

const TypeOf_Settlement_Add = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Settlement/TypeOf_Settlement_Add')
);
const TypeOf_Settlement_Edit = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Settlement/TypeOf_Settlement_Edit')
);
const TypeOf_Settlement_List = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Settlement/TypeOf_Settlement_List')
);

const TypeOf_Firm_Add = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Firm/TypeOf_Firm_Add')
);
const TypeOf_Firm_Edit = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Firm/TypeOf_Firm_Edit')
);
const TypeOf_Firm_List = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Firm/TypeOf_Firm_List')
);

const TypeOf_ActsOnBasisOf_Add = React.lazy(() =>
  import(
    './accountant/referenceData/typeOf_ActsOnBasisOf/TypeOf_ActsOnBasisOf_Add'
  )
);
const TypeOf_ActsOnBasisOf_Edit = React.lazy(() =>
  import(
    './accountant/referenceData/typeOf_ActsOnBasisOf/TypeOf_ActsOnBasisOf_Edit'
  )
);
const TypeOf_ActsOnBasisOf_List = React.lazy(() =>
  import(
    './accountant/referenceData/typeOf_ActsOnBasisOf/TypeOf_ActsOnBasisOf_List'
  )
);

const ServiceJob_Add = React.lazy(() =>
  import('./accountant/referenceData/serviceJob/ServiceJob_Add')
);
const ServiceJob_Edit = React.lazy(() =>
  import('./accountant/referenceData/serviceJob/ServiceJob_Edit')
);
const ServiceJob_List = React.lazy(() =>
  import('./accountant/referenceData/serviceJob/ServiceJob_List')
);

const PhoneOperator_Add = React.lazy(() =>
  import('./accountant/referenceData/phoneOperator/PhoneOperator_Add')
);
const PhoneOperator_Edit = React.lazy(() =>
  import('./accountant/referenceData/phoneOperator/PhoneOperator_Edit')
);
const PhoneOperator_List = React.lazy(() =>
  import('./accountant/referenceData/phoneOperator/PhoneOperator_List')
);

const GroupOf_ServiceJob_Add = React.lazy(() =>
  import('./accountant/referenceData/groupOf_ServiceJob/GroupOf_ServiceJob_Add')
);
const GroupOf_ServiceJob_Edit = React.lazy(() =>
  import(
    './accountant/referenceData/groupOf_ServiceJob/GroupOf_ServiceJob_Edit'
  )
);
const GroupOf_ServiceJob_List = React.lazy(() =>
  import(
    './accountant/referenceData/groupOf_ServiceJob/GroupOf_ServiceJob_List'
  )
);

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

              <PrivateRoute
                exact
                path='/accountant/unit'
                component={Unit_List}
              />
              <PrivateRoute
                exact
                path='/accountant/unit/add'
                component={Unit_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/unit/:id'
                component={Unit_Edit}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-unit/add'
                component={TypeOf_Unit_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-unit/:id'
                component={TypeOf_Unit_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-unit'
                component={TypeOf_Unit_List}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-tax-payer-on/add'
                component={TypeOf_TaxPayerOn_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-tax-payer-on/:id'
                component={TypeOf_TaxPayerOn_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-tax-payer-on'
                component={TypeOf_TaxPayerOn_List}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-street/add'
                component={TypeOf_Street_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-street/:id'
                component={TypeOf_Street_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-street'
                component={TypeOf_Street_List}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-settlement/add'
                component={TypeOf_Settlement_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-settlement/:id'
                component={TypeOf_Settlement_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-settlement'
                component={TypeOf_Settlement_List}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-firm/add'
                component={TypeOf_Firm_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-firm/:id'
                component={TypeOf_Firm_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-firm'
                component={TypeOf_Firm_List}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-acts-on-basis-of/add'
                component={TypeOf_ActsOnBasisOf_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-acts-on-basis-of/:id'
                component={TypeOf_ActsOnBasisOf_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-acts-on-basis-of'
                component={TypeOf_ActsOnBasisOf_List}
              />

              <PrivateRoute
                exact
                path='/accountant/service-job/add'
                component={ServiceJob_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/service-job/:id'
                component={ServiceJob_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/service-job'
                component={ServiceJob_List}
              />

              <PrivateRoute
                exact
                path='/accountant/phone-operator/add'
                component={PhoneOperator_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/phone-operator/:id'
                component={PhoneOperator_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/phone-operator'
                component={PhoneOperator_List}
              />

              <PrivateRoute
                exact
                path='/accountant/group-of-servicejob/add'
                component={GroupOf_ServiceJob_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/group-of-servicejob/:id'
                component={GroupOf_ServiceJob_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/group-of-servicejob'
                component={GroupOf_ServiceJob_List}
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
