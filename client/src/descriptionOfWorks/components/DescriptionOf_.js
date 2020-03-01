import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../shared/spinner/Spinner';
import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork } from '../../store/actions/photoWorks';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '3rem'
  },
  slider: {
    marginBottom: '3rem'
  }
}));

const DescriptionAsfalt = ({
  pageName,
  groupId,
  setNameOfPage,
  getAllPhotoWork,
  photoWorks: { photoWorks, loading }
}) => {
  const classes = useStyles();
  useEffect(() => {
    setNameOfPage(pageName);
    getAllPhotoWork();
  }, [setNameOfPage, getAllPhotoWork]);

  const filteredArr = photoWorks.filter(
    photo => photo.imageGroup._id === groupId
  );

  const slider = (
    <AwesomeSlider className={classes.slider}>
      {filteredArr.map(photo => (
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

DescriptionAsfalt.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photoWorks: state.photoWorks
});

export default connect(mapStateToProps, { setNameOfPage, getAllPhotoWork })(
  DescriptionAsfalt
);
