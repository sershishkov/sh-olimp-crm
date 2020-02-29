import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getAllGroupOfImage,
  addGroupOfImage
} from '../store/actions/groupOfImage';
import { setNameOfPage } from '../store/actions/nameOfPage';

import Spinner from '../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

const TypeOfImage = ({
  setNameOfPage,
  getAllGroupOfImage,
  groupOfImage: { imageGroups, loading },
  addGroupOfImage
}) => {
  const classes = useStyles();
  const [newGroup, setNewGroup] = useState('');
  useEffect(() => {
    setNameOfPage('Группы фотографий');

    getAllGroupOfImage();
  }, [setNameOfPage, getAllGroupOfImage]);

  const addGroupHandler = () => {
    addGroupOfImage(newGroup);
    window.location.reload();
  };
  const onChange = e => setNewGroup(e.target.value);

  return loading ? (
    <Spinner />
  ) : (
    <Grid container direction='column' className={classes.root}>
      <Grid item xs={12}>
        <List>
          {imageGroups.map(item => (
            <ListItem key={item._id}>
              <ListItemText>{item.imageGroup}</ListItemText>

              <Button
                variant='contained'
                color='primary'
                href={`/group-of-image/${item._id}`}
              >
                Редактировать
              </Button>
            </ListItem>
          ))}
        </List>
        <Grid item xs={12} container>
          <Grid item xs={8}>
            <TextField
              variant='outlined'
              type='text'
              fullWidth
              placeholder='Введите новую группу'
              id='newGroup'
              name='newGroup'
              value={newGroup}
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              fullWidth
              color='primary'
              onClick={addGroupHandler}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

TypeOfImage.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  addGroupOfImage: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllGroupOfImage,
  addGroupOfImage
})(TypeOfImage);
