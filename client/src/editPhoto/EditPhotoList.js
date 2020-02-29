import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../store/actions/nameOfPage';

import {
  addPhotoWork,
  getAllPhotoWork,
  deletePhotoWork
} from '../store/actions/photoWorks';
import { getAllGroupOfImage } from '../store/actions/groupOfImage';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  list: {},
  listItem: {
    position: 'relative'
  },
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover'
  },
  buttonAdd: {}
}));

const EditPhotoList = ({
  setNameOfPage,
  addPhotoWork,
  getAllPhotoWork,
  deletePhotoWork,
  getAllGroupOfImage,
  photoWorks,
  groupOfImage
}) => {
  const classes = useStyles();

  const [newPhoto, setNewPhoto] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [description, setDescription] = useState('');
  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Добавить фото');
    getAllPhotoWork();
    getAllGroupOfImage();
  }, [setNameOfPage, getAllPhotoWork, getAllGroupOfImage]);

  const selectChangeHandle = e => {
    setSelectedGroup(e.target.value);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const pickedHandler = e => {
    e.preventDefault();
    setNewPhoto(e.target.files[0]);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const addPhotoHandler = () => {
    addPhotoWork(newPhoto, selectedGroup, description);
    window.location.reload();
  };
  const onChange = e => {
    setDescription(e.target.value);
    setDisabledForm(!(newPhoto && selectedGroup && description));
  };

  const deleteImage = itemId => {
    deletePhotoWork(itemId);
    window.location.reload();
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <List className={classes.list}>
          {!photoWorks.loading &&
            photoWorks.photoWorks.map(item => (
              <ListItem key={item._id} className={classes.listItem}>
                <Grid container className={classes.root}>
                  <Grid item xs={2}>
                    <img
                      src={item.imageUrl}
                      alt={item.imageUrl}
                      className={classes.img}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Typography align='center'>{item.description}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align='center'>
                      {item.imageGroup.imageGroup}
                    </Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Button
                      color='secondary'
                      variant='contained'
                      onClick={() => deleteImage(item._id)}
                      className={classes.buttonDelete}
                    >
                      Удалить фото
                    </Button>
                  </Grid>

                  <Grid item xs={2}>
                    <Button
                      color='primary'
                      fullWidth
                      variant='contained'
                      href={`/editphoto/${item._id}`}
                      className={classes.buttonDelete}
                    >
                      Редактировать
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5' align='center'>
            Добавляем фото
          </Typography>
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
            <InputLabel id='demo-simple-select-label'>
              Выбрать группу
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              fullWidth
              value={selectedGroup}
              onChange={selectChangeHandle}
            >
              {/* <MenuItem value={0}>Выбрать группу</MenuItem> */}
              {!groupOfImage.loading &&
                groupOfImage.imageGroups.map(item => (
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
    </Grid>
  );
};

EditPhotoList.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  addPhotoWork: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  deletePhotoWork: PropTypes.func.isRequired,
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
  addPhotoWork,
  getAllPhotoWork,
  deletePhotoWork,
  getAllGroupOfImage
})(EditPhotoList);
