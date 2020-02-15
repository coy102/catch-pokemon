import React from 'react';
import { Box, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: green[300]
  }
}));

interface Props {
  imagePath: string;
}

export default function PokeAvatar(props: Props) {
  const { imagePath } = props;
  const classes = useStyles({});
  return (
    <Box my={2} justifyContent="center" display="flex">
      <Box>
        <Avatar src={imagePath} className={classes.avatar} />
      </Box>
    </Box>
  );
}
