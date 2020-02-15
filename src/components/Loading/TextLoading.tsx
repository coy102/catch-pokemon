import React from 'react';
import { Box, Card } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import shortid from 'shortid';

export default function TextLoading() {
  return (
    <Box>
      <Box my={1} key={shortid.generate()}>
        <Card>
          <Box px={2} py={2.5}>
            <Skeleton variant="text" width="50%" />
            <Skeleton height={100} variant="text" width="100%" />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
