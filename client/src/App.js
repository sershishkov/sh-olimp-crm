import React, { useEffect, Suspense } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/user/auth/auth';
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
import ForOSBB from './mainInformation/osbb/ForOSBB';
import ForIndividuals from './mainInformation/individuals/ForIndividuals';

const DescriptionOf_Works = React.lazy(() =>
  import('./mainInformation/osbb/descriptionOfWorks/DescriptionOf_Works')
);
const ListOfClientsRequests = React.lazy(() =>
  import('./mainInformation/free/requestFromClient/ListOfClientsRequests')
);
const AddNewClientRequest = React.lazy(() =>
  import('./mainInformation/free/requestFromClient/AddNewClientRequest')
);
const EditNewClientRequest = React.lazy(() =>
  import('./mainInformation/free/requestFromClient/EditNewClientRequest')
);
const UserDetail = React.lazy(() => import('./user/auth/UserDetail'));
const AddPhoto = React.lazy(() =>
  import('./mainInformation/osbb/photoWork/AddPhoto')
);
const EditPhotoList = React.lazy(() =>
  import('./mainInformation/osbb/photoWork/PhotoList')
);
const EditPhotoItem = React.lazy(() =>
  import('./mainInformation/osbb/photoWork/EditPhotoItem')
);
const GroupOfImage = React.lazy(() =>
  import('./mainInformation/osbb/groupOfImage/GroupOfImage')
);
const AddGroupOfImage = React.lazy(() =>
  import('./mainInformation/osbb/groupOfImage/AddGroupOfImage')
);
const GroupOfImageEdit = React.lazy(() =>
  import('./mainInformation/osbb/groupOfImage/GroupOfImageEdit')
);

