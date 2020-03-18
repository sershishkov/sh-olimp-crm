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
  getOne_GROUP_OF_SERVICE_JOB,
  update_GROUP_OF_SERVICE_JOB
} from '../../../store/actions/accountant/referenceData/groupOf_ServiceJob';

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

const GroupOf_ServiceJob_Edit = ({
  setNameOfPage,
  getOne_GROUP_OF_SERVICE_JOB,
  update_GROUP_OF_SERVICE_JOB,
  groupOf_ServiceJob: { one_GROUP_OF_SERVICE_JOB, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/group-of-servicejob');
  };

  const [serviceJobGroup, setServiceJobGroup] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать группу работ');
    getOne_GROUP_OF_SERVICE_JOB(id);
  }, [setNameOfPage, getOne_GROUP_OF_SERVICE_JOB, id]);

  useLayoutEffect(() => {
    if (one_GROUP_OF_SERVICE_JOB) {
      setServiceJobGroup(one_GROUP_OF_SERVICE_JOB.serviceJobGroup);
    }
  }, [one_GROUP_OF_SERVICE_JOB]);

  const onChangeHandler = e => {
    setServiceJobGroup(e.target.value);
    setDisabledForm(!serviceJobGroup);
  };

  const updateItemHandler = () => {
    update_GROUP_OF_SERVICE_JOB(id, serviceJobGroup);
    history.push('/accountant/group-of-servicejob');
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
          name='serviceJobGroup'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={serviceJobGroup ? serviceJobGroup : ''}
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

GroupOf_ServiceJob_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_GROUP_OF_SERVICE_JOB: PropTypes.func.isRequired,
  update_GROUP_OF_SERVICE_JOB: PropTypes.func.isRequired,
  groupOf_ServiceJob: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOf_ServiceJob: state.groupOf_ServiceJob
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_GROUP_OF_SERVICE_JOB,
  update_GROUP_OF_SERVICE_JOB
})(GroupOf_ServiceJob_Edit);
