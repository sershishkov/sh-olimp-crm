import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPhotoWork } from '../store/actions/photoWorks';
import { getAllGroupOfImage } from '../store/actions/groupOfImage';
import { setNameOfPage } from '../store/actions/nameOfPage';
import Spinner from '../shared/spinner/Spinner';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  displayFlex: {
    display: 'flex'
  },
  displayNone: {
    display: 'none'
  },
  wrapImg: {
    height: 500,
    marginBottom: '2rem'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const AddPhoto = ({
  addPhotoWork,
  getAllGroupOfImage,
  setNameOfPage,
  groupOfImage: { imageGroups, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [newPhoto, setNewPhoto] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [description, setDescription] = useState('');
  const [disabledForm, setDisabledForm] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    setNameOfPage('Добавить фото');
    getAllGroupOfImage();

    if (newPhoto) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(newPhoto);
    }
  }, [setNameOfPage, getAllGroupOfImage, newPhoto]);

  const selectChangeHandle = e => {
    setSelectedGroup(e.target.value);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const pickedHandler = e => {
    // e.preventDefault();
    setNewPhoto(e.target.files[0]);

    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const addPhotoHandler = () => {
    addPhotoWork(newPhoto, selectedGroup, description);
    history.push('/editphoto');
  };
  const onChange = e => {
    setDescription(e.target.value);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.wrapImg}>
        {previewUrl && (
          <img src={previewUrl} alt='Preview' className={classes.img} />
        )}
        {!previewUrl && (
          <Typography component='h1' variant='h5' align='center'>
            Пожалуйста выбирите фото
          </Typography>
        )}
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={6}>
          <TextField
            name='newPhoto'
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
        <Grid item xs={6}>
          <InputLabel
            id='add-select-label'
            className={
              selectedGroup ? classes.displayNone : classes.displayFlex
            }
          >
            Выбрать группу
          </InputLabel>
          <Select
            labelId='add-select-label'
            fullWidth
            value={selectedGroup}
            onChange={selectChangeHandle}
          >
            {imageGroups.map(item => (
              <MenuItem key={item._id} value={item._id}>
                {item.imageGroup}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          type='text'
          fullWidth
          placeholder='Введите описание'
          id='description'
          name='description'
          value={description}
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type='button'
          fullWidth
          disabled={disabledForm}
          variant='contained'
          color='primary'
          className={classes.buttonAdd}
          onClick={() => addPhotoHandler()}
        >
          Сохранить новое фото
        </Button>
      </Grid>
    </Grid>
  );
};

AddPhoto.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  addPhotoWork: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  addPhotoWork,
  getAllGroupOfImage,
  setNameOfPage
})(AddPhoto);
