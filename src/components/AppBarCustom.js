import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import LogoUNE from '../resources/LogoUne.png';
import { useTheme } from "@emotion/react";

export default function AppBarCustom({ professorsText, loginText }) {
    const theme = useTheme();

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.background.primary }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, maxWidth: '10%' }}>
                    <img src={LogoUNE} alt="Logo" style={{ height: '2rem', paddingLeft: '0.5rem' }} />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#000', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', minWidth: '80%' }}>LABORATORIOS</Typography>
                <Typography variant="body1" sx={{ color: '#000', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, maxWidth: '10%' }} dangerouslySetInnerHTML={{ __html: loginText }}></Typography>
            </Box>
            <Box sx={{ backgroundColor: theme.palette.primary.main, height: '3vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ color: '#FFF', fontWeight: 600, }}>{professorsText}</Typography>
            </Box>
            <Box sx={{ backgroundColor: theme.palette.secondary.main, height: '1vh' }} />
        </AppBar>
    );
}