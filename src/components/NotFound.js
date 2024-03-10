import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <ErrorOutlineIcon style={{ fontSize: 100, color: 'red' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          La página que buscas no existe o no está disponible.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Ir a la página de inicio
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;