import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_OUR_WORKERS_SALARYS,
  delete_OUR_WORKERS_SALARY,
} from '../../../store/actions/accountant/ourMainData/our_WorkersSalary';

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

const Our_WorkersSalary_List = ({
  setNameOfPage,
  getAll_OUR_WORKERS_SALARYS,
  delete_OUR_WORKERS_SALARY,
  state_our_WorkersSalary: { arr_OUR_WORKERS_SALARYS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список зарплат');
    getAll_OUR_WORKERS_SALARYS();
  }, [setNameOfPage, getAll_OUR_WORKERS_SALARYS]);

  const deleteItem = (itemId) => {
    delete_OUR_WORKERS_SALARY(itemId);
    window.location.reload();
  };

  const listOf_OUR_WORKERS_SALARYS = (
    <MaterialTable
      title='Список выплат зарплаты'
      columns={[
        { title: 'Номер', field: 'paymentNumber' },
        { title: 'Дата', field: 'datePayment' },
        { title: 'Работник', field: 'worker' },
        { title: 'Наша фирма', field: 'ourFirm' },
        { title: 'Клиент', field: 'client' },
        { title: 'Сумма', field: 'sum' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_OUR_WORKERS_SALARYS.map((item) => {
        return {
          paymentNumber: item.paymentNumber,
          datePayment: <Moment format='DD-MM-YYYY'>{item.datePayment}</Moment>,
          worker: item.worker.surname,
          ourFirm: item.ourFirm.firmName,
          client: item.client.firmName,
          sum: item.sum,
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
              href={`/accountant/our-workers-salary/${item._id}`}
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
        href={`/accountant/our-workers-salary/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_OUR_WORKERS_SALARYS}
      </Grid>
    </Grid>
  );
};

Our_WorkersSalary_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,

  getAll_OUR_WORKERS_SALARYS: PropTypes.func.isRequired,
  delete_OUR_WORKERS_SALARY: PropTypes.func.isRequired,

  state_our_WorkersSalary: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_our_WorkersSalary: state.our_WorkersSalary,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_OUR_WORKERS_SALARYS,
  delete_OUR_WORKERS_SALARY,
})(Our_WorkersSalary_List);
