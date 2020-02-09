import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Container from '@material-ui/core/Container';

import Navbar from './shared/navbar/Navbar';
import Landing from './shared/landing/Landing';
import Footer from './shared/footer/Footer';

import Login from './user/pages/Login';
import Register from './user/pages/Register';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Container maxWidth='md'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
