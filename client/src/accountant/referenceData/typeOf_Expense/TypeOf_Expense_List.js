import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_TYPE_OF_EXPENSES,
  delete_TYPE_OF_EXPENSE
} from '../../../store/actions/accountant/referenceData/typeOf_Expense';

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
  }
}));

const TypeOf_Expense_List = ({
  setNameOfPage,
  getAll_TYPE_OF_EXPENSES,
  delete_TYPE_OF_EXPENSE,

  state_typeOf_Expense: { arr_TYPE_OF_EXPENSES, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список типов затрат');
    getAll_TYPE_OF_EXPENSES();
  }, [setNameOfPage, getAll_TYPE_OF_EXPENSES]);

  const deleteItem = itemId => {
    delete_TYPE_OF_EXPENSE(itemId);
    window.location.reload();
  };

  const listOf_TYPE_OF_EXPENSES = (
    <MaterialTable
      title='Список типов затрат'
      columns={[
        { title: 'Полное название', field: 'field_typeOf_ExpenseName' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_TYPE_OF_EXPENSES.map(item => {
        return {
          field_typeOf_ExpenseName: item.typeOf_ExpenseName,

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
              href={`/accountant/type-of-expense/${item._id}`}
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
        href={`/accountant/type-of-expense/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_TYPE_OF_EXPENSES}
      </Grid>
    </Grid>
  );
};

TypeOf_Expense_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_TYPE_OF_EXPENSES: PropTypes.func.isRequired,
  delete_TYPE_OF_EXPENSE: PropTypes.func.isRequired,

  state_typeOf_Expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_typeOf_Expense: state.typeOf_Expense
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_TYPE_OF_EXPENSES,
  delete_TYPE_OF_EXPENSE
})(TypeOf_Expense_List);
