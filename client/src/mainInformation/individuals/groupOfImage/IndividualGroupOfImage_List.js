import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll_INDIVIDUAL_IMAGE_GROUPS,
  delete_INDIVIDUAL_IMAGE_GROUP,
} from '../../../store/actions/mainInformation/individuals/individual_groupOfImage';

import Spinner from '../../../shared/spinner/Spinner';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

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
  wrapTable: {
    // border: '1px solid red',
  },
}));

const IndividualGroupOfImage_List = ({
  setNameOfPage,
  getAll_INDIVIDUAL_IMAGE_GROUPS,
  delete_INDIVIDUAL_IMAGE_GROUP,

  state_individual_groupOfImage: { arr_INDIVIDUAL_IMAGE_GROUPS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Группы работ!');
    getAll_INDIVIDUAL_IMAGE_GROUPS();
  }, [setNameOfPage, getAll_INDIVIDUAL_IMAGE_GROUPS]);

  const onDeleteHandler = (itemId) => {
    delete_INDIVIDUAL_IMAGE_GROUP(itemId);
    window.location.reload();
  };

  const listOfPhoto = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Группа работ', field: 'field_imageGroup', width: '20%' },
        { title: 'Описание', field: 'field_description', width: '70%' },
        { title: 'Удалить', field: 'btnDel', sorting: false, width: '5%' },
        {
          title: 'редактировать',
          field: 'btnEdit',
          sorting: false,
          width: '5%',
        },
      ]}
      data={arr_INDIVIDUAL_IMAGE_GROUPS.map((item) => {
        return {
          field_imageGroup: item.imageGroup,
          field_description: item.descriptions,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => onDeleteHandler(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/individual-imagegroup/${item._id}`}
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
    <Grid container direction='column' className={classes.root}>
      <IconButton
        variant='contained'
        color='secondary'
        href={`/individual-imagegroup/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>

      <Grid item xs={12} container alignItems='center' direction='column'>
        {listOfPhoto}
      </Grid>
    </Grid>
  );
};

IndividualGroupOfImage_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  delete_INDIVIDUAL_IMAGE_GROUP: PropTypes.func.isRequired,
  getAll_INDIVIDUAL_IMAGE_GROUPS: PropTypes.func.isRequired,

  state_individual_groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_individual_groupOfImage: state.individual_groupOfImage,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_INDIVIDUAL_IMAGE_GROUPS,
  delete_INDIVIDUAL_IMAGE_GROUP,
})(IndividualGroupOfImage_List);
