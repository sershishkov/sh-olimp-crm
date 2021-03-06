import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_TYPE_OF_STREETS,
  delete_TYPE_OF_STREET,
} from '../../../store/actions/accountant/referenceData/typeOf_Street';

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

const TypeOf_Street_List = ({
  setNameOfPage,
  getAll_TYPE_OF_STREETS,
  delete_TYPE_OF_STREET,
  typeOf_Street: { arr_TYPE_OF_STREETS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список типов улиц');
    getAll_TYPE_OF_STREETS();
  }, [setNameOfPage, getAll_TYPE_OF_STREETS]);

  const deleteItem = (itemId) => {
    delete_TYPE_OF_STREET(itemId);
    window.location.reload();
  };

  const listOf_TYPE_OF_STREETS = (
    <MaterialTable
      title='Список типов улиц'
      columns={[
        { title: 'Полное название', field: 'field_typeOf_StreetLong' },
        { title: 'Сокращенное название', field: 'field_typeOf_StreetShort' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_TYPE_OF_STREETS.map((item) => {
        return {
          field_typeOf_StreetLong: item.typeOf_StreetLong,
          field_typeOf_StreetShort: item.typeOf_StreetShort,
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
              href={`/accountant/type-of-street/${item._id}`}
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
        href={`/accountant/type-of-street/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_TYPE_OF_STREETS}
      </Grid>
    </Grid>
  );
};

TypeOf_Street_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_TYPE_OF_STREETS: PropTypes.func.isRequired,
  delete_TYPE_OF_STREET: PropTypes.func.isRequired,
  typeOf_Street: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  typeOf_Street: state.typeOf_Street,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_TYPE_OF_STREETS,
  delete_TYPE_OF_STREET,
})(TypeOf_Street_List);
