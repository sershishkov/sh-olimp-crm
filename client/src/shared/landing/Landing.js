import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork, addPhotoWork } from '../../store/actions/photoWorks';
import PropTypes from 'prop-types';

import MySlider from './Components/MySlider';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

const Landing = ({ setNameOfPage, getAllPhotoWork, photoWorks }) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Добрый день');
    if (photoWorks.photoAsfalt) {
      getAllPhotoWork('asfalt');
    }

    if (photoWorks.photoElektro) {
      getAllPhotoWork('elektro');
    }

    // getAllPhotoWork('emergencywork');
    // getAllPhotoWork('fasad');
    // getAllPhotoWork('insidework');
    // getAllPhotoWork('metallconstr');
    // getAllPhotoWork('roof');
    // getAllPhotoWork('santeh');
    // getAllPhotoWork('windowpl');
  }, [setNameOfPage, getAllPhotoWork]);
  // console.log(photoWorks.photoAsfalt);

  return (
    <div>
      <Typography component='h1' variant='h5' align='center'>
        Асфальтные работы
      </Typography>

      <MySlider arrPhoto={photoWorks.photoAsfalt} />

      <Typography component='h1' variant='h5' align='center'>
        Электроработы работы
      </Typography>

      <MySlider arrPhoto={photoWorks.photoElektro} />

      {/* <MySlider arrPhoto={photoWorks.photoEmergencyWork} />
      <MySlider arrPhoto={photoWorks.photoFasad} />
      <MySlider arrPhoto={photoWorks.photoInsideWork} />
      <MySlider arrPhoto={photoWorks.photoMetallConstr} />
      <MySlider arrPhoto={photoWorks.photoRoof} />
      <MySlider arrPhoto={photoWorks.photoSantex} />
      <MySlider arrPhoto={photoWorks.photoWindowsPl} />
       */}
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

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllPhotoWork,
  addPhotoWork
})(Landing);
