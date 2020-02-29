import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../store/actions/nameOfPage';
import { getOnePhotoWork } from '../store/actions/photoWorks';
import { getAllGroupOfImage } from '../store/actions/groupOfImage';

import Button from '@material-ui/core/Button';
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
  listItem: {},
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover'
  }
}));

const EditPhotoItem = ({
  photoWorks,
  groupOfImage: { imageGroups },
  setNameOfPage,
  getOnePhotoWork,
  getAllGroupOfImage
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [disabledForm, setDisabledForm] = useState(true);

  const selectChangeHandle = e => {
    setSelectedGroup(e.target.value);
    setDisabledForm(!(selectedGroup && description));
  };

  const onChange = e => {
    setDescription(e.target.value);
    setDisabledForm(!(selectedGroup && description));
  };

  const updateImageHandler = () => {
    history.push('/editphoto');
  };

  useEffect(() => {
    setNameOfPage('Добавить фото');
    getOnePhotoWork(id);
    getAllGroupOfImage();
    if (photoWorks.onePhoto) {
      setDescription(photoWorks.onePhoto.description);
    }

    if (imageGroups) {
      setSelectedGroup(photoWorks.onePhoto.imageGroup);
    }
  }, [
    setNameOfPage,
    getOnePhotoWork,
    getAllGroupOfImage,
    setDescription,
    setSelectedGroup
  ]);

  console.log('description:', description);
  console.log('selectedGroup:', selectedGroup);
  console.log(photoWorks.onePhoto.imageGroup);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center'>
          Редактируем фото
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems='center' spacing={3}>
        <Grid container className={classes.root}>
          <Grid item xs={2}>
            <img
              src={photoWorks.onePhoto.imageUrl}
              alt={photoWorks.onePhoto.imageUrl}
              className={classes.img}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant='outlined'
              type='text'
              fullWidth
              id='description'
              name='description'
              value={description}
              onChange={e => onChange(e)}
            />
          </Grid>

          <Grid item xs={4}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              fullWidth
              value={selectedGroup}
              onChange={selectChangeHandle}
            >
              {imageGroups.map(item => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                  selected={photoWorks.onePhoto.imageGroup === item._id}
                >
                  {item.imageGroup}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={2}>
            <Button
              color='primary'
              variant='contained'
              disabled={disabledForm}
              onClick={() => updateImageHandler()}
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

EditPhotoItem.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOnePhotoWork: PropTypes.func.isRequired,
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
  getOnePhotoWork,
  getAllGroupOfImage
})(EditPhotoItem);
