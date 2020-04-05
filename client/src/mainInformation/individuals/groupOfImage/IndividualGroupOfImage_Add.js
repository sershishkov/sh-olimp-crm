import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { add_INDIVIDUAL_IMAGE_GROUP } from '../../../store/actions/mainInformation/individuals/individual_groupOfImage';
import { setNameOfPage } from '../../../store/actions/nameOfPage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7.5rem',
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0,
  },
}));

const IndividualGroupOfImage_Add = ({
  add_INDIVIDUAL_IMAGE_GROUP,
  setNameOfPage,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [newGroup, setNewGroup] = useState({
    imageGroup: '',
    descriptions: '',
  });

  const { imageGroup, descriptions } = newGroup;
  const [disabledForm, setDisabledForm] = useState(true);
  useEffect(() => {
    setNameOfPage('Добавить группу фотографий');
  }, [setNameOfPage]);

  const addGroupHandler = () => {
    add_INDIVIDUAL_IMAGE_GROUP(imageGroup, descriptions);
    history.goBack();
  };
  const onChange = (e) => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
    setDisabledForm(!(imageGroup && descriptions));
  };

  const buttonBackHandler = () => {
    history.goBack();
  };
  return (
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
            value={imageGroup}
            onChange={(e) => onChange(e)}
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
            value={descriptions}
            onChange={(e) => onChange(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant='contained'
          fullWidth
          disabled={disabledForm}
          color='primary'
          onClick={addGroupHandler}
        >
          Добавить
        </Button>
      </Grid>
    </Grid>
  );
};

IndividualGroupOfImage_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_INDIVIDUAL_IMAGE_GROUP: PropTypes.func.isRequired,
};

export default connect(null, { add_INDIVIDUAL_IMAGE_GROUP, setNameOfPage })(
  IndividualGroupOfImage_Add
);
