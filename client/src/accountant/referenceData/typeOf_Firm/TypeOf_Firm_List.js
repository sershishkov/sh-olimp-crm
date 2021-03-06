import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_TYPE_OF_FIRMS,
  delete_TYPE_OF_FIRM,
} from '../../../store/actions/accountant/referenceData/typeOf_Firm';

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

const TypeOf_Firm_List = ({
  setNameOfPage,
  getAll_TYPE_OF_FIRMS,
  delete_TYPE_OF_FIRM,
  typeOf_Firm: { arr_TYPE_OF_FIRMS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список типов фирм');
    getAll_TYPE_OF_FIRMS();
  }, [setNameOfPage, getAll_TYPE_OF_FIRMS]);

  const deleteItem = (itemId) => {
    delete_TYPE_OF_FIRM(itemId);
    window.location.reload();
  };

  const listOf_TYPE_OF_FIRMS = (
    <MaterialTable
      title='Список типов фирм'
      columns={[
        { title: 'Полное название', field: 'field_TypeOf_FirmLong' },
        {
          title: 'Сокращенное название',
          field: 'field_TypeOf_FirmShort',
        },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_TYPE_OF_FIRMS.map((item) => {
        return {
          field_TypeOf_FirmLong: item.TypeOf_FirmLong,
          field_TypeOf_FirmShort: item.TypeOf_FirmShort,
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
              href={`/accountant/type-of-firm/${item._id}`}
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
        href={`/accountant/type-of-firm/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_TYPE_OF_FIRMS}
      </Grid>
    </Grid>
  );
};

TypeOf_Firm_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_TYPE_OF_FIRMS: PropTypes.func.isRequired,
  delete_TYPE_OF_FIRM: PropTypes.func.isRequired,
  typeOf_Firm: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  typeOf_Firm: state.typeOf_Firm,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_TYPE_OF_FIRMS,
  delete_TYPE_OF_FIRM,
})(TypeOf_Firm_List);
