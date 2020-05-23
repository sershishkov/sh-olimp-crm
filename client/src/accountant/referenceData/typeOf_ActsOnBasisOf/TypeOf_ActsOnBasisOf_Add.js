import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_TYPE_OF_ACTS_ON_BASIS_OF } from '../../../store/actions/accountant/referenceData/typeOf_ActsOnBasisOf';

// import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7rem',
    backgroundColor: 'white',
  },
  // buttonBack: {
  //   position: 'fixed',
  //   top: '5rem',
  //   left: 0
  // },
  displayNone: {
    display: 'none',
  },
}));

const TypeOf_ActsOnBasisOf_Add = ({
  setNameOfPage,
  add_TYPE_OF_ACTS_ON_BASIS_OF,
}) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/type-of-acts-on-basis-of');
  // };

  const [actOnBasisOf, setActOnBasisOf] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Добавить основание');
  }, [setNameOfPage]);

  const onChangeHandler = (e) => {
    setActOnBasisOf(e.target.value);
    setDisabledForm(!actOnBasisOf);
  };

  const addItemHandler = () => {
    add_TYPE_OF_ACTS_ON_BASIS_OF(actOnBasisOf);
    // history.goBack();
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      {/* <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button> */}

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Основание действия руководителя</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='actOnBasisOf'
            fullWidth
            autoFocus
            placeholder='Введите полное название'
            type='text'
            value={actOnBasisOf}
            onChange={(e) => onChangeHandler(e)}
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
          onClick={() => addItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

TypeOf_ActsOnBasisOf_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_TYPE_OF_ACTS_ON_BASIS_OF: PropTypes.func.isRequired,
};

export default connect(null, {
  setNameOfPage,
  add_TYPE_OF_ACTS_ON_BASIS_OF,
})(TypeOf_ActsOnBasisOf_Add);
