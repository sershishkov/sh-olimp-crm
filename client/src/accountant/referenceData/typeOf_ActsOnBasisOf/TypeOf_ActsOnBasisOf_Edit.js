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
  getOne_TYPE_OF_ACTS_ON_BASIS_OF,
  update_TYPE_OF_ACTS_ON_BASIS_OF
} from '../../../store/actions/accountant/referenceData/typeOf_ActsOnBasisOf';

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

const TypeOf_ActsOnBasisOf_Edit = ({
  getOne_TYPE_OF_ACTS_ON_BASIS_OF,
  update_TYPE_OF_ACTS_ON_BASIS_OF,
  typeOf_ActsOnBasisOf: { one_TYPE_OF_ACTS_ON_BASIS_OF, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-acts-on-basis-of');
  };

  const [actOnBasisOf, setActOnBasisOf] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Создать группу едениц измерения');
    getOne_TYPE_OF_ACTS_ON_BASIS_OF(id);
  }, [setNameOfPage, getOne_TYPE_OF_ACTS_ON_BASIS_OF, id]);

  useLayoutEffect(() => {
    if (one_TYPE_OF_ACTS_ON_BASIS_OF) {
      setActOnBasisOf(one_TYPE_OF_ACTS_ON_BASIS_OF.actOnBasisOf);
    }
  }, [one_TYPE_OF_ACTS_ON_BASIS_OF]);

  const onChangeHandler = e => {
    setActOnBasisOf(e.target.value);
    setDisabledForm(!actOnBasisOf);
  };

  const updateItemHandler = () => {
    update_TYPE_OF_ACTS_ON_BASIS_OF(id, actOnBasisOf);
    history.push('/accountant/type-of-acts-on-basis-of');
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
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          name='actOnBasisOf'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={actOnBasisOf ? actOnBasisOf : ''}
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

TypeOf_ActsOnBasisOf_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_TYPE_OF_ACTS_ON_BASIS_OF: PropTypes.func.isRequired,
  update_TYPE_OF_ACTS_ON_BASIS_OF: PropTypes.func.isRequired,
  typeOf_ActsOnBasisOf: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_ActsOnBasisOf: state.typeOf_ActsOnBasisOf
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_TYPE_OF_ACTS_ON_BASIS_OF,
  update_TYPE_OF_ACTS_ON_BASIS_OF
})(TypeOf_ActsOnBasisOf_Edit);
