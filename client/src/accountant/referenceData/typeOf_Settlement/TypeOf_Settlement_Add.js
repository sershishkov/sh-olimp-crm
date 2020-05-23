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

import { add_TYPE_OF_SETTLEMENT } from '../../../store/actions/accountant/referenceData/typeOf_Settlement';

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

const TypeOf_Street_Add = ({ setNameOfPage, add_TYPE_OF_SETTLEMENT }) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/type-of-settlement');
  // };

  const [formData, setFormData] = useState({
    typeOf_SettlementLong: '',
    typeOf_SettlementShort: '',
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { typeOf_SettlementLong, typeOf_SettlementShort } = formData;

  useEffect(() => {
    setNameOfPage('Добавить тип населенного пункта');
  }, [setNameOfPage]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(typeOf_SettlementLong && typeOf_SettlementShort));
  };

  const addItemHandler = () => {
    add_TYPE_OF_SETTLEMENT(typeOf_SettlementLong, typeOf_SettlementShort);
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
          <Typography align='left'>Полное название типа города</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_SettlementLong'
            fullWidth
            autoFocus
            placeholder='Введите полное название'
            type='text'
            value={typeOf_SettlementLong}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Сокращенное название типа города</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_SettlementShort'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_SettlementShort}
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

TypeOf_Street_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_TYPE_OF_SETTLEMENT: PropTypes.func.isRequired,
};

export default connect(null, {
  setNameOfPage,
  add_TYPE_OF_SETTLEMENT,
})(TypeOf_Street_Add);
