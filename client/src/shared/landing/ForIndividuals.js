import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const ForIndividuals = props => {
  return (
    <Grid>
      <Typography variant='h2' align='center'>
        Страница для физических лиц
      </Typography>
      <Typography variant='h3' align='center'>
        Ответственный МАКСИМ
      </Typography>
    </Grid>
  );
};

ForIndividuals.propTypes = {};

export default ForIndividuals;
