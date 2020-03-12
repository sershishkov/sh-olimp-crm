import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../store/actions/nameOfPage';
import { getOnePhotoWork, updatePhotoWork } from '../store/actions/photoWorks';
import { getAllGroupOfImage } from '../store/actions/groupOfImage';
import { getAllCategoryOfClient } from '../store/actions/categoryOf_Client';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: '1rem'
    // border: '1px solid red'
  },
  header: {
    marginBottom: '1rem'
  },
  gridItem: {
    padding: '1rem'
  },
  list: {},
  listItem: {},
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover'
  },
  btnSave: {
    height: 50,
    width: 50
    // fontSize: 'large'
  },
  wrapSelect: {
    position: 'relative'
  },
  select: {
    height: 55
  },
  displayNone: {
    display: 'none'
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 25,
    left: 5
  },
  wrapCont: {
    display: 'flex'
    // width: '100%',
    // border: '1px solid green'
  }
}));

const EditPhotoItem = ({
  photoWorks,
  groupOfImage,
  setNameOfPage,
  getOnePhotoWork,
  getAllGroupOfImage,
  getAllCategoryOfClient,
  updatePhotoWork,
  clientCategory: { clientCategorys }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [disabledForm, setDisabledForm] = useState(true);

  const selectChangeHandle = e => {
    setSelectedGroup(e.target.value);
    setDisabledForm(!(selectedGroup && description && selectedCategory));
  };

  const selectCategoryHandle = e => {
    setSelectedCategory(e.target.value);
    setDisabledForm(!(selectedGroup && description && selectedCategory));
  };

  const onChange = e => {
    setDescription(e.target.value);
    setDisabledForm(!(selectedGroup && description && selectedCategory));
  };

  const updateImageHandler = () => {
    updatePhotoWork(id, selectedGroup, description);
    history.push('/editphoto');
  };

  useEffect(() => {
    setNameOfPage('Редактируем фото');
    getOnePhotoWork(id);
    getAllGroupOfImage();
    getAllCategoryOfClient();
  }, [
    setNameOfPage,
    getOnePhotoWork,
    getAllGroupOfImage,
    getAllCategoryOfClient,
    id
  ]);

  useLayoutEffect(() => {
    if (photoWorks.onePhoto) {
      setDescription(photoWorks.onePhoto.description);
      setSelectedGroup(photoWorks.onePhoto.imageGroup);
      // setSelectedCategory(photoWorks.onePhoto.categoryGroupOf_image._id);
    }
  }, [setDescription, setSelectedGroup, photoWorks]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <Typography component='h1' variant='h5' align='center'>
          Редактируем
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        container
        alignItems='center'
        spacing={1}
        className={classes.wrapCont}
      >
        <Grid item xs={2} container justify='center'>
          <img
            src={photoWorks.onePhoto.imageUrl}
            alt={photoWorks.onePhoto.imageUrl}
            className={classes.img}
          />
        </Grid>

        <Grid
          item
          xs={5}
          container
          justify='center'
          alignItems='center'
          className={classes.gridItem}
        >
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

        <Grid item xs={2} container justify='center' alignItems='center'>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            fullWidth
            variant='outlined'
            value={selectedGroup}
            onChange={selectChangeHandle}
            className={classes.select}
          >
            {groupOfImage.imageGroups.map(item => (
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

        <Grid item xs={2} className={classes.wrapSelect}>
          <InputLabel
            id='add-select-category'
            className={
              selectedCategory ? classes.displayNone : classes.displayFlex
            }
          >
            Выбрать категорию
          </InputLabel>
          <Select
            labelId='add-select-category'
            fullWidth
            variant='outlined'
            value={selectedCategory}
            name='selectedCategory'
            onChange={selectCategoryHandle}
            className={classes.select}
          >
            {clientCategorys.map(item => (
              <MenuItem key={item._id} value={item._id}>
                {item.categoryOf_Group}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={1} container justify='center' alignItems='center'>
          <IconButton
            color='primary'
            variant='contained'
            disabled={disabledForm}
            onClick={() => updateImageHandler()}
          >
            <SaveIcon className={classes.btnSave} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

EditPhotoItem.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOnePhotoWork: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  updatePhotoWork: PropTypes.func.isRequired,
  getAllCategoryOfClient: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired,
  groupOfImage: PropTypes.object.isRequired,
  clientCategory: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photoWorks: state.photoWorks,
  groupOfImage: state.groupOfImage,
  clientCategory: state.clientCategory
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOnePhotoWork,
  getAllGroupOfImage,
  updatePhotoWork,
  getAllCategoryOfClient
})(EditPhotoItem);
