import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne_INDIVIDUAL_PHOTO,
  update_INDIVIDUAL_PHOTO,
} from '../../../store/actions/mainInformation/individuals/individual_photoWorks';
import { getAll_INDIVIDUAL_IMAGE_GROUPS } from '../../../store/actions/mainInformation/individuals/individual_groupOfImage';

import Spinner from '../../../shared/spinner/Spinner';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7.5rem',
  },
  header: {
    marginBottom: '1rem',
  },
  gridItem: {
    padding: '1rem',
  },
  list: {},
  listItem: {},
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover',
  },
  btnSave: {
    height: 50,
    width: 50,
    // fontSize: 'large'
  },
  wrapSelect: {
    position: 'relative',
  },
  select: {
    height: 55,
  },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 25,
    left: 5,
  },
  wrapCont: {
    display: 'flex',
    // width: '100%',
    // border: '1px solid green'
  },
}));

const IndividualPhoto_Edit = ({
  setNameOfPage,

  getOne_INDIVIDUAL_PHOTO,
  getAll_INDIVIDUAL_IMAGE_GROUPS,
  update_INDIVIDUAL_PHOTO,

  state_individual_groupOfImage: { arr_INDIVIDUAL_IMAGE_GROUPS, loading },
  state_individual_photoWorks: { one_INDIVIDUAL_PHOTO },
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [newPhoto, setNewPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [disabledForm, setDisabledForm] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');

  const selectChangeHandle = (e) => {
    setSelectedGroup(e.target.value);
    setDisabledForm(!(selectedGroup && description));
  };

  const pickedHandler = (e) => {
    // e.preventDefault();
    setNewPhoto(e.target.files[0]);

    setDisabledForm(!(selectedGroup && description));
  };

  const updateImageHandler = () => {
    update_INDIVIDUAL_PHOTO(id, newPhoto, selectedGroup, description);
    history.push('/individual-photo');
  };

  const onChange = (e) => {
    setDescription(e.target.value);
    setDisabledForm(!(newPhoto || selectedGroup || description));
  };

  const buttonBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    setNameOfPage('Редактируем фото');
    getOne_INDIVIDUAL_PHOTO(id);
    getAll_INDIVIDUAL_IMAGE_GROUPS();

    if (newPhoto) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(newPhoto);
    }
  }, [
    setNameOfPage,
    getOne_INDIVIDUAL_PHOTO,
    getAll_INDIVIDUAL_IMAGE_GROUPS,
    id,
    newPhoto,
  ]);

  useLayoutEffect(() => {
    if (one_INDIVIDUAL_PHOTO) {
      setDescription(one_INDIVIDUAL_PHOTO.description);
      setSelectedGroup(one_INDIVIDUAL_PHOTO.imageGroup);
    }
  }, [one_INDIVIDUAL_PHOTO]);

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
      <Grid item xs={12} className={classes.header}>
        <Typography component='h1' variant='h5' align='center'>
          Редактируем
        </Typography>
      </Grid>
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
      <Grid item xs={12}>
        <TextField
          name='newPhoto'
          accept='image/*'
          type='file'
          id='raised-new-photo'
          style={{ display: 'none' }}
          onChange={(e) => pickedHandler(e)}
        />
        <label htmlFor='raised-new-photo'>
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
            src={one_INDIVIDUAL_PHOTO.imageUrl}
            alt={one_INDIVIDUAL_PHOTO.imageUrl}
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
            value={description ? description : ''}
            onChange={(e) => onChange(e)}
          />
        </Grid>

        <Grid item xs={3} container justify='center' alignItems='center'>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            fullWidth
            variant='outlined'
            value={selectedGroup ? selectedGroup : ''}
            onChange={selectChangeHandle}
            className={classes.select}
          >
            {arr_INDIVIDUAL_IMAGE_GROUPS.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.imageGroup}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/individual-imagegroup/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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

IndividualPhoto_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_INDIVIDUAL_PHOTO: PropTypes.func.isRequired,
  getAll_INDIVIDUAL_IMAGE_GROUPS: PropTypes.func.isRequired,
  update_INDIVIDUAL_PHOTO: PropTypes.func.isRequired,

  state_individual_photoWorks: PropTypes.object.isRequired,
  state_individual_groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_individual_photoWorks: state.individual_photoWorks,
  state_individual_groupOfImage: state.individual_groupOfImage,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_INDIVIDUAL_PHOTO,
  getAll_INDIVIDUAL_IMAGE_GROUPS,
  update_INDIVIDUAL_PHOTO,
})(IndividualPhoto_Edit);
