import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_WORKERS,
  delete_WORKER
} from '../../../store/actions/accountant/referenceData/worker';

import Spinner from '../../../shared/spinner/Spinner';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5
  },
  btnAddIcon: {
    width: 50,
    height: 50
  },
  rowItem: {
    // border: '1px solid red',
    justifyItems: 'center',
    alignItems: 'center'
  },
  rowItemDate: {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

const Worker_List = ({
  setNameOfPage,
  getAll_WORKERS,
  delete_WORKER,
  worker: { arr_WORKERS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список работников');
    getAll_WORKERS();
  }, [setNameOfPage, getAll_WORKERS]);

  const deleteItem = itemId => {
    delete_WORKER(itemId);
    window.location.reload();
  };

  const listOf_WORKERS = (
    <MaterialTable
      title='Список работников'
      columns={[
        { title: 'Фамилия', field: 'surname' },
        { title: 'Имя', field: 'name' },
        { title: 'Отчество', field: 'middleName' },
        { title: 'Дата рождения', field: 'dateOf_Birth' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_WORKERS.map(item => {
        return {
          surname: item.surname,
          name: item.name,
          middleName: item.middleName,
          dateOf_Birth: (
            <Moment format='DD-MM-YYYY'>{item.dateOf_Birth}</Moment>
          ),
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
              href={`/accountant/worker/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          )
        };
      })}
      options={{
        sorting: true,
        search: false
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
        href={`/accountant/worker/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_WORKERS}
      </Grid>
    </Grid>
  );
};

Worker_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_WORKERS: PropTypes.func.isRequired,
  delete_WORKER: PropTypes.func.isRequired,
  worker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  worker: state.worker
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_WORKERS,
  delete_WORKER
})(Worker_List);
