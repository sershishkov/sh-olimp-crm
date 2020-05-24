import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_SERVICE_JOBS,
  delete_SERVICE_JOB,
} from '../../../store/actions/accountant/referenceData/serviceJob';

import Spinner from '../../../shared/spinner/Spinner';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5,
  },
  btnAddIcon: {
    width: 50,
    height: 50,
  },
}));

const ServiceJob_List = ({
  setNameOfPage,
  getAll_SERVICE_JOBS,
  delete_SERVICE_JOB,
  serviceJob: { arr_SERVICE_JOBS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список видов работ');
    getAll_SERVICE_JOBS();
  }, [setNameOfPage, getAll_SERVICE_JOBS]);

  const deleteItem = (itemId) => {
    delete_SERVICE_JOB(itemId);
    window.location.reload();
  };

  const listOf_SERVICE_JOBS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Название работы', field: 'field_serviceName' },
        { title: 'ед.изм', field: 'field_unit' },
        { title: 'Группа работ', field: 'field_serviceJobGroup' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_SERVICE_JOBS.map((item) => {
        return {
          field_serviceName: item.serviceName,
          field_unit: item.unit.unitNameShort,
          field_serviceJobGroup: item.serviceJobGroup.serviceJobGroup,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => deleteItem(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/accountant/service-job/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          ),
        };
      })}
      options={{
        sorting: true,
        search: false,
        pageSize: 10,
      }}
    />
  );

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <IconButton
        variant='contained'
        color='secondary'
        href={`/accountant/service-job/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_SERVICE_JOBS}
      </Grid>
    </Grid>
  );
};

ServiceJob_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_SERVICE_JOBS: PropTypes.func.isRequired,
  delete_SERVICE_JOB: PropTypes.func.isRequired,
  serviceJob: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  serviceJob: state.serviceJob,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_SERVICE_JOBS,
  delete_SERVICE_JOB,
})(ServiceJob_List);
