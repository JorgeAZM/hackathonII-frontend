import * as React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import TvIcon from '@mui/icons-material/Tv';
import BuildIcon from '@mui/icons-material/Build';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export default function IconMenu({ setSelectedFilter }) {
    return (
        <Box sx={{
            width: 'fit-content',
        }}>
            <Paper sx={{ maxWidth: '100%' }}>
                <MenuList>
                    <MenuItem onClick={() => setSelectedFilter('Todos')}>
                        <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main', marginRight: '10px' }}>
                                <MailIcon fontSize="small" />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            primary="Todos los recibidos"
                            sx={{
                                '@media (max-width: 600px)': {
                                    display: 'none',
                                },
                            }}
                        />
                    </MenuItem>
                    <MenuItem onClick={() => setSelectedFilter('Solicitud de instalación')}>
                        <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main', marginRight: '10px' }}>
                                <TvIcon fontSize="small" />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            primary="Solicitud de instalación"
                            sx={{
                                '@media (max-width: 600px)': {
                                    display: 'none',
                                },
                            }}
                        />
                    </MenuItem>
                    <MenuItem onClick={() => setSelectedFilter('Reporte de falla')}>
                        <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main', marginRight: '10px' }}>
                                <BuildIcon fontSize="small" />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText
                            primary="Reporte de fallas"
                            sx={{
                                '@media (max-width: 600px)': {
                                    display: 'none',
                                },
                            }}
                        />
                    </MenuItem>
                </MenuList>
            </Paper>
        </Box>
    );
}