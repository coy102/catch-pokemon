import React from 'react';
import Typography from '@material-ui/core/Typography';
import MainLayout from '@components/Layouts/Main';

export default function Index() {
  return (
    <MainLayout title="Awesome Pokemon">
      <React.Fragment>
        <Typography variant="h6" component="h1" gutterBottom>
          My Awesome Next JS Starter
        </Typography>
      </React.Fragment>
    </MainLayout>
  );
}
