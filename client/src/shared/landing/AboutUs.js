import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNameOfPage } from '../../store/actions/nameOfPage';
import PropTypes from 'prop-types';

const AboutUs = ({ setNameOfPage }) => {
  useEffect(() => {
    setNameOfPage('О нас');
  });

  return <h2>AboutUs</h2>;
};

AboutUs.propTypes = {
  setNameOfPage: PropTypes.func.isRequired
};

export default connect(null, { setNameOfPage })(AboutUs);
