import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_OUR_FIRMS,
  delete_OUR_FIRM
} from '../../../store/actions/accountant/referenceData/ourFirm';

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
  },
  rowItem: {
    // border: '1px solid red',
    justifyItems: 'center',
    alignItems: 'center'
  },
  rowItemDate: {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

const OurFirm_List = ({
  setNameOfPage,
  getAll_OUR_FIRMS,
  delete_OUR_FIRM,
  ourFirm: { arr_OUR_FIRMS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список наших фирм');
    getAll_OUR_FIRMS();
  }, [setNameOfPage, getAll_OUR_FIRMS]);

  const deleteItem = itemId => {
    delete_OUR_FIRM(itemId);
    window.location.reload();
  };

  const listOf_OUR_FIRMS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Форма собств', field: 'field_TypeOf_FirmShort' },
        { title: 'Название фирмы', field: 'field_firmName' },
        { title: 'Должность', field: 'field_firstPersonPosition' },
        { title: 'ФИО', field: 'field_shortName' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_OUR_FIRMS.map(item => {
        return {
          field_TypeOf_FirmShort: item.typeOfFirm.TypeOf_FirmShort,
          field_firmName: item.firmName,
          field_firstPersonPosition: item.firstPersonPosition.position,
          field_shortName: item.shortName,
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
              href={`/accountant/our-firm/${item._id}`}
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
        href={`/accountant/our-firm/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_OUR_FIRMS}
      </Grid>
    </Grid>
  );
};

OurFirm_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_OUR_FIRMS: PropTypes.func.isRequired,
  delete_OUR_FIRM: PropTypes.func.isRequired,
  ourFirm: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ourFirm: state.ourFirm
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_OUR_FIRMS,
  delete_OUR_FIRM
})(OurFirm_List);
