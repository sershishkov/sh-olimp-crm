import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../spinner/Spinner';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork, addPhotoWork } from '../../store/actions/photoWorks';
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
  photoWorks: { photoWorks, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Добрый день');
    getAllPhotoWork();
  }, [setNameOfPage, getAllPhotoWork]);

  const arrAsf = photoWorks.filter(
    item => item.typeOfImage.imageType === 'asfalt'
  );

  const arrElectro = photoWorks.filter(
    item => item.typeOfImage.imageType === 'electro'
  );

  const arrEmergency = photoWorks.filter(
    item => item.typeOfImage.imageType === 'emergencywork'
  );

  const arrFasad = photoWorks.filter(
    item => item.typeOfImage.imageType === 'fasad'
  );

  const arrInsideWork = photoWorks.filter(
    item => item.typeOfImage.imageType === 'insidework'
  );

  const arrMetallConstr = photoWorks.filter(
    item => item.typeOfImage.imageType === 'metallconstr'
  );

  const arrSantex = photoWorks.filter(
    item => item.typeOfImage.imageType === 'santeh'
  );

  const arrWindowPl = photoWorks.filter(
    item => item.typeOfImage.imageType === 'windowpl'
  );

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Typography component='h1' variant='h5' align='center'>
        Асфальтные работы
      </Typography>

      <ListOfPhotos arr={arrAsf} />

      <Typography component='h1' variant='h5' align='center'>
        Электроработы работы
      </Typography>

      <ListOfPhotos arr={arrElectro} />

      <Typography component='h1' variant='h5' align='center'>
        Аварийные работы
      </Typography>

      <ListOfPhotos arr={arrEmergency} />

      <Typography component='h1' variant='h5' align='center'>
        Фасадные работы
      </Typography>

      <ListOfPhotos arr={arrFasad} />

      <Typography component='h1' variant='h5' align='center'>
        Внутренние работы
      </Typography>

      <ListOfPhotos arr={arrInsideWork} />

      <Typography component='h1' variant='h5' align='center'>
        Металлоконструкции
      </Typography>

      <ListOfPhotos arr={arrMetallConstr} />

      <Typography component='h1' variant='h5' align='center'>
        Сантехнические работы
      </Typography>

      <ListOfPhotos arr={arrSantex} />

      <Typography component='h1' variant='h5' align='center'>
        Монтаж и изготовление металлопластиковых изделий
      </Typography>

      <ListOfPhotos arr={arrWindowPl} />
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
