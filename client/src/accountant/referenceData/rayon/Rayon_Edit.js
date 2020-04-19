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
  getOne_RAYON,
  update_RAYON
} from '../../../store/actions/accountant/referenceData/rayon';

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

const Rayon_Edit = ({
  setNameOfPage,
  getOne_RAYON,
  update_RAYON,
  state_rayon: { one_RAYON, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/rayon');
  };

  const [rayonName, setRayontName] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать район');
    getOne_RAYON(id);
  }, [setNameOfPage, getOne_RAYON, id]);

  useLayoutEffect(() => {
    if (one_RAYON) {
      setRayontName(one_RAYON.rayonName);
    }
  }, [one_RAYON]);

  const onChangeHandler = e => {
    setRayontName(e.target.value);
    setDisabledForm(!rayonName);
  };

  const updateItemHandler = () => {
    update_RAYON(id, rayonName);
    history.push('/accountant/rayon');
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
          <Typography align='left'>Район</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='rayonName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={rayonName ? rayonName : ''}
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

Rayon_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_RAYON: PropTypes.func.isRequired,
  update_RAYON: PropTypes.func.isRequired,
  state_rayon: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_rayon: state.rayon
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_RAYON,
  update_RAYON
})(Rayon_Edit);