const DescriptionOf_Works_Individual = React.lazy(() =>
  import(
    './mainInformation/individuals/descriptionOfWorks/DescriptionOf_Works_Individual'
  )
);
const IndividualGroupOfImage_Add = React.lazy(() =>
  import(
    './mainInformation/individuals/groupOfImage/IndividualGroupOfImage_Add'
  )
);
const IndividualGroupOfImage_Edit = React.lazy(() =>
  import(
    './mainInformation/individuals/groupOfImage/IndividualGroupOfImage_Edit'
  )
);
const IndividualGroupOfImage_List = React.lazy(() =>
  import(
    './mainInformation/individuals/groupOfImage/IndividualGroupOfImage_List'
  )
);
const IndividualPhoto_Add = React.lazy(() =>
  import('./mainInformation/individuals/photoWork/IndividualPhoto_Add')
);
const IndividualPhoto_Edit = React.lazy(() =>
  import('./mainInformation/individuals/photoWork/IndividualPhoto_Edit')
);
const IndividualPhoto_List = React.lazy(() =>
  import('./mainInformation/individuals/photoWork/IndividualPhoto_List')
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

const GroupOf_Product_Add = React.lazy(() =>
  import('./accountant/referenceData/groupOf_Product/GroupOf_Product_Add')
);
const GroupOf_Product_Edit = React.lazy(() =>
  import('./accountant/referenceData/groupOf_Product/GroupOf_Product_Edit')
);
const GroupOf_Product_List = React.lazy(() =>
  import('./accountant/referenceData/groupOf_Product/GroupOf_Product_List')
);

const FirstPersonPosition_Add = React.lazy(() =>
  import(
    './accountant/referenceData/firstPersonPosition/FirstPersonPosition_Add'
  )
);
const FirstPersonPosition_Edit = React.lazy(() =>
  import(
    './accountant/referenceData/firstPersonPosition/FirstPersonPosition_Edit'
  )
);
const FirstPersonPosition_List = React.lazy(() =>
  import(
    './accountant/referenceData/firstPersonPosition/FirstPersonPosition_List'
  )
);

const BankName_Add = React.lazy(() =>
  import('./accountant/referenceData/bankName/BankName_Add')
);
const BankName_Edit = React.lazy(() =>
  import('./accountant/referenceData/bankName/BankName_Edit')
);
const BankName_List = React.lazy(() =>
  import('./accountant/referenceData/bankName/BankName_List')
);

const Worker_Add = React.lazy(() =>
  import('./accountant/referenceData/worker/Worker_Add')
);
const Worker_Edit = React.lazy(() =>
  import('./accountant/referenceData/worker/Worker_Edit')
);
const Worker_List = React.lazy(() =>
  import('./accountant/referenceData/worker/Worker_List')
);

const City_Add = React.lazy(() =>
  import('./accountant/referenceData/city/City_Add')
);
const City_Edit = React.lazy(() =>
  import('./accountant/referenceData/city/City_Edit')
);
const City_List = React.lazy(() =>
  import('./accountant/referenceData/city/City_List')
);

const Oblast_Add = React.lazy(() =>
  import('./accountant/referenceData/oblast/Oblast_Add')
);
const Oblast_Edit = React.lazy(() =>
  import('./accountant/referenceData/oblast/Oblast_Edit')
);
const Oblast_List = React.lazy(() =>
  import('./accountant/referenceData/oblast/Oblast_List')
);

const Rayon_Add = React.lazy(() =>
  import('./accountant/referenceData/rayon/Rayon_Add')
);
const Rayon_Edit = React.lazy(() =>
  import('./accountant/referenceData/rayon/Rayon_Edit')
);
const Rayon_List = React.lazy(() =>
  import('./accountant/referenceData/rayon/Rayon_List')
);

const Street_Add = React.lazy(() =>
  import('./accountant/referenceData/street/Street_Add')
);
const Street_Edit = React.lazy(() =>
  import('./accountant/referenceData/street/Street_Edit')
);
const Street_List = React.lazy(() =>
  import('./accountant/referenceData/street/Street_List')
);

const Supplier_Add = React.lazy(() =>
  import('./accountant/referenceData/supplier/Supplier_Add')
);
const Supplier_Edit = React.lazy(() =>
  import('./accountant/referenceData/supplier/Supplier_Edit')
);
const Supplier_List = React.lazy(() =>
  import('./accountant/referenceData/supplier/Supplier_List')
);

const OurFirm_Add = React.lazy(() =>
  import('./accountant/referenceData/ourFirm/OurFirm_Add')
);
const OurFirm_Edit = React.lazy(() =>
  import('./accountant/referenceData/ourFirm/OurFirm_Edit')
);
const OurFirm_List = React.lazy(() =>
  import('./accountant/referenceData/ourFirm/OurFirm_List')
);

const Product_Add = React.lazy(() =>
  import('./accountant/referenceData/product/Product_Add')
);
const Product_Edit = React.lazy(() =>
  import('./accountant/referenceData/product/Product_Edit')
);
const Product_List = React.lazy(() =>
  import('./accountant/referenceData/product/Product_List')
);

const Client_Add = React.lazy(() =>
  import('./accountant/referenceData/client/Client_Add')
);
const Client_Edit = React.lazy(() =>
  import('./accountant/referenceData/client/Client_Edit')
);
const Client_List = React.lazy(() =>
  import('./accountant/referenceData/client/Client_List')
);
const TypeOf_Expense_Add = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Expense/TypeOf_Expense_Add')
);
const TypeOf_Expense_Edit = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Expense/TypeOf_Expense_Edit')
);
const TypeOf_Expense_List = React.lazy(() =>
  import('./accountant/referenceData/typeOf_Expense/TypeOf_Expense_List')
);

const Our_SalesInvoiceNakladnaya_Add = React.lazy(() =>
  import(
    './accountant/ourMainData/our_SalesInvoiceNakladnaya/Our_SalesInvoiceNakladnaya_Add'
  )
);
const Our_SalesInvoiceNakladnaya_Edit = React.lazy(() =>
  import(
    './accountant/ourMainData/our_SalesInvoiceNakladnaya/Our_SalesInvoiceNakladnaya_Edit'
  )
);
const Our_SalesInvoiceNakladnaya_List = React.lazy(() =>
  import(
    './accountant/ourMainData/our_SalesInvoiceNakladnaya/Our_SalesInvoiceNakladnaya_List'
  )
);

