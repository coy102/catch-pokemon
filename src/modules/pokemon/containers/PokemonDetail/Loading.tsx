import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import TextLoading from '@components/Loading/TextLoading';

function AvatarLoading() {
  return (
    <Box my={2} justifyContent="center" display="flex">
      <Box>
        <Skeleton variant="circle" width={200} height={200} />
      </Box>
    </Box>
  );
}

export default function Loading() {
  return (
    <Box>
      <AvatarLoading />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextLoading />
          <TextLoading />{' '}
        </Grid>

        <Grid item xs={12} md={6}>
          <TextLoading /> <TextLoading />
        </Grid>
      </Grid>
    </Box>
  );
}
