import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAll_INDIVIDUAL_PHOTOS,
  delete_INDIVIDUAL_PHOTO,
} from '../../../store/actions/mainInformation/individuals/individual_photoWorks';

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
  list: {},
  listItem: {},
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover',
  },
}));

const IndividualPhoto_List = ({
  setNameOfPage,
  getAll_INDIVIDUAL_PHOTOS,
  delete_INDIVIDUAL_PHOTO,

  state_individual_photoWorks: { arr_INDIVIDUAL_PHOTOS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список фото');
    getAll_INDIVIDUAL_PHOTOS();
  }, [setNameOfPage, getAll_INDIVIDUAL_PHOTOS]);

  const deleteImage = (itemId) => {
    delete_INDIVIDUAL_PHOTO(itemId);
    window.location.reload();
  };

  const listOfPhoto = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Фото', field: 'field_imageUrl' },
        { title: 'Описание', field: 'field_description' },
        { title: 'Группа', field: 'field_imageGroup' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_INDIVIDUAL_PHOTOS.map((item) => {
        return {
          field_imageUrl: (
            <img
              src={item.imageUrl}
              alt={item.imageUrl}
              className={classes.img}
            />
          ),
          field_description: item.description,
          field_imageGroup: item.imageGroup.imageGroup,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => deleteImage(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/individual-photo/${item._id}`}
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
        href={`/individual-photo/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOfPhoto}
      </Grid>
    </Grid>
  );
};

IndividualPhoto_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_INDIVIDUAL_PHOTOS: PropTypes.func.isRequired,
  delete_INDIVIDUAL_PHOTO: PropTypes.func.isRequired,

  state_individual_photoWorks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_individual_photoWorks: state.individual_photoWorks,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_INDIVIDUAL_PHOTOS,
  delete_INDIVIDUAL_PHOTO,
})(IndividualPhoto_List);
