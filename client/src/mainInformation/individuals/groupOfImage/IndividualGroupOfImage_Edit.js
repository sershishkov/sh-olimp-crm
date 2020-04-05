import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getOne_INDIVIDUAL_IMAGE_GROUP,
  update_INDIVIDUAL_IMAGE_GROUP,
} from '../../../store/actions/mainInformation/individuals/individual_groupOfImage';

import Spinner from '../../../shared/spinner/Spinner';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7.5rem',
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0,
  },
}));

const IndividualGroupOfImage_Edit = ({
  setNameOfPage,
  getOne_INDIVIDUAL_IMAGE_GROUP,
  update_INDIVIDUAL_IMAGE_GROUP,

  state_individual_groupOfImage: { one_INDIVIDUAL_IMAGE_GROUP, loading },
}) => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();

  const [newGroup, setNewGroup] = useState({
    imageGroup: '',
    descriptions: '',
  });
  const { imageGroup, descriptions } = newGroup;

  const [disabledForm, setDisabledForm] = useState(true);

  const onChange = (e) => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
    setDisabledForm(!(imageGroup || descriptions));
  };

  const buttonBackHandler = () => {
    history.goBack();
  };

  useEffect(() => {
    setNameOfPage('Редактируем группу');
    getOne_INDIVIDUAL_IMAGE_GROUP(id);
  }, [setNameOfPage, getOne_INDIVIDUAL_IMAGE_GROUP, id]);

  useLayoutEffect(() => {
    if (one_INDIVIDUAL_IMAGE_GROUP) {
      setNewGroup({
        ...newGroup,
        imageGroup: one_INDIVIDUAL_IMAGE_GROUP.imageGroup,
        descriptions: one_INDIVIDUAL_IMAGE_GROUP.descriptionsSTR,
      });
    }
  }, []);

  const updateGroupHandler = () => {
    update_INDIVIDUAL_IMAGE_GROUP(id, imageGroup, descriptions);
    history.push('/individual-imagegroup');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='text'
            fullWidth
            placeholder='Введите новую группу'
            name='imageGroup'
            value={imageGroup ? imageGroup : ''}
            onChange={(e) => onChange(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Описание </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='text'
            multiline
            fullWidth
            placeholder='Введите описание через запятую'
            name='descriptions'
            value={descriptions ? descriptions : ''}
            onChange={(e) => onChange(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          fullWidth
          disabled={disabledForm}
          color='primary'
          onClick={updateGroupHandler}
        >
          Сохранить изменения
        </Button>
      </Grid>
    </Grid>
  );
};

IndividualGroupOfImage_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_INDIVIDUAL_IMAGE_GROUP: PropTypes.func.isRequired,
  update_INDIVIDUAL_IMAGE_GROUP: PropTypes.func.isRequired,

  state_individual_groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_individual_groupOfImage: state.individual_groupOfImage,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_INDIVIDUAL_IMAGE_GROUP,
  update_INDIVIDUAL_IMAGE_GROUP,
})(IndividualGroupOfImage_Edit);
