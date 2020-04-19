import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork } from '../../store/actions/mainInformation/osbb/photoWorks';
import { getAll_INDIVIDUAL_PHOTOS } from '../../store/actions/mainInformation/individuals/individual_photoWorks';
import ListOfPhotos from './Components/ListOfPhotos';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '1rem',
  },
}));

const Landing = ({
  setNameOfPage,
  getAllPhotoWork,
  getAll_INDIVIDUAL_PHOTOS,

  state_photoWorks: { photoWorks, loading },
  state_individual_photoWorks: { arr_INDIVIDUAL_PHOTOS },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Добрый день');
    getAllPhotoWork();
    getAll_INDIVIDUAL_PHOTOS();
  }, [setNameOfPage, getAllPhotoWork, getAll_INDIVIDUAL_PHOTOS]);

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <Grid item xs={12}>
        <Typography variant='h2' align='center'>
          Компания ОЛИМП-ДС предоставляет услуги для ОСББ и физических лиц
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h4' align='center'>
          Наши работы ОСББ:
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <ListOfPhotos arr={photoWorks} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h4' align='center'>
          Наши работы для физических лиц:
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <ListOfPhotos arr={arr_INDIVIDUAL_PHOTOS} />
      </Grid>
    </Grid>
  );
};

Landing.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  getAll_INDIVIDUAL_PHOTOS: PropTypes.func.isRequired,

  state_photoWorks: PropTypes.object.isRequired,
  state_groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_photoWorks: state.photoWorks,
  state_individual_photoWorks: state.individual_photoWorks,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllPhotoWork,
  getAll_INDIVIDUAL_PHOTOS,
})(Landing);
