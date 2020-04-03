import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addGroupOfImage } from '../../../store/actions/mainInformation/osbb/groupOfImage';
import { setNameOfPage } from '../../../store/actions/nameOfPage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex'
//   }
// }));

const AddGroupOfImage = ({ addGroupOfImage, setNameOfPage }) => {
  const history = useHistory();
  const [newGroup, setNewGroup] = useState({
    imageGroup: '',
    descriptions: ''
  });

  const { imageGroup, descriptions } = newGroup;
  const [disabledForm, setDisabledForm] = useState(true);
  useEffect(() => {
    setNameOfPage('Добавить группу фотографий');
  }, [setNameOfPage]);

  const addGroupHandler = () => {
    addGroupOfImage(imageGroup, descriptions);
    history.push('group-of-image');
  };
  const onChange = e => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
    setDisabledForm(!(imageGroup && descriptions));
  };
  return (
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
            placeholder='Введите описание через запятую'
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
            onClick={addGroupHandler}
          >
            Добавить
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

AddGroupOfImage.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  addGroupOfImage: PropTypes.func.isRequired
};

export default connect(null, { addGroupOfImage, setNameOfPage })(
  AddGroupOfImage
);
