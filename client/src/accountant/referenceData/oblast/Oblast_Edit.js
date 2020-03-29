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
  getOne_OBLAST,
  update_OBLAST
} from '../../../store/actions/accountant/referenceData/oblast';

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

const Oblast_Edit = ({
  setNameOfPage,
  getOne_OBLAST,
  update_OBLAST,
  state_oblast: { one_OBLAST, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/oblast');
  };

  const [oblastName, setOblastName] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать область');
    getOne_OBLAST(id);
  }, [setNameOfPage, getOne_OBLAST, id]);

  useLayoutEffect(() => {
    if (one_OBLAST) {
      setOblastName(one_OBLAST.oblastName);
    }
  }, [one_OBLAST]);

  const onChangeHandler = e => {
    setOblastName(e.target.value);
    setDisabledForm(!oblastName);
  };

  const updateItemHandler = () => {
    update_OBLAST(id, oblastName);
    history.push('/accountant/oblast');
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
          <Typography align='left'>Область</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='oblastName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={oblastName ? oblastName : ''}
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

Oblast_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_OBLAST: PropTypes.func.isRequired,
  update_OBLAST: PropTypes.func.isRequired,
  state_oblast: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_oblast: state.oblast
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_OBLAST,
  update_OBLAST
})(Oblast_Edit);
