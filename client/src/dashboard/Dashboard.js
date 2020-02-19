import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../store/actions/nameOfPage';

const Dashboard = ({ setNameOfPage }) => {
  useEffect(() => {
    setNameOfPage('Наши работы');
  }, [setNameOfPage]);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  setNameOfPage: PropTypes.func.isRequired
};

export default connect(null, { setNameOfPage })(Dashboard);
