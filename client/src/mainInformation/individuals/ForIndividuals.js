import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNameOfPage } from '../../store/actions/nameOfPage';

import PropTypes from 'prop-types';

// import Spinner from '../spinner/Spinner';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {},
  listItem: {}
}));

const ForIndividuals = ({ setNameOfPage }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Наши работы ');
  }, [setNameOfPage]);

  return (
    <Grid className={classes.root}>
      <Typography variant='h2' align='center'>
        Страница для физических лиц
      </Typography>
      <Typography variant='h3' align='center'>
        Ответственный МАКСИМ
      </Typography>
      <Typography variant='h3' align='center'>
        Компания "Олимп-ДС" предлагает следующие виды работ для физических лиц:
      </Typography>
    </Grid>
  );
};

ForIndividuals.propTypes = {
  setNameOfPage: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({

// });

export default connect(null, {
  setNameOfPage
})(ForIndividuals);
