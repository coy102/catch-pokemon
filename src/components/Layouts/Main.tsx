import React from 'react';
import Head from 'next/head';
import { Container, Box } from '@material-ui/core';

import AppBar from '../AppBar';
import BottomNav from '../BottomNav';

interface Props {
  children: React.ReactNode;
  title: string;
  hasBackButton?: boolean;
}

export default function MainLayout(props: Props) {
  const { children, title, hasBackButton } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar title={title} children={<div />} hasBackButton={hasBackButton} />
      <Box my={10}>
        <Container maxWidth="md">{children}</Container>
      </Box>
      <BottomNav />
    </div>
  );
}
