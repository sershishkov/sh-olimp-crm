import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_TYPE_OF_SETTLEMENTS,
  delete_TYPE_OF_SETTLEMENT
} from '../../../store/actions/accountant/referenceData/typeOf_Settlement';

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

const TypeOf_Street_List = ({
  setNameOfPage,
  getAll_TYPE_OF_SETTLEMENTS,
  delete_TYPE_OF_SETTLEMENT,
  typeOf_Settlement: { arr_TYPE_OF_SETTLEMENTS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список типов населенных пунктов');
    getAll_TYPE_OF_SETTLEMENTS();
  }, [setNameOfPage, getAll_TYPE_OF_SETTLEMENTS]);

  const deleteItem = itemId => {
    delete_TYPE_OF_SETTLEMENT(itemId);
    window.location.reload();
  };

  const listOf_TYPE_OF_SETTLEMENTS = (
    <MaterialTable
      title='Список типов улиц'
      columns={[
        { title: 'Полное название', field: 'field_typeOf_SettlementLong' },
        {
          title: 'Сокращенное название',
          field: 'field_typeOf_SettlementShort'
        },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_TYPE_OF_SETTLEMENTS.map(item => {
        return {
          field_typeOf_SettlementLong: item.typeOf_SettlementLong,
          field_typeOf_SettlementShort: item.typeOf_SettlementShort,
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
              href={`/accountant/type-of-settlement/${item._id}`}
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
        href={`/accountant/type-of-settlement/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_TYPE_OF_SETTLEMENTS}
      </Grid>
    </Grid>
  );
};

TypeOf_Street_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_TYPE_OF_SETTLEMENTS: PropTypes.func.isRequired,
  delete_TYPE_OF_SETTLEMENT: PropTypes.func.isRequired,
  typeOf_Settlement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_Settlement: state.typeOf_Settlement
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_TYPE_OF_SETTLEMENTS,
  delete_TYPE_OF_SETTLEMENT
})(TypeOf_Street_List);
