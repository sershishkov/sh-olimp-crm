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
  getOne_STREET,
  update_STREET
} from '../../../store/actions/accountant/referenceData/street';

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

const Street_Edit = ({
  setNameOfPage,
  getOne_STREET,
  update_STREET,
  street: { one_STREET, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/street');
  };

  const [streetName, setStreetName] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать улицу');
    getOne_STREET(id);
  }, [setNameOfPage, getOne_STREET, id]);

  useLayoutEffect(() => {
    if (one_STREET) {
      setStreetName(one_STREET.streetName);
    }
  }, [one_STREET]);

  const onChangeHandler = e => {
    setStreetName(e.target.value);
    setDisabledForm(!streetName);
  };

  const updateItemHandler = () => {
    update_STREET(id, streetName);
    history.push('/accountant/street');
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
          <Typography align='left'>Улица</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='streetName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={streetName ? streetName : ''}
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

Street_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_STREET: PropTypes.func.isRequired,
  update_STREET: PropTypes.func.isRequired,
  street: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  street: state.street
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_STREET,
  update_STREET
})(Street_Edit);
