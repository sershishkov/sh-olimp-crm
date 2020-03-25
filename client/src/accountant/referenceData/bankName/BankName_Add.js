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

import { add_BANK_NAME } from '../../../store/actions/accountant/referenceData/bankName';

// import Spinner from '../../../shared/spinner/Spinner';

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

const BankName_Add = ({ setNameOfPage, add_BANK_NAME }) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/bankname');
  };

  const [formData, setFormData] = useState({
    bankName: '',
    mfo: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { bankName, mfo } = formData;

  useEffect(() => {
    setNameOfPage('Добавить банк');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(bankName && mfo));
  };

  const addItemHandler = () => {
    add_BANK_NAME(bankName, mfo);
    history.push('/accountant/bankname');
  };

  return (
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
          <Typography align='left'>Название банка</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='bankName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={bankName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>МФО Банка</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='mfo'
            fullWidth
            placeholder='Введите полное название'
            type='number'
            value={mfo}
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
          onClick={() => addItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

BankName_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_BANK_NAME: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  add_BANK_NAME
})(BankName_Add);
