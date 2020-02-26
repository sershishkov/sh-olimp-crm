import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../store/actions/nameOfPage';

import {
  getAllPhotoWork,
  addPhotoWork,
  deletePhotoWork
} from '../store/actions/photoWorks';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {},
  listItem: {
    position: 'relative'
  },
  img: {
    width: '100%',
    height: 500,
    objectFit: 'cover'
  },
  buttonAdd: {},
  buttonDelete: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem'
  }
}));

const EditPhoto = ({
  setNameOfPage,
  getAllPhotoWork,
  addPhotoWork,
  deletePhotoWork,
  photoWorks
}) => {
  const classes = useStyles();
  let history = useHistory();

  const [thisPhoto, setThisPhoto] = useState('');

  useEffect(() => {
    setNameOfPage('Редактировать фото');
    if (photoWorks.photoAsfalt) {
      getAllPhotoWork('asfalt');
    }
  }, [setNameOfPage, getAllPhotoWork]);
  // console.log(photoWorks.photoAsfalt);

  const pickedHandler = e => {
    e.preventDefault();
    setThisPhoto(e.target.files[0]);
  };

  const addPhotoHandler = typeOfImage => {
    addPhotoWork(typeOfImage, thisPhoto);
    history.push('/editphoto');
  };

  const deleteImage = (itemId, typeOfImage) => {
    deletePhotoWork(itemId, typeOfImage);
    history.push('/editphoto');
  };

  return (
    <Grid container className={classes.root}>
      <Grid item container>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5' align='center'>
            Асфальтные работы
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <List className={classes.list}>
            {photoWorks.photoAsfalt &&
              photoWorks.photoAsfalt.map(item => (
                <ListItem key={item._id} className={classes.listItem}>
                  <img
                    src={item.image}
                    alt={item.image}
                    className={classes.img}
                  />
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => deleteImage(item._id, 'asfalt')}
                    className={classes.buttonDelete}
                  >
                    Удалить фото
                  </Button>
                </ListItem>
              ))}
          </List>
        </Grid>

        <Grid item xs={12}>
          <TextField
            name='thisPhoto'
            accept='image/*'
            type='file'
            id='raised-button-file'
            style={{ display: 'none' }}
            onChange={e => pickedHandler(e)}
          />
          <label htmlFor='raised-button-file'>
            <Button
              variant='contained'
              component='span'
              color='primary'
              fullWidth
              className={classes.button}
            >
              Выбрать новое фото
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.buttonAdd}
            onClick={() => addPhotoHandler('asfalt')}
          >
            Сохранить новое фото
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

EditPhoto.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  addPhotoWork: PropTypes.func.isRequired,
  deletePhotoWork: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photoWorks: state.photoWorks
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllPhotoWork,
  addPhotoWork,
  deletePhotoWork
})(EditPhoto);
