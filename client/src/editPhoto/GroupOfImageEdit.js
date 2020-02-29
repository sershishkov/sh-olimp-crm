import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../shared/spinner/Spinner';

import {
  getOneGroupOfImage,
  updateGroupOfImage
} from '../store/actions/groupOfImage';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const TypeOfImageEdit = ({
  groupOfImage: { oneImageGroups, loading },
  getOneGroupOfImage,
  updateGroupOfImage
}) => {
  const history = useHistory();
  const { id } = useParams();

  const [group, setGroup] = useState('');

  const onChange = e => setGroup(e.target.value);

  useEffect(() => {
    getOneGroupOfImage(id);
    if (!loading) {
      setGroup(oneImageGroups.imageGroup);
    }
  }, [getOneGroupOfImage, setGroup, oneImageGroups.imageGroup]);

  const saveChangesHandler = () => {
    updateGroupOfImage(id, group);
    history.push('/group-of-image');
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center'>
          Редактируем название группы
        </Typography>
        <TextField
          variant='outlined'
          type='text'
          fullWidth
          id='group'
          name='group'
          value={group}
          onChange={e => onChange(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={saveChangesHandler}
        >
          Сохранить изменения
        </Button>
      </Grid>
    </Grid>
  );
};

TypeOfImageEdit.propTypes = {
  groupOfImage: PropTypes.object.isRequired,
  getOneGroupOfImage: PropTypes.func.isRequired,
  updateGroupOfImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  getOneGroupOfImage,
  updateGroupOfImage
})(TypeOfImageEdit);
