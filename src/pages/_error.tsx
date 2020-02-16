import React from 'react';
import MainLayout from '@components/Layouts/Main';
import ErrorMessage from '@components/Result/ErrorMessage';
import Router from 'next/router';

function Error({ statusCode }: any) {
  return (
    <MainLayout title="Awesome Pokemon">
      <ErrorMessage
        message={
          statusCode ? `An error ${statusCode} ` : 'An error occurred on client'
        }
        buttonLabel="Back to home"
        onClick={() => Router.push('/')}
      />
    </MainLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
