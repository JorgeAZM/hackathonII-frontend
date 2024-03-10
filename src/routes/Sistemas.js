import React, { useState } from "react";
import { Box, Button, } from "@mui/material";
import AppBarCustom from "../components/AppBarCustom";
import Footer from "../components/Footer";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';
import IconMenu from '../components/IconMenu';
import './Sistemas.css';
import { useTheme } from "@emotion/react";

const panelsData = {
    panel1: {
        title: 'Solicitud de instalación',
        subtitle: 'Laboratorio 1',
        text: 'Se requiere la instalación de la paquetería de Office 365.',
    },
    panel2: {
        title: 'Solicitud de instalación',
        subtitle: 'Laboratorio 2',
        text: 'Se requiere la instalación de la paquetería de software Adobe Creative Cloud.',
    },
    panel3: {
        title: 'Reporte de falla',
        subtitle: 'Laboratorio 3',
        text: 'Falla en el Monitor de la computadora 21, está conectado pero no prende.',
    },
    panel4: {
        title: 'Solicitud de instalación',
        subtitle: 'Laboratorio 1',
        text: 'Se requiere la instalación del lenguaje de programación Python 3.',
    },
    panel5: {
        title: 'Reporte de falla',
        subtitle: 'Laboratorio 4',
        text: 'Falla en la pantalla principal del laboratorio, se encuentra conectada pero no se muestra imagen en la pantalla.',
    },
    panel6: {
        title: 'Reporte de falla',
        subtitle: 'Laboratorio 2',
        text: 'Falla en la computadora 2 del laboratorio, se encuentra conectada, pero cuando se prende tarda mucho en encender y a los 5 minutos se apaga.',
    },
};

export default function Sistemas() {
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState({
        panel1: false,
        panel2: false,
        panel3: false,
        panel4: false,
        panel5: false,
        panel6: false,
    });

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded({ ...expanded, [panel]: isExpanded });
    };

    const handleAccept = (panel) => {
        setExpanded({ ...expanded, [panel]: false });
    };

    const handleDelete = (panel) => {
        const newExpanded = { ...expanded };
        delete newExpanded[panel];
        setExpanded(newExpanded);
    };

    return (
        <>
            <AppBarCustom professorsText='SOPORTE TÉCNICO' loginText={'Tecnico'} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: theme.palette.background.primary,
                }}
            >
                <IconMenu setSelectedFilter={setSelectedFilter} />
                <Box sx={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    {Object.keys(expanded).map((panelKey) => {
                        const panelData = panelsData[panelKey];
                        const panelType = panelData.title;
                        if (selectedFilter === 'Todos' || selectedFilter === panelType) {
                            return (
                                <Accordion key={panelKey} expanded={expanded[panelKey]} onChange={handleChange(panelKey)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`${panelKey}bh-content`}
                                        id={`${panelKey}bh-header`}
                                        style={{ backgroundColor: '#cedbfa' }}
                                    >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            {panelType}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {panelData.subtitle}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {panelData.text}
                                        </Typography>
                                    </AccordionDetails>
                                    <AccordionActions>
                                        <Button variant="outlined" color="success" onClick={() => handleAccept(panelKey)}>Aceptar</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(panelKey)}>Finalizar</Button>
                                    </AccordionActions>
                                </Accordion>
                            );
                        }
                        return null;
                    })}
                </Box>
            </Box>
            <Footer />
        </>
    );
}