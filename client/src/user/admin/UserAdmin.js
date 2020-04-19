import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

import { getAllUsers, deleteUser } from '../../store/actions/user/admin/users';
import { setNameOfPage } from '../../store/actions/nameOfPage';

import Spinner from '../../shared/spinner/Spinner';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

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
  list: {},
  listItem: {},
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover'
  }
}));

const UserAdmin = ({
  setNameOfPage,
  getAllUsers,
  deleteUser,
  users: { users, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('АДМИНКА');
    getAllUsers();
  }, [setNameOfPage, getAllUsers]);

  const deleteUserHandler = userdId => {
    deleteUser(userdId);
    window.location.reload();
  };

  const listOf_USERS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Фото', field: 'field_myAvatar' },
        { title: 'Имя', field: 'field_name' },
        { title: 'Почта', field: 'field_email' },
        { title: 'Роль', field: 'field_role' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={users.map(item => {
        return {
          field_myAvatar: (
            <Avatar
              src={item.myAvatar}
              alt={item.name}
              className={classes.img}
            />
          ),
          field_name: item.name,
          field_email: item.email,
          field_role: item.role,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => deleteUserHandler(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/user-admin/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          )
        };
      })}
      options={{
        sorting: true,
        search: false,
        pageSize: 10
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
        href={`/user-admin-create`}
        className={classes.btnAdd}
      >
        <GroupAddIcon className={classes.btnAddIcon} />
      </IconButton>

      <Grid item xs={12}>
        {listOf_USERS}
      </Grid>
    </Grid>
  );
};

UserAdmin.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllUsers,
  deleteUser
})(UserAdmin);
