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

import { add_TYPE_OF_FIRM } from '../../../store/actions/accountant/referenceData/typeOf_Firm';

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

const TypeOf_Firm_Add = ({ setNameOfPage, add_TYPE_OF_FIRM }) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/type-of-firm');
  // };

  const [formData, setFormData] = useState({
    TypeOf_FirmLong: '',
    TypeOf_FirmShort: '',
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { TypeOf_FirmLong, TypeOf_FirmShort } = formData;

  useEffect(() => {
    setNameOfPage('Добавить тип фирмы');
  }, [setNameOfPage]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(TypeOf_FirmLong && TypeOf_FirmShort));
  };

  const addItemHandler = () => {
    add_TYPE_OF_FIRM(TypeOf_FirmLong, TypeOf_FirmShort);
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
          <Typography align='left'>
            Полное название формы собственности
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='TypeOf_FirmLong'
            fullWidth
            autoFocus
            placeholder='Введите полное название'
            type='text'
            value={TypeOf_FirmLong}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>
            Сокращенное название формы собственности
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='TypeOf_FirmShort'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={TypeOf_FirmShort}
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

TypeOf_Firm_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_TYPE_OF_FIRM: PropTypes.func.isRequired,
};

export default connect(null, {
  setNameOfPage,
  add_TYPE_OF_FIRM,
})(TypeOf_Firm_Add);
