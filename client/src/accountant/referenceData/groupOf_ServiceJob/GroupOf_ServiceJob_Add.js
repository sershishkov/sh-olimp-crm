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

import { add_GROUP_OF_SERVICE_JOB } from '../../../store/actions/accountant/referenceData/groupOf_ServiceJob';

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

const GroupOf_ServiceJob_Add = ({
  setNameOfPage,
  add_GROUP_OF_SERVICE_JOB
}) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/group-of-servicejob');
  };

  const [serviceJobGroup, setServiceJobGroup] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Создать группу работ');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setServiceJobGroup(e.target.value);
    setDisabledForm(!serviceJobGroup);
  };

  const addItemHandler = () => {
    add_GROUP_OF_SERVICE_JOB(serviceJobGroup);
    history.goBack();
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
          <Typography align='left'>Группа работ</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='serviceJobGroup'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={serviceJobGroup}
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

GroupOf_ServiceJob_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_GROUP_OF_SERVICE_JOB: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  add_GROUP_OF_SERVICE_JOB
})(GroupOf_ServiceJob_Add);
