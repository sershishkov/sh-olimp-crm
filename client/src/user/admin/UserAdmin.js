import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAllUsers, deleteUser } from '../../store/actions/user/admin/users';
import { setNameOfPage } from '../../store/actions/nameOfPage';

import Spinner from '../../shared/spinner/Spinner';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
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
        <List className={classes.list}>
          {users.map(item => (
            <ListItem key={item._id} className={classes.list}>
              <Grid container>
                <Grid item xs={2}>
                  <Avatar
                    src={item.myAvatar}
                    alt={item.name}
                    className={classes.img}
                  />
                </Grid>

                <Grid item xs={8} container flexdirextion='column'>
                  <Grid item xs={12}>
                    <Typography component='h6' variant='h5' align='center'>
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component='h6' variant='h5' align='center'>
                      {item.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component='h6' variant='h5' align='center'>
                      {item.role}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={1}>
                  <IconButton
                    color='secondary'
                    size='medium'
                    onClick={() => deleteUserHandler(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  <IconButton color='primary' href={`/user-admin/${item._id}`}>
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
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
