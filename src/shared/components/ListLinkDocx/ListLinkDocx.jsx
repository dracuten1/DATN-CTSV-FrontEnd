import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SelectedListItem(props) {
  const classes = useStyles();
  const { data } = props;

  return (
    <div className={classes.root}>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        {data.map(item => {
          return (
            <ListItem>
              <Link
                style={{ textDecoration: 'none' }}
                href={item}
              >
                {item}
              </Link>
              <Divider variant="inset" component="li" />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
