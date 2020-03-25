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
  getOne_CITY,
  update_CITY
} from '../../../store/actions/accountant/referenceData/city';

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

const City_Edit = ({
  setNameOfPage,
  getOne_CITY,
  update_CITY,
  city: { one_CITY, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/city');
  };

  const [cityName, setCityName] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать город');
    getOne_CITY(id);
  }, [setNameOfPage, getOne_CITY, id]);

  useLayoutEffect(() => {
    if (one_CITY) {
      setCityName(one_CITY.cityName);
    }
  }, [one_CITY]);

  const onChangeHandler = e => {
    setCityName(e.target.value);
    setDisabledForm(!cityName);
  };

  const updateItemHandler = () => {
    update_CITY(id, cityName);
    history.push('/accountant/city');
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
          <Typography align='left'>Город</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='cityName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={cityName ? cityName : ''}
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

City_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_CITY: PropTypes.func.isRequired,
  update_CITY: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_CITY,
  update_CITY
})(City_Edit);
