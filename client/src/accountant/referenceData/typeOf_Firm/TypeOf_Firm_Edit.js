import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_TYPE_OF_FIRM,
  update_TYPE_OF_FIRM
} from '../../../store/actions/accountant/referenceData/typeOf_Firm';

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

const TypeOf_Firm_Edit = ({
  setNameOfPage,
  getOne_TYPE_OF_FIRM,
  update_TYPE_OF_FIRM,
  typeOf_Firm: { one_TYPE_OF_FIRM, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-firm');
  };

  const [formData, setFormData] = useState({
    TypeOf_FirmLong: '',
    TypeOf_FirmShort: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { TypeOf_FirmLong, TypeOf_FirmShort } = formData;

  useEffect(() => {
    setNameOfPage('Редактировать тип фирмы');
    getOne_TYPE_OF_FIRM(id);
  }, [setNameOfPage, getOne_TYPE_OF_FIRM, id]);

  useLayoutEffect(() => {
    if (one_TYPE_OF_FIRM) {
      setFormData({
        ...FormData,
        TypeOf_FirmLong: one_TYPE_OF_FIRM.TypeOf_FirmLong,
        TypeOf_FirmShort: one_TYPE_OF_FIRM.TypeOf_FirmShort
      });
    }
  }, [one_TYPE_OF_FIRM]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(TypeOf_FirmLong && TypeOf_FirmShort));
  };

  const updateItemHandler = () => {
    update_TYPE_OF_FIRM(id, TypeOf_FirmLong, TypeOf_FirmShort);
    history.push('/accountant/type-of-firm');
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
      <Grid item xs={6}>
        <TextField
          variant='outlined'
          name='TypeOf_FirmLong'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={TypeOf_FirmLong ? TypeOf_FirmLong : ''}
          onChange={e => onChangeHandler(e)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant='outlined'
          name='TypeOf_FirmShort'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={TypeOf_FirmShort ? TypeOf_FirmShort : ''}
          onChange={e => onChangeHandler(e)}
        />
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

TypeOf_Firm_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_TYPE_OF_FIRM: PropTypes.func.isRequired,
  update_TYPE_OF_FIRM: PropTypes.func.isRequired,
  typeOf_Firm: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_Firm: state.typeOf_Firm
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_TYPE_OF_FIRM,
  update_TYPE_OF_FIRM
})(TypeOf_Firm_Edit);
