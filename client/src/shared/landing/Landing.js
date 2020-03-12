import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork } from '../../store/actions/photoWorks';
import { getAllGroupOfImage } from '../../store/actions/groupOfImage';
import ListOfPhotos from './Components/ListOfPhotos';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1rem'
  }
}));

const Landing = ({
  setNameOfPage,
  getAllPhotoWork,
  photoWorks: { photoWorks, loading },
  getAllGroupOfImage,
  groupOfImage: { imageGroups }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Добрый день');
    getAllPhotoWork();
    getAllGroupOfImage();
  }, [setNameOfPage, getAllPhotoWork, getAllGroupOfImage]);

  // const viewImages = (
  //   <Grid className={classes.root}>
  //     {imageGroups.map(group => {
  //       const newArr = photoWorks.filter(
  //         photo => group.imageGroup === photo.imageGroup.imageGroup
  //       );
  //       return (
  //         <Fragment key={group._id}>
  //           <Typography component='h1' variant='h5' align='center'>
  //             {group.imageGroup}
  //           </Typography>
  //           <ListOfPhotos arr={newArr} />
  //         </Fragment>
  //       );
  //     })}
  //   </Grid>

  const viewImages = (
    <Grid>
      <ListOfPhotos arr={photoWorks} />
    </Grid>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <Grid item>
        <Typography variant='h2' align='center'>
          Компания ОЛИМП-ДС предоставляет услуги для ОСББ и физических лиц
        </Typography>
        <Typography variant='h4' align='center'>
          Наши работы:
        </Typography>
      </Grid>
      <Grid item></Grid>
      {viewImages}
    </Grid>
  );
};

Landing.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired,
  groupOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photoWorks: state.photoWorks,
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllPhotoWork,
  getAllGroupOfImage
})(Landing);
