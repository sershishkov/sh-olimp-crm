import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNameOfPage } from '../store/actions/nameOfPage';

import Spinner from '../shared/spinner/Spinner';

import {
  getOneGroupOfImage,
  updateGroupOfImage
} from '../store/actions/groupOfImage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const TypeOfImageEdit = ({
  groupOfImage: { oneImageGroups, loading },
  getOneGroupOfImage,
  updateGroupOfImage,
  setNameOfPage
}) => {
  const history = useHistory();
  const { id } = useParams();

  const [newGroup, setNewGroup] = useState({
    imageGroup: '',
    descriptions: ''
  });
  const { imageGroup, descriptions } = newGroup;

  const [disabledForm, setDisabledForm] = useState(true);

  const onChange = e => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
    setDisabledForm(!(imageGroup && descriptions));
  };

  useEffect(() => {
    setNameOfPage('Редактируем группу');
    getOneGroupOfImage(id);

    if (oneImageGroups.imageGroup && oneImageGroups.descriptionsSTR) {
      setNewGroup({
        ...newGroup,
        imageGroup: oneImageGroups.imageGroup,
        descriptions: oneImageGroups.descriptionsSTR
      });
    }
  }, [
    setNameOfPage,
    getOneGroupOfImage,
    setNewGroup,
    loading,
    oneImageGroups.imageGroup,
    oneImageGroups.descriptionsSTR,
    id
  ]);

  const updateGroupHandler = () => {
    updateGroupOfImage(id, imageGroup, descriptions);
    history.push('/group-of-image');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid>
      <Grid item xs={12} container flexdirextion='column'>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            type='text'
            fullWidth
            placeholder='Введите новую группу'
            name='imageGroup'
            value={imageGroup}
            onChange={e => onChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='outlined'
            type='text'
            multiline
            // rowsMax='4'
            fullWidth
            // placeholder='Введите описание через запятую'
            name='descriptions'
            value={descriptions}
            onChange={e => onChange(e)}
          />
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
    </Grid>
  );
};

TypeOfImageEdit.propTypes = {
  groupOfImage: PropTypes.object.isRequired,
  getOneGroupOfImage: PropTypes.func.isRequired,
  setNameOfPage: PropTypes.func.isRequired,
  updateGroupOfImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  getOneGroupOfImage,
  updateGroupOfImage,
  setNameOfPage
})(TypeOfImageEdit);
