import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_FIRST_PERSON_POSITION,
  update_FIRST_PERSON_POSITION
} from '../../../store/actions/accountant/referenceData/firstPersonPosition';

import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7rem'
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0
  },
  displayNone: {
    display: 'none'
  }
}));

const FirstPersonPosition_Edit = ({
  setNameOfPage,
  getOne_FIRST_PERSON_POSITION,
  update_FIRST_PERSON_POSITION,
  firstPersonPosition: { one_FIRST_PERSON_POSITION, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/personposition');
  };

  const [formData, setFormData] = useState({
    position: '',
    positionRoditPadej: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { position, positionRoditPadej } = formData;

  useEffect(() => {
    setNameOfPage('Редактировать должность');
    getOne_FIRST_PERSON_POSITION(id);
  }, [setNameOfPage, getOne_FIRST_PERSON_POSITION, id]);

  useLayoutEffect(() => {
    if (one_FIRST_PERSON_POSITION) {
      setFormData({
        ...FormData,
        position: one_FIRST_PERSON_POSITION.position,
        positionRoditPadej: one_FIRST_PERSON_POSITION.positionRoditPadej
      });
    }
  }, [one_FIRST_PERSON_POSITION]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(position && positionRoditPadej));
  };

  const updateItemHandler = () => {
    update_FIRST_PERSON_POSITION(id, position, positionRoditPadej);
    history.push('/accountant/personposition');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root} spacing={1}>
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
          <Typography align='left'>Должность</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='position'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={position ? position : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Должность в родительном падеже</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='positionRoditPadej'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={positionRoditPadej ? positionRoditPadej : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          type='button'
          fullWidth
          disabled={disabledForm}
          variant='contained'
          color='primary'
          className={classes.buttonAdd}
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

FirstPersonPosition_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_FIRST_PERSON_POSITION: PropTypes.func.isRequired,
  update_FIRST_PERSON_POSITION: PropTypes.func.isRequired,
  firstPersonPosition: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  firstPersonPosition: state.firstPersonPosition
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_FIRST_PERSON_POSITION,
  update_FIRST_PERSON_POSITION
})(FirstPersonPosition_Edit);
