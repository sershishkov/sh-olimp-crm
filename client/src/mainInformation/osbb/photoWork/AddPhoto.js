import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { addPhotoWork } from '../../../store/actions/mainInformation/osbb/photoWorks';
import { getAllGroupOfImage } from '../../../store/actions/mainInformation/osbb/groupOfImage';
import Spinner from '../../../shared/spinner/Spinner';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7.5rem',
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 15,
  },
  displayNone: {
    display: 'none',
  },
  wrapImg: {
    height: 500,
    marginBottom: '2rem',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  wrapSelect: {
    position: 'relative',
  },
  select: {
    height: 40,
  },
}));

const AddPhoto = ({
  addPhotoWork,
  getAllGroupOfImage,
  setNameOfPage,
  groupOfImage: { imageGroups, loading },
}) => {
  const classes = useStyles();
  let history = useHistory();
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

  const selectChangeHandle = (e) => {
    setSelectedGroup(e.target.value);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const pickedHandler = (e) => {
    // e.preventDefault();
    setNewPhoto(e.target.files[0]);

    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const addPhotoHandler = () => {
    addPhotoWork(newPhoto, selectedGroup, description);
    setNewPhoto('');
    setSelectedGroup('');
    setDescription('');
    setDisabledForm(true);
    setPreviewUrl('');
  };
  const onChange = (e) => {
    setDescription(e.target.value);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };
  const buttonBackHandler = () => {
    history.goBack();
    // history.push('/accountant/unit');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>
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

      <Grid item xs={12} container spacing={1} alignItems='center'>
        <Grid item xs={6}>
          <TextField
            name='newPhoto'
            accept='image/*'
            type='file'
            id='raised-button-file'
            style={{ display: 'none' }}
            onChange={(e) => pickedHandler(e)}
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

        <Grid item xs={5} className={classes.wrapSelect}>
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
            variant='outlined'
            fullWidth
            value={selectedGroup}
            name='selectedGroup'
            onChange={selectChangeHandle}
            className={classes.select}
          >
            {imageGroups.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.imageGroup}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/group-of-image-add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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
          onChange={(e) => onChange(e)}
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
  groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groupOfImage: state.groupOfImage,
});

export default connect(mapStateToProps, {
  addPhotoWork,
  getAllGroupOfImage,
  setNameOfPage,
})(AddPhoto);