const Our_WorkersSalary_Add = React.lazy(() =>
  import('./accountant/ourMainData/our_WorkersSalary/Our_WorkersSalary_Add')
);
const Our_WorkersSalary_Edit = React.lazy(() =>
  import('./accountant/ourMainData/our_WorkersSalary/Our_WorkersSalary_Edit')
);
const Our_WorkersSalary_List = React.lazy(() =>
  import('./accountant/ourMainData/our_WorkersSalary/Our_WorkersSalary_List')
);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 70,
    // border: '1px solid blue'
  },
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

              <Route
                exact
                path='/individual-description/:id'
                component={DescriptionOf_Works_Individual}
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

              <PrivateRoute
                exact
                path='/accountant/group-of-product/add'
                component={GroupOf_Product_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/group-of-product/:id'
                component={GroupOf_Product_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/group-of-product'
                component={GroupOf_Product_List}
              />

              <PrivateRoute
                exact
                path='/accountant/personposition/add'
                component={FirstPersonPosition_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/personposition/:id'
                component={FirstPersonPosition_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/personposition'
                component={FirstPersonPosition_List}
              />

              <PrivateRoute
                exact
                path='/accountant/bankname/add'
                component={BankName_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/bankname/:id'
                component={BankName_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/bankname'
                component={BankName_List}
              />

              <PrivateRoute
                exact
                path='/accountant/worker/add'
                component={Worker_Add}
              />

              <PrivateRoute
                exact
                path='/accountant/worker/:id'
                component={Worker_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/worker'
                component={Worker_List}
              />

              <PrivateRoute
                exact
                path='/accountant/city/add'
                component={City_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/city/:id'
                component={City_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/city'
                component={City_List}
              />

              <PrivateRoute
                exact
                path='/accountant/oblast/add'
                component={Oblast_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/oblast/:id'
                component={Oblast_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/oblast'
                component={Oblast_List}
              />

              <PrivateRoute
                exact
                path='/accountant/rayon/add'
                component={Rayon_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/rayon/:id'
                component={Rayon_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/rayon'
                component={Rayon_List}
              />

              <PrivateRoute
                exact
                path='/accountant/street/add'
                component={Street_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/street/:id'
                component={Street_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/street'
                component={Street_List}
              />

              <PrivateRoute
                exact
                path='/accountant/supplier/add'
                component={Supplier_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/supplier/:id'
                component={Supplier_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/supplier'
                component={Supplier_List}
              />

              <PrivateRoute
                exact
                path='/accountant/our-firm/add'
                component={OurFirm_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/our-firm/:id'
                component={OurFirm_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/our-firm'
                component={OurFirm_List}
              />

              <PrivateRoute
                exact
                path='/accountant/product/add'
                component={Product_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/product/:id'
                component={Product_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/product'
                component={Product_List}
              />

              <PrivateRoute
                exact
                path='/accountant/client/add'
                component={Client_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/client/:id'
                component={Client_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/client'
                component={Client_List}
              />

              <PrivateRoute
                exact
                path='/accountant/our-service-invoice-nakl/add'
                component={Our_SalesInvoiceNakladnaya_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/our-service-invoice-nakl/:id'
                component={Our_SalesInvoiceNakladnaya_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/our-service-invoice-nakl'
                component={Our_SalesInvoiceNakladnaya_List}
              />

              <PrivateRoute
                exact
                path='/accountant/type-of-expense/add'
                component={TypeOf_Expense_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-expense/:id'
                component={TypeOf_Expense_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/type-of-expense'
                component={TypeOf_Expense_List}
              />

              <PrivateRoute
                exact
                path='/accountant/our-workers-salary/add'
                component={Our_WorkersSalary_Add}
              />
              <PrivateRoute
                exact
                path='/accountant/our-workers-salary/:id'
                component={Our_WorkersSalary_Edit}
              />
              <PrivateRoute
                exact
                path='/accountant/our-workers-salary'
                component={Our_WorkersSalary_List}
              />

              <PrivateRoute
                exact
                path='/individual-imagegroup/add'
                component={IndividualGroupOfImage_Add}
              />
              <PrivateRoute
                exact
                path='/individual-imagegroup/:id'
                component={IndividualGroupOfImage_Edit}
              />
              <PrivateRoute
                exact
                path='/individual-imagegroup'
                component={IndividualGroupOfImage_List}
              />

              <PrivateRoute
                exact
                path='/individual-photo/add'
                component={IndividualPhoto_Add}
              />
              <PrivateRoute
                exact
                path='/individual-photo/:id'
                component={IndividualPhoto_Edit}
              />
              <PrivateRoute
                exact
                path='/individual-photo'
                component={IndividualPhoto_List}
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
