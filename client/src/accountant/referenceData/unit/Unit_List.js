import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_UNITS,
  delete_UNIT,
} from '../../../store/actions/accountant/referenceData/unit';

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

const Unit_List = ({
  setNameOfPage,
  getAll_UNITS,
  delete_UNIT,
  unit: { arr_UNITS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список единиц измерения');
    getAll_UNITS();
  }, [setNameOfPage, getAll_UNITS]);

  const deleteItem = (itemId) => {
    delete_UNIT(itemId);
    window.location.reload();
  };

  const listOf_UNITS = (
    <MaterialTable
      title='Список единиц измерения'
      columns={[
        { title: 'Полное название', field: 'unitNameLong' },
        { title: 'Сокращенное название', field: 'unitNameShort' },
        { title: 'Группа измерений', field: 'unitType_' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_UNITS.map((item) => {
        return {
          unitNameLong: item.unitNameLong,
          unitNameShort: item.unitNameShort,
          unitType_: item.unitType.typeOf_Unit,
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
              href={`/accountant/unit/${item._id}`}
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
        href={`/accountant/unit/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_UNITS}
      </Grid>
    </Grid>
  );
};

Unit_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_UNITS: PropTypes.func.isRequired,
  delete_UNIT: PropTypes.func.isRequired,
  unit: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  unit: state.unit,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_UNITS,
  delete_UNIT,
})(Unit_List);
