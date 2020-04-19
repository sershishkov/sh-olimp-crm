import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_STREETS,
  delete_STREET
} from '../../../store/actions/accountant/referenceData/street';

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

const Street_List = ({
  setNameOfPage,
  getAll_STREETS,
  delete_STREET,
  street: { arr_STREETS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список улиц');
    getAll_STREETS();
  }, [setNameOfPage, getAll_STREETS]);

  const deleteItem = itemId => {
    delete_STREET(itemId);
    window.location.reload();
  };

  const listOf_STREETS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Название улицы', field: 'field_streetName' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_STREETS.map(item => {
        return {
          field_streetName: item.streetName,
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
              href={`/accountant/street/${item._id}`}
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
        href={`/accountant/street/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_STREETS}
      </Grid>
    </Grid>
  );
};

Street_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_STREETS: PropTypes.func.isRequired,
  delete_STREET: PropTypes.func.isRequired,
  street: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  street: state.street
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_STREETS,
  delete_STREET
})(Street_List);
