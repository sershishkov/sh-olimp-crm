import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAll_INDIVIDUAL_IMAGE_GROUPS } from '../../store/actions/mainInformation/individuals/individual_groupOfImage';

import Spinner from '../../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  list: {},
  listItem: {},
}));

const ForOSBB = ({
  setNameOfPage,
  getAll_INDIVIDUAL_IMAGE_GROUPS,

  state_individual_groupOfImage: { arr_INDIVIDUAL_IMAGE_GROUPS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Наши работы');
    getAll_INDIVIDUAL_IMAGE_GROUPS();
  }, [setNameOfPage, getAll_INDIVIDUAL_IMAGE_GROUPS]);

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <Typography variant='h3' align='center'>
        Компания "Олимп-ДС" предлагает следующие виды работ для физических лиц:
      </Typography>

      <List>
        {arr_INDIVIDUAL_IMAGE_GROUPS.map((item) => (
          <ListItem key={item._id}>
            <Grid container justify='space-between'>
              <Grid item xs={11}>
                <Typography variant='h6'>{item.imageGroup}</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color='primary'
                  size='small'
                  variant='contained'
                  href={`/individual-description/${item._id}`}
                >
                  <InfoIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

ForOSBB.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_INDIVIDUAL_IMAGE_GROUPS: PropTypes.func.isRequired,

  state_individual_groupOfImage: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  state_individual_groupOfImage: state.individual_groupOfImage,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_INDIVIDUAL_IMAGE_GROUPS,
})(ForOSBB);
