import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_SERVICE_JOB,
  update_SERVICE_JOB
} from '../../../store/actions/accountant/referenceData/serviceJob';

import { getAll_UNITS } from '../../../store/actions/accountant/referenceData/unit';
import { getAll_GROUP_OF_SERVICE_JOBS } from '../../../store/actions/accountant/referenceData/groupOf_ServiceJob';

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
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 22,
    left: 7
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative'
  },
  select: {
    height: 55
    // border: '1px solid red'
  }
}));

const ServiceJob_Edit = ({
  setNameOfPage,
  getOne_SERVICE_JOB,
  update_SERVICE_JOB,
  getAll_UNITS,
  getAll_GROUP_OF_SERVICE_JOBS,
  serviceJob: { one_SERVICE_JOB, loading },
  unit,
  groupOf_ServiceJob
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/service-job');
  };

  const [pageForm, setPageForm] = useState({
    serviceName: '',
    thisUnit: '',
    serviceJobGroup: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { serviceName, thisUnit, serviceJobGroup } = pageForm;

  useEffect(() => {
    setNameOfPage('Редактировать вид работы');
    getAll_UNITS();
    getAll_GROUP_OF_SERVICE_JOBS();
    getOne_SERVICE_JOB(id);
  }, [
    setNameOfPage,
    getAll_UNITS,
    getAll_GROUP_OF_SERVICE_JOBS,
    getOne_SERVICE_JOB,
    id
  ]);

  useLayoutEffect(() => {
    if (one_SERVICE_JOB) {
      setPageForm({
        ...pageForm,
        serviceName: one_SERVICE_JOB.serviceName,
        thisUnit: one_SERVICE_JOB.unit,
        serviceJobGroup: one_SERVICE_JOB.serviceJobGroup
      });
    }
  }, [one_SERVICE_JOB]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(!(serviceName && thisUnit && serviceJobGroup));
  };

  const updateItemHandler = () => {
    update_SERVICE_JOB(id, serviceName, thisUnit, serviceJobGroup);
    history.push('/accountant/service-job');
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
          <Typography align='left'>Наименование работы</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='serviceName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={serviceName ? serviceName : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Единицы измерения</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!unit ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-unit'
                className={thisUnit ? classes.displayNone : classes.displayFlex}
              >
                ед. измерений
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-unit'
                fullWidth
                value={thisUnit ? thisUnit : ''}
                name='thisUnit'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {unit.arr_UNITS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.unitNameShort}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/unit/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа работ</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!groupOf_ServiceJob ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-service-job-group'
                className={
                  serviceJobGroup ? classes.displayNone : classes.displayFlex
                }
              >
                группа работ
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-service-job-group'
                fullWidth
                value={serviceJobGroup ? serviceJobGroup : ''}
                name='serviceJobGroup'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {groupOf_ServiceJob.arr_GROUP_OF_SERVICE_JOBS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.serviceJobGroup}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/group-of-servicejob/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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

ServiceJob_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_SERVICE_JOB: PropTypes.func.isRequired,
  update_SERVICE_JOB: PropTypes.func.isRequired,
  getAll_UNITS: PropTypes.func.isRequired,
  getAll_GROUP_OF_SERVICE_JOBS: PropTypes.func.isRequired,

  groupOf_ServiceJob: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
  serviceJob: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOf_ServiceJob: state.groupOf_ServiceJob,
  unit: state.unit,
  serviceJob: state.serviceJob
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_SERVICE_JOB,
  update_SERVICE_JOB,
  getAll_UNITS,
  getAll_GROUP_OF_SERVICE_JOBS
})(ServiceJob_Edit);
