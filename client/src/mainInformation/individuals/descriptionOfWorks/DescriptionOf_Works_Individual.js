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

import DescriptionOf_ind from './components/DescriptionOf_ind';
import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { getOne_INDIVIDUAL_IMAGE_GROUP } from '../../../store/actions/mainInformation/individuals/individual_groupOfImage';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '3rem',
    position: 'relative',
  },
  buttonBack: {
    position: 'fixed',
    top: '4rem',
    left: 0,
  },
  slider: {
    marginBottom: '3rem',
  },
}));

const DescriptionOf_Works_Individual = ({
  setNameOfPage,
  getOne_INDIVIDUAL_IMAGE_GROUP,

  state_individual_groupOfImage: { one_INDIVIDUAL_IMAGE_GROUP, loading },
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/for-individuals');
  };

  useEffect(() => {
    getOne_INDIVIDUAL_IMAGE_GROUP(id);

    if (one_INDIVIDUAL_IMAGE_GROUP.imageGroup) {
      setNameOfPage(one_INDIVIDUAL_IMAGE_GROUP.imageGroup);
    }
  }, [
    setNameOfPage,
    getOne_INDIVIDUAL_IMAGE_GROUP,
    one_INDIVIDUAL_IMAGE_GROUP.imageGroup,
    id,
  ]);

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
      <DescriptionOf_ind groupId={id} />

      <List>
        {one_INDIVIDUAL_IMAGE_GROUP.descriptions.map((item) => (
          <ListItem key={item}>
            <Typography variant='h6'>{item}</Typography>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
DescriptionOf_Works_Individual.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_INDIVIDUAL_IMAGE_GROUP: PropTypes.func.isRequired,

  state_individual_groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_individual_groupOfImage: state.individual_groupOfImage,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_INDIVIDUAL_IMAGE_GROUP,
})(DescriptionOf_Works_Individual);
