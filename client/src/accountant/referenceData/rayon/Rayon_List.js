import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_RAYONS,
  delete_RAYON
} from '../../../store/actions/accountant/referenceData/rayon';

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

const Rayon_List = ({
  setNameOfPage,
  getAll_RAYONS,
  delete_RAYON,
  state_rayon: { arr_RAYONS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список районов');
    getAll_RAYONS();
  }, [setNameOfPage, getAll_RAYONS]);

  const deleteItem = itemId => {
    delete_RAYON(itemId);
    window.location.reload();
  };

  const listOf_RAYONS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Название района', field: 'field_rayonName' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_RAYONS.map(item => {
        return {
          field_rayonName: item.rayonName,
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
              href={`/accountant/rayon/${item._id}`}
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
        href={`/accountant/rayon/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_RAYONS}
      </Grid>
    </Grid>
  );
};

Rayon_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_RAYONS: PropTypes.func.isRequired,
  delete_RAYON: PropTypes.func.isRequired,
  state_rayon: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_rayon: state.rayon
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_RAYONS,
  delete_RAYON
})(Rayon_List);
