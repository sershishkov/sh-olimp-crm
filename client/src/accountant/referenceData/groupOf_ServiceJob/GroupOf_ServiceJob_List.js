import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_GROUP_OF_SERVICE_JOBS,
  delete_GROUP_OF_SERVICE_JOB,
} from '../../../store/actions/accountant/referenceData/groupOf_ServiceJob';

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

const GroupOf_ServiceJob_List = ({
  setNameOfPage,
  getAll_GROUP_OF_SERVICE_JOBS,
  delete_GROUP_OF_SERVICE_JOB,
  groupOf_ServiceJob: { arr_GROUP_OF_SERVICE_JOBS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список групп работ');
    getAll_GROUP_OF_SERVICE_JOBS();
  }, [setNameOfPage, getAll_GROUP_OF_SERVICE_JOBS]);

  const deleteItem = (itemId) => {
    delete_GROUP_OF_SERVICE_JOB(itemId);
    window.location.reload();
  };

  const listOf_GROUP_OF_SERVICE_JOBS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Группа работ', field: 'field_serviceJobGroup' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_GROUP_OF_SERVICE_JOBS.map((item) => {
        return {
          field_serviceJobGroup: item.serviceJobGroup,
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
              href={`/accountant/group-of-servicejob/${item._id}`}
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
        href={`/accountant/group-of-servicejob/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_GROUP_OF_SERVICE_JOBS}
      </Grid>
    </Grid>
  );
};

GroupOf_ServiceJob_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_GROUP_OF_SERVICE_JOBS: PropTypes.func.isRequired,
  delete_GROUP_OF_SERVICE_JOB: PropTypes.func.isRequired,
  groupOf_ServiceJob: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groupOf_ServiceJob: state.groupOf_ServiceJob,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_GROUP_OF_SERVICE_JOBS,
  delete_GROUP_OF_SERVICE_JOB,
})(GroupOf_ServiceJob_List);
