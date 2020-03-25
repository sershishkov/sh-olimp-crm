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
  getOne_BANK_NAME,
  update_BANK_NAME
} from '../../../store/actions/accountant/referenceData/bankName';

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

const BankName_Edit = ({
  setNameOfPage,
  getOne_BANK_NAME,
  update_BANK_NAME,
  bankName: { one_BANK_NAME, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

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
    setNameOfPage('Редактировать банк');
    getOne_BANK_NAME(id);
  }, [setNameOfPage, getOne_BANK_NAME, id]);

  useLayoutEffect(() => {
    if (one_BANK_NAME) {
      setFormData({
        ...FormData,
        bankName: one_BANK_NAME.bankName,
        mfo: one_BANK_NAME.mfo
      });
    }
  }, [one_BANK_NAME]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(bankName && mfo));
  };

  const updateItemHandler = () => {
    update_BANK_NAME(id, bankName, mfo);
    history.push('/accountant/bankname');
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
          <Typography align='left'>Название банка</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='bankName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={bankName ? bankName : ''}
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
            value={mfo ? mfo : ''}
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

BankName_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_BANK_NAME: PropTypes.func.isRequired,
  update_BANK_NAME: PropTypes.func.isRequired,
  bankName: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bankName: state.bankName
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_BANK_NAME,
  update_BANK_NAME
})(BankName_Edit);
