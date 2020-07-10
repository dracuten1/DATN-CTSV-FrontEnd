import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const Title = props => {
  const { url, title, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent alignitems="center">
        <Grid container justify="center">
          <Grid item>
            <Typography gutterBottom />
            <Typography className={classes.title} color="inherit" variant="h2">
              <Link
                href={url}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <b style={{ fontFamily: "none" }}>{title}</b>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Title.propTypes = {
  className: PropTypes.string
};

export default Title;
