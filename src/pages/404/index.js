import React from 'react';
import { Typography, Button } from '@mui/material';
import { ErrorOutlineOutlined as ErrorOutlineOutlinedIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
});

const Icon = styled(ErrorOutlineOutlinedIcon)({
  fontSize: '6rem',
});

const Heading = styled(Typography)({
  marginTop: "1rem",
  marginBottom: "1rem",
});

const Text = styled(Typography)({
  marginBottom: "1rem",
  textAlign: 'center',
});

function PageNotFound() {
  return (
    <Container>
      <Icon />
      <Heading variant="h4">
        Oops! Page Not Found
      </Heading>
      <Text variant="body1">
        We're sorry, the page you requested could not be found.
      </Text>
    </Container>
  );
}

export default PageNotFound;
