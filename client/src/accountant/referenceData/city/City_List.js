import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_CITYS,
  delete_CITY
} from '../../../store/actions/accountant/referenceData/city';

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

const City_List = ({
  setNameOfPage,
  getAll_CITYS,
  delete_CITY,
  city: { arr_CITYS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список городов');
    getAll_CITYS();
  }, [setNameOfPage, getAll_CITYS]);

  const deleteItem = itemId => {
    delete_CITY(itemId);
    window.location.reload();
  };

  const listOf_CITYS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Название города', field: 'field_cityName' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_CITYS.map(item => {
        return {
          field_cityName: item.cityName,
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
              href={`/accountant/city/${item._id}`}
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
        href={`/accountant/city/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_CITYS}
      </Grid>
    </Grid>
  );
};

City_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_CITYS: PropTypes.func.isRequired,
  delete_CITY: PropTypes.func.isRequired,
  city: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  city: state.city
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_CITYS,
  delete_CITY
})(City_List);
