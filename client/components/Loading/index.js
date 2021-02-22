import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

export default function Loading(props) {

  const useStyles = makeStyles({
    root: {
      color: `#546DFF`,
      margin: `0 auto`,
      marginTop: `0.5rem`,
      ...props.style,
    },
  });

  const classes = useStyles();

  return (
    <>
      <CircularProgress size='1.5rem' classes={{ root: classes.root }} />
    </>
  );
}
