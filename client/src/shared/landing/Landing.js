import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';

// import 'react-awesome-slider/dist/styles.css';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork } from '../../store/actions/photoWorks';
import PropTypes from 'prop-types';

import MySlider from './Components/MySlider';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  slider: {
    marginBottom: '4rem'
    // border: '1px solid red'
  }
}));

const Landing = ({ setNameOfPage, getAllPhotoWork, photoWorks }) => {
  const classes = useStyles();
  const [asfaltPhotos, setAsfaltPhotos] = useState();

  useEffect(() => {
    setNameOfPage('Добрый день');
    getAllPhotoWork('asfalt');
    getAllPhotoWork('elektro');
    getAllPhotoWork('emergencywork');
    getAllPhotoWork('fasad');
    getAllPhotoWork('insidework');
    getAllPhotoWork('metallconstr');
    getAllPhotoWork('roof');
    getAllPhotoWork('santeh');
    getAllPhotoWork('windowpl');
  }, [setNameOfPage, getAllPhotoWork]);
  // console.log(photoWorks.photoAsfalt);

  // useCallback(() => {
  //   if (photoWorks.photoAsfalt) {
  //     setAsfaltPhotos(photoWorks.photoAsfalt);
  //     console.log(photoWorks.photoAsfalt);
  //   }
  // }, [photoWorks.photoAsfalt]);

  return (
    <div>
      <h2>Наши работы </h2>
      <MySlider arrPhoto={photoWorks.photoAsfalt} />
      <MySlider arrPhoto={photoWorks.photoEmergencyWork} />
      <MySlider arrPhoto={photoWorks.photoFasad} />
      <MySlider arrPhoto={photoWorks.photoInsideWork} />
      <MySlider arrPhoto={photoWorks.photoMetallConstr} />
      <MySlider arrPhoto={photoWorks.photoRoof} />
      <MySlider arrPhoto={photoWorks.photoSantex} />
      <MySlider arrPhoto={photoWorks.photoWindowsPl} />
      <MySlider arrPhoto={photoWorks.photoElektro} />
    </div>
  );
};

Landing.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photoWorks: state.photoWorks
});

export default connect(mapStateToProps, { setNameOfPage, getAllPhotoWork })(
  Landing
);
