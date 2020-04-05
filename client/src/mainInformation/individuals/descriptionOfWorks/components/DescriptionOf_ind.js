import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../../../shared/spinner/Spinner';
import { getAll_INDIVIDUAL_PHOTOS } from '../../../../store/actions/mainInformation/individuals/individual_photoWorks';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '3rem',
  },
  slider: {
    marginBottom: '3rem',
  },
}));

const DescriptionOf_ind = ({
  groupId,
  getAll_INDIVIDUAL_PHOTOS,
  state_individual_photoWorks: { arr_INDIVIDUAL_PHOTOS, loading },
}) => {
  const classes = useStyles();
  useEffect(() => {
    getAll_INDIVIDUAL_PHOTOS();
  }, [getAll_INDIVIDUAL_PHOTOS]);

  const filteredArr = arr_INDIVIDUAL_PHOTOS.filter(
    (photo) => photo.imageGroup._id === groupId
  );

  const slider = (
    <AwesomeSlider className={classes.slider}>
      {filteredArr.map((photo) => (
        <div key={photo._id} data-src={photo.imageUrl} />
      ))}
    </AwesomeSlider>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <Typography component='h1' variant='h5' align='center'>
        Наши работы
      </Typography>
      {slider}
    </Grid>
  );
};

DescriptionOf_ind.propTypes = {
  getAll_INDIVIDUAL_PHOTOS: PropTypes.func.isRequired,
  state_individual_photoWorks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_individual_photoWorks: state.individual_photoWorks,
});

export default connect(mapStateToProps, { getAll_INDIVIDUAL_PHOTOS })(
  DescriptionOf_ind
);
