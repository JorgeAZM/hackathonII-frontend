import React from 'react';
import { AppBar, Typography, Box } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function Footer() {
    const theme = useTheme();

    return (
        <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
            <Box sx={{ backgroundColor: theme.palette.secondary.main, height: '2vh' }} />
            <Box sx={{ backgroundColor: theme.palette.primary.main, height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Typography variant="body1" sx={{ color: 'white' }}>Copyright © 2024</Typography>
            </Box>
        </AppBar>
    );
}