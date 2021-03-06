import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_TYPE_OF_UNITS,
  delete_TYPE_OF_UNIT,
} from '../../../store/actions/accountant/referenceData/typeOf_Unit';

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

const TypeOf_Unit_List = ({
  setNameOfPage,
  getAll_TYPE_OF_UNITS,
  delete_TYPE_OF_UNIT,
  typeOf_Unit: { arr_TYPE_OF_UNITS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список групп едениц измерения');
    getAll_TYPE_OF_UNITS();
  }, [setNameOfPage, getAll_TYPE_OF_UNITS]);

  const deleteItem = (itemId) => {
    delete_TYPE_OF_UNIT(itemId);
    window.location.reload();
  };

  const listOf_TYPE_OF_UNITS = (
    <MaterialTable
      title='Список групп едениц измерения'
      columns={[
        { title: 'Группа измерений', field: 'field_typeOf_Unit' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_TYPE_OF_UNITS.map((item) => {
        return {
          field_typeOf_Unit: item.typeOf_Unit,
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
              href={`/accountant/type-of-unit/${item._id}`}
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
        href={`/accountant/type-of-unit/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_TYPE_OF_UNITS}
      </Grid>
    </Grid>
  );
};

TypeOf_Unit_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_TYPE_OF_UNITS: PropTypes.func.isRequired,
  delete_TYPE_OF_UNIT: PropTypes.func.isRequired,
  typeOf_Unit: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  typeOf_Unit: state.typeOf_Unit,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_TYPE_OF_UNITS,
  delete_TYPE_OF_UNIT,
})(TypeOf_Unit_List);
