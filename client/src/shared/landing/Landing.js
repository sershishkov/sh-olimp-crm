import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork } from '../../store/actions/photoWorks';
import { getAllGroupOfImage } from '../../store/actions/groupOfImage';
import ListOfPhotos from './Components/ListOfPhotos';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
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

  const viewImages = (
    <Fragment>
      {imageGroups.map(group => {
        const newArr = photoWorks.filter(
          photo => group.imageGroup === photo.imageGroup.imageGroup
        );
        return (
          <Fragment>
            <Typography component='h1' variant='h5' align='center'>
              {group.imageGroup}
            </Typography>
            <ListOfPhotos arr={newArr} />
          </Fragment>
        );
      })}
    </Fragment>
  );

  return loading ? <Spinner /> : <div>{viewImages}</div>;
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
