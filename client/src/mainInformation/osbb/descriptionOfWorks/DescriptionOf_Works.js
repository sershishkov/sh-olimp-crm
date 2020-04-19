import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Spinner from '../../../shared/spinner/Spinner';

import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import DescriptionOf from './components/DescriptionOf_';
import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { getOneGroupOfImage } from '../../../store/actions/mainInformation/osbb/groupOfImage';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '3rem',
    position: 'relative'
  },
  buttonBack: {
    position: 'fixed',
    top: '4rem',
    left: 0
  },
  slider: {
    marginBottom: '3rem'
  }
}));

const DescriptionOf_Works = ({
  setNameOfPage,
  getOneGroupOfImage,

  groupOfImage: { oneImageGroups, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/for-osbb');
  };

  useEffect(() => {
    getOneGroupOfImage(id);

    if (oneImageGroups.imageGroup) {
      setNameOfPage(oneImageGroups.imageGroup);
    }
  }, [setNameOfPage, getOneGroupOfImage, oneImageGroups.imageGroup, id]);

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <IconButton
        onClick={buttonBackHandler}
        className={classes.buttonBack}
        color='primary'
      >
        <ArrowBackIcon />
      </IconButton>
      <DescriptionOf groupId={id} />

      <List>
        {oneImageGroups.descriptions.map(item => (
          <ListItem key={item}>
            <Typography variant='h6'>{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
DescriptionOf_Works.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOneGroupOfImage: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, { setNameOfPage, getOneGroupOfImage })(
  DescriptionOf_Works
);
