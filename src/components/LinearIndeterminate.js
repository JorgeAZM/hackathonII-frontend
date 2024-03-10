import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <LinearProgress />
    </Box>
  );
}