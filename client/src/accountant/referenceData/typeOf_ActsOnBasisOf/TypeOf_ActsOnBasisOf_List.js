import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
  delete_TYPE_OF_ACTS_ON_BASIS_OF
} from '../../../store/actions/accountant/referenceData/typeOf_ActsOnBasisOf';

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

const TypeOf_ActsOnBasisOf_List = ({
  setNameOfPage,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
  delete_TYPE_OF_ACTS_ON_BASIS_OF,
  typeOf_ActsOnBasisOf: { arr_TYPE_OF_ACTS_ON_BASIS_OFS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список оснований');
    getAll_TYPE_OF_ACTS_ON_BASIS_OFS();
  }, [setNameOfPage, getAll_TYPE_OF_ACTS_ON_BASIS_OFS]);

  const deleteItem = itemId => {
    delete_TYPE_OF_ACTS_ON_BASIS_OF(itemId);
    window.location.reload();
  };

  const listOf_TYPE_OF_ACTS_ON_BASIS_OFS = (
    <MaterialTable
      title='Список оснований'
      columns={[
        { title: 'Полное название', field: 'field_actOnBasisOf' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_TYPE_OF_ACTS_ON_BASIS_OFS.map(item => {
        return {
          field_actOnBasisOf: item.actOnBasisOf,

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
              href={`/accountant/type-of-acts-on-basis-of/${item._id}`}
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
        href={`/accountant/type-of-acts-on-basis-of/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_TYPE_OF_ACTS_ON_BASIS_OFS}
      </Grid>
    </Grid>
  );
};

TypeOf_ActsOnBasisOf_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS: PropTypes.func.isRequired,
  delete_TYPE_OF_ACTS_ON_BASIS_OF: PropTypes.func.isRequired,
  typeOf_ActsOnBasisOf: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_ActsOnBasisOf: state.typeOf_ActsOnBasisOf
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
  delete_TYPE_OF_ACTS_ON_BASIS_OF
})(TypeOf_ActsOnBasisOf_List);
