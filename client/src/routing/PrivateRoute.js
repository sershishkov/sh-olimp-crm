import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      // let authorized = false;
      // console.log(rest.roles);

      // if (user) {
      //   authorized =
      //     isAuthenticated && loading && rest.roles.includes(user.role);
      //   // console.log(authorized);
      // }

      // return !authorized ? <Redirect to='/' /> : <Component {...props} />;
      return !isAuthenticated && !loading ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
// && !rest.roles.includes(user.role)
