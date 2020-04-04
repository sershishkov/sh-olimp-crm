import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOneGroupOfImage,
  updateGroupOfImage
} from '../../../store/actions/mainInformation/osbb/groupOfImage';

import Spinner from '../../../shared/spinner/Spinner';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7.5rem'
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0
  }
}));

const TypeOfImageEdit = ({
  groupOfImage: { oneImageGroups, loading },
  getOneGroupOfImage,
  updateGroupOfImage,
  setNameOfPage
}) => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  const [newGroup, setNewGroup] = useState({
    imageGroup: '',
    descriptions: ''
  });
  const { imageGroup, descriptions } = newGroup;

  const [disabledForm, setDisabledForm] = useState(true);

  const onChange = e => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
    setDisabledForm(!(imageGroup || descriptions));
  };

  const buttonBackHandler = () => {
    history.goBack();
    // history.push('/accountant/unit');
  };

  useEffect(() => {
    setNameOfPage('Редактируем группу');
    getOneGroupOfImage(id);

    if (oneImageGroups.imageGroup && oneImageGroups.descriptionsSTR) {
      setNewGroup({
        ...newGroup,
        imageGroup: oneImageGroups.imageGroup,
        descriptions: oneImageGroups.descriptionsSTR
      });
    }
  }, [
    setNameOfPage,
    getOneGroupOfImage,
    setNewGroup,
    loading,
    oneImageGroups.imageGroup,
    oneImageGroups.descriptionsSTR,
    id
  ]);

  const updateGroupHandler = () => {
    updateGroupOfImage(id, imageGroup, descriptions);
    history.push('/group-of-image');
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

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='text'
            fullWidth
            placeholder='Введите новую группу'
            name='imageGroup'
            value={imageGroup ? imageGroup : ''}
            onChange={e => onChange(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Описание </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='text'
            multiline
            fullWidth
            placeholder='Введите описание через запятую'
            name='descriptions'
            value={descriptions ? descriptions : ''}
            onChange={e => onChange(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          fullWidth
          disabled={disabledForm}
          color='primary'
          onClick={updateGroupHandler}
        >
          Сохранить изменения
        </Button>
      </Grid>
    </Grid>
  );
};

TypeOfImageEdit.propTypes = {
  groupOfImage: PropTypes.object.isRequired,
  getOneGroupOfImage: PropTypes.func.isRequired,
  setNameOfPage: PropTypes.func.isRequired,
  updateGroupOfImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  getOneGroupOfImage,
  updateGroupOfImage,
  setNameOfPage
})(TypeOfImageEdit);
