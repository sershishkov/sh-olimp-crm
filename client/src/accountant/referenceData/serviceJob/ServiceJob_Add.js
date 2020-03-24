import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_SERVICE_JOB } from '../../../store/actions/accountant/referenceData/serviceJob';

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

const ServiceJob_Add = ({
  setNameOfPage,
  add_SERVICE_JOB,
  getAll_UNITS,
  getAll_GROUP_OF_SERVICE_JOBS,
  unit,
  groupOf_ServiceJob
}) => {
  const classes = useStyles();
  const history = useHistory();

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
    setNameOfPage('Создать вид работ');
    getAll_UNITS();
    getAll_GROUP_OF_SERVICE_JOBS();
  }, [setNameOfPage, getAll_UNITS, getAll_GROUP_OF_SERVICE_JOBS]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(!(serviceName && thisUnit && serviceJobGroup));
  };

  const addItemHandler = () => {
    add_SERVICE_JOB(serviceName, thisUnit, serviceJobGroup);
    history.push('/accountant/service-job');
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
          <Typography align='left'>Наименование работы</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='serviceName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={serviceName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Единицы измерения</Typography>
        </Grid>
        <Grid item xs={8} container>
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
                value={thisUnit}
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
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа работ</Typography>
        </Grid>
        <Grid item xs={8} container>
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
                value={serviceJobGroup}
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

ServiceJob_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_SERVICE_JOB: PropTypes.func.isRequired,
  getAll_UNITS: PropTypes.func.isRequired,
  getAll_GROUP_OF_SERVICE_JOBS: PropTypes.func.isRequired,
  unit: PropTypes.object.isRequired,
  groupOf_ServiceJob: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  unit: state.unit,
  groupOf_ServiceJob: state.groupOf_ServiceJob
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_SERVICE_JOB,
  getAll_UNITS,
  getAll_GROUP_OF_SERVICE_JOBS
})(ServiceJob_Add);
