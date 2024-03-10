import React, { useState, useEffect } from "react";
import { Box, Typography, Button, ButtonGroup, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grow, Paper, Popper, MenuItem, MenuList, TextField, styled, useMediaQuery } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import MonitorIcon from '@mui/icons-material/Monitor';
import BuildIcon from '@mui/icons-material/Build';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import AppBarCustom from "../components/AppBarCustom";
import Footer from "../components/Footer";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from "@emotion/react";
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#FFF',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#FFF',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FFF',
        },
        '&:hover fieldset': {
            borderColor: '#FFF',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFF',
        },
    },
});

export default function Calendar() {
    const theme = useTheme();
    const options = ['Laboratorio 1', 'Laboratorio 2', 'Laboratorio 3', 'Laboratorio 4'];
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showClock, setShowClock] = useState(false);
    const [error, setError] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [showHorario, setShowHorario] = useState(false);
    const [showMateria, setShowMateria] = useState(false);
    const [showInstalacion, setShowInstalacion] = useState(false);
    const [showSolicitado, setShowSolicitado] = useState(false);
    const [showReportado, setShowReportado] = useState(false);
    const [showReporte, setShowReporte] = useState(false);
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        if (isSmallScreen) {
            setAlertOpen(true);
            setShowLightbox(true);
        } else {
            setAlertOpen(false);
            setShowLightbox(false);
        }
    }, [isSmallScreen]);

    const handleEnviarReporte = () => {
        setShowReporte(false);
        setShowReportado(true);
        setTimeout(() => {
            setShowReportado(false);
            setShowLightbox(false);
        }, 3000);
    }

    const handleReporte = () => {
        setShowLightbox(true);
        setShowClock(false);
        setShowInstalacion(false);
        setShowReporte(true);
    }

    const handleSolicitarInstalacion = () => {
        setShowInstalacion(false);
        setShowSolicitado(true);
        setTimeout(() => {
            setShowSolicitado(false);
            setShowLightbox(false);
        }, 3000);
    }

    const handleInstalacion = () => {
        setShowLightbox(true);
        setShowInstalacion(true);
        setShowReporte(false);
        setShowClock(false);
    }

    const handleReservar = () => {

    }

    const handleOpenClock = () => {
        setShowClock(true);
        setShowLightbox(true);
        setShowInstalacion(false);
        setShowReporte(false);
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleOkClick = () => {
        if (selectedTime) {
            setShowLightbox(false);
            setShowMateria(true);
            setError('');
        } else {
            setError('Por favor, selecciona una hora.');
        }
    }

    const handleCloseLightbox = () => {
        setShowLightbox(false);
    }

    const handleMenuItemClickLaboratory = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setShowHorario(true);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleDayPress = (date) => {
        const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
        setShowOptions(true);
        console.log('Día seleccionado:', selectedDate.getDate());
        console.log('Mes actual:', currentMonth.toLocaleString('default', { month: 'long' }));
    }

    const generateCalendar = () => {
        const rows = [];
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            const cells = [];

            for (let j = 0; j < 7; j++) {
                const dayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayCounter);

                if ((i === 0 && j < monthStart.getDay()) || dayCounter > monthEnd.getDate()) {
                    cells.push(
                        <TableCell sx={{
                            background: '#FFF',
                            border: '1px solid black',
                            textAlign: 'center',
                            padding: '1rem',
                        }}
                            key={`${i}-${j}`}
                        />
                    );
                } else if (dayCounter <= 31) {
                    cells.push(
                        <TableCell
                            onClick={() => handleDayPress(dayOfMonth.getDate())}
                            sx={{
                                background: '#FFF',
                                border: '1px solid black',
                                textAlign: 'center',
                                padding: '1rem',
                            }}
                            key={`${i}-${j}`}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    textTransform: 'none',
                                }}
                            >
                                <Typography variant="body1" color='#000'>
                                    {dayOfMonth.getDate()}
                                </Typography>
                            </Button>
                        </TableCell>
                    );
                    dayCounter++;
                }
            }

            rows.push(<TableRow key={i}>{cells}</TableRow>);
        }

        return rows;
    };

    const capitalizedMonth = currentMonth.toLocaleString('default', { month: 'long' }).charAt(0).toUpperCase() + currentMonth.toLocaleString('default', { month: 'long' }).slice(1);

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        const currentMonthDate = new Date();
        const currentDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1);

        if (prevMonthDate >= currentDate) {
            setCurrentMonth(prevMonthDate);
        }
    };

    return (
        <>
            <AppBarCustom professorsText="PROFESORES" loginText="Jorge Zapien<br />A123" />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.secondary,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingY: '1rem',
                        overflowX: 'auto',
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '90%',
                            background: theme.palette.background.tertiary,
                            zIndex: '1',
                            borderRadius: '10px',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            overflowX: 'auto',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <IconButton onClick={prevMonth} sx={{ marginRight: '1rem' }}>
                                <NavigateBeforeIcon sx={{ fontSize: 60, color: '#000' }} />
                            </IconButton>
                            <Typography variant="h2">
                                {capitalizedMonth} {currentMonth.getFullYear()}
                            </Typography>
                            <IconButton onClick={nextMonth} sx={{ marginLeft: '1rem' }}>
                                <NavigateNextIcon sx={{ fontSize: 60, color: '#000' }} />
                            </IconButton>
                        </Box>
                        <Table sx={{ width: '100%', marginBottom: '1rem', paddingTop: '1rem', overflowWrap: 'break-word' }}>
                            <TableHead sx={{ background: 'transparent' }}>
                                <TableRow>
                                    {daysOfWeek.map((day, index) => (
                                        <TableCell key={index}>
                                            <Typography variant="h5" textAlign='center'>{day}</Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ background: '#FFF', paddingTop: '1rem' }}>
                                {generateCalendar()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {showOptions && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                width: '100%',
                                marginTop: '2rem',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.background.secondary,
                                    borderRadius: '8px',
                                    width: '30%',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.palette.primary.main,
                                        width: { xs: '80px', sm: '100px', md: '120px' },
                                        height: { xs: '80px', sm: '100px', md: '120px' },
                                        borderRadius: '50%',
                                        marginBottom: '1rem',
                                        marginTop: '1rem',
                                    }}
                                >
                                    <PersonIcon sx={{ color: '#FFF', padding: '1rem', fontSize: { xs: 40, sm: 50, md: 60 } }} />
                                </Box>
                                <ButtonGroup
                                    variant="contained"
                                    ref={anchorRef}
                                    aria-label="Button group with a nested menu"
                                    sx={{
                                        width: '80%',
                                        marginBottom: '1rem',
                                        backgroundColor: '#FFF',
                                        '&:hover': {
                                            backgroundColor: theme.palette.background.secondary,
                                        },
                                        '&:active': {
                                            backgroundColor: theme.palette.background.secondary,
                                        },
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        onClick={handleToggle}
                                        sx={{
                                            flex: 1,
                                            textTransform: 'none',
                                            backgroundColor: '#FFF',
                                            '&:hover': {
                                                backgroundColor: theme.palette.background.tertiary,
                                            },
                                            '&:active': {
                                                backgroundColor: theme.palette.background.tertiary,
                                            },
                                        }}
                                    >
                                        <Typography sx={{ color: '#000' }}>
                                            {options[selectedIndex]}
                                        </Typography>
                                    </Button>
                                    <Button
                                        size="small"
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-label="select merge strategy"
                                        aria-haspopup="menu"
                                        onClick={handleToggle}
                                        sx={{
                                            flex: '0 0 auto',
                                            backgroundColor: '#FFF',
                                            '&:hover': {
                                                backgroundColor: theme.palette.background.tertiary,
                                            },
                                            '&:active': {
                                                backgroundColor: theme.palette.background.tertiary,
                                            },
                                        }}
                                    >
                                        <ArrowDropDownIcon sx={{ color: '#000' }} />
                                    </Button>
                                </ButtonGroup>
                                <Popper
                                    sx={{
                                        zIndex: 1,
                                    }}
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                        {options.map((option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                selected={index === selectedIndex}
                                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                                {showHorario && (
                                    <Button
                                        variant="contained"
                                        onClick={handleOpenClock}
                                        sx={{
                                            textTransform: 'none',
                                            marginBottom: '1rem',
                                            width: '80%',
                                            backgroundColor: '#FFF',
                                            '&:hover': {
                                                backgroundColor: theme.palette.background.tertiary,
                                            },
                                            '&:active': {
                                                backgroundColor: theme.palette.background.tertiary,
                                            },
                                        }}
                                    >
                                        <Typography sx={{ color: '#000' }}>
                                            Horario
                                        </Typography>
                                    </Button>
                                )}

                                {showMateria && (
                                    <>
                                        <CssTextField
                                            label="Materia"
                                            variant="outlined"
                                            sx={{
                                                width: '80%',
                                                paddingBottom: '1rem',
                                            }}
                                            InputProps={{
                                                style: {
                                                    color: '#FFF',
                                                },
                                            }}
                                        />
                                        <Button variant="contained" onClick={handleReservar}>
                                            <Typography sx={{ color: '#FFF', textTransform: 'none' }}>
                                                Reservar
                                            </Typography>
                                        </Button>
                                    </>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.background.secondary,
                                    borderRadius: '8px',
                                    width: '30%',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.palette.primary.main,
                                        width: { xs: '80px', sm: '100px', md: '120px' },
                                        height: { xs: '80px', sm: '100px', md: '120px' },
                                        borderRadius: '50%',
                                        marginBottom: '1rem',
                                        marginTop: '1rem',
                                    }}
                                >
                                    <MonitorIcon sx={{ color: '#FFF', padding: '1rem', fontSize: { xs: 40, sm: 50, md: 60 } }} />
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={handleInstalacion}
                                    sx={{
                                        textTransform: 'none',
                                        marginBottom: '1rem',
                                        width: '80%',
                                        backgroundColor: '#FFF',
                                        '&:hover': {
                                            backgroundColor: theme.palette.background.tertiary,
                                        },
                                        '&:active': {
                                            backgroundColor: theme.palette.background.tertiary,
                                        },
                                    }}
                                >
                                    <Typography sx={{ color: '#000' }}>
                                        Solicitar instalación de software
                                    </Typography>
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.background.secondary,
                                    borderRadius: '8px',
                                    width: '30%',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.palette.primary.main,
                                        width: { xs: '80px', sm: '100px', md: '120px' },
                                        height: { xs: '80px', sm: '100px', md: '120px' },
                                        borderRadius: '50%',
                                        marginBottom: '1rem',
                                        marginTop: '1rem',
                                    }}
                                >
                                    <BuildIcon sx={{ color: '#FFF', padding: '1rem', fontSize: { xs: 40, sm: 50, md: 60 } }} />
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={handleReporte}
                                    sx={{
                                        textTransform: 'none',
                                        marginBottom: '1rem',
                                        width: '80%',
                                        backgroundColor: '#FFF',
                                        '&:hover': {
                                            backgroundColor: theme.palette.background.tertiary,
                                        },
                                        '&:active': {
                                            backgroundColor: theme.palette.background.tertiary,
                                        },
                                    }}
                                >
                                    <Typography sx={{ color: '#000' }}>
                                        Reporte de falla
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>

                {showLightbox && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            zIndex: 9999,
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        onClick={alertOpen ? undefined : handleCloseLightbox}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: theme.palette.background.tertiary,
                                borderRadius: '8px',
                                width: '60%',
                                maxWidth: '600px',
                                height: 'auto',
                                padding: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {alertOpen && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <ScreenRotationIcon color="error" sx={{paddingBottom: '1rem', fontSize: 28}} />
                                    <Typography variant="body1">
                                        Por favor, gira tu dispositivo horizontalmente o amplía el tamaño de la pantalla para visualizar correctamente el calendario
                                    </Typography>
                                </Box>
                            )}

                            {showClock && (
                                <>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <StaticTimePicker
                                            localeText={{ toolbarTitle: 'Selecciona una hora' }}
                                            ampm={true}
                                            disablePast={true}
                                            ampmInClock={true}
                                            orientation="portrait"
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                            componentsProps={{ actionBar: { actions: [] } }}
                                            sx={{
                                                backgroundColor: 'transparent',
                                            }}
                                        />
                                        {error && <Typography color="error">{error}</Typography>}
                                    </LocalizationProvider>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flexDirection: 'row',
                                            width: '100%',
                                        }}
                                    >
                                        <Button
                                            variant="text"
                                            onClick={handleCloseLightbox}
                                            sx={{ textTransform: 'none', }}
                                        >
                                            <Typography
                                                variant="body"
                                            >
                                                Cerrar
                                            </Typography>
                                        </Button>
                                        <Button
                                            variant="text"
                                            onClick={handleOkClick}
                                            sx={{ textTransform: 'none', }}
                                        >
                                            <Typography
                                                variant="body"
                                            >
                                                OK
                                            </Typography>
                                        </Button>
                                    </Box>
                                </>
                            )}

                            {showInstalacion && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '80%',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography variant="h5" textAlign='center' sx={{ paddingBottom: '1rem', }}>
                                        Ingresa el nombre del software
                                    </Typography>
                                    <ButtonGroup
                                        variant="contained"
                                        ref={anchorRef}
                                        aria-label="Button group with a nested menu"
                                        sx={{
                                            width: '100%',
                                            marginBottom: '1rem',
                                            backgroundColor: '#FFF',
                                            '&:hover': {
                                                backgroundColor: theme.palette.background.secondary,
                                            },
                                            '&:active': {
                                                backgroundColor: theme.palette.background.secondary,
                                            },
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Button
                                            onClick={handleToggle}
                                            sx={{
                                                flex: 1,
                                                textTransform: 'none',
                                                backgroundColor: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                                '&:active': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                            }}
                                        >
                                            <Typography sx={{ color: '#000' }}>
                                                {options[selectedIndex]}
                                            </Typography>
                                        </Button>
                                        <Button
                                            size="small"
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                            sx={{
                                                flex: '0 0 auto',
                                                backgroundColor: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                                '&:active': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                            }}
                                        >
                                            <ArrowDropDownIcon sx={{ color: '#000' }} />
                                        </Button>
                                    </ButtonGroup>
                                    <Popper
                                        sx={{
                                            zIndex: 1,
                                        }}
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList id="split-button-menu" autoFocusItem>
                                                            {options.map((option, index) => (
                                                                <MenuItem
                                                                    key={option}
                                                                    selected={index === selectedIndex}
                                                                    onClick={(event) => handleMenuItemClickLaboratory(event, index)}
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                    <TextField
                                        variant="outlined"
                                        label="Software"
                                        sx={{
                                            paddingBottom: '1rem',
                                            color: '#000'
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleSolicitarInstalacion}
                                        sx={{
                                            marginBottom: '1rem',
                                            color: '#FFF'
                                        }}
                                    >
                                        <Typography variant="body1" textTransform='none'>
                                            Solicitar
                                        </Typography>
                                    </Button>
                                </Box>
                            )}
                            {showSolicitado && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleOutlineIcon color="success" sx={{ paddingBottom: '1rem' }} />
                                    <Typography variant="h4">
                                        Solicitado !
                                    </Typography>
                                </Box>
                            )}

                            {showReporte && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '80%',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant="h5" textAlign='center' sx={{ paddingBottom: '1rem', }}>
                                        Reporte de fallas
                                    </Typography>
                                    <ButtonGroup
                                        variant="contained"
                                        ref={anchorRef}
                                        aria-label="Button group with a nested menu"
                                        sx={{
                                            width: '100%',
                                            marginBottom: '1rem',
                                            backgroundColor: '#FFF',
                                            '&:hover': {
                                                backgroundColor: theme.palette.background.secondary,
                                            },
                                            '&:active': {
                                                backgroundColor: theme.palette.background.secondary,
                                            },
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Button
                                            onClick={handleToggle}
                                            sx={{
                                                flex: 1,
                                                textTransform: 'none',
                                                backgroundColor: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                                '&:active': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                            }}
                                        >
                                            <Typography sx={{ color: '#000' }}>
                                                {options[selectedIndex]}
                                            </Typography>
                                        </Button>
                                        <Button
                                            size="small"
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                            sx={{
                                                flex: '0 0 auto',
                                                backgroundColor: '#FFF',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                                '&:active': {
                                                    backgroundColor: theme.palette.background.tertiary,
                                                },
                                            }}
                                        >
                                            <ArrowDropDownIcon sx={{ color: '#000' }} />
                                        </Button>
                                    </ButtonGroup>
                                    <Popper
                                        sx={{
                                            zIndex: 1,
                                        }}
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList id="split-button-menu" autoFocusItem>
                                                            {options.map((option, index) => (
                                                                <MenuItem
                                                                    key={option}
                                                                    selected={index === selectedIndex}
                                                                    onClick={(event) => handleMenuItemClickLaboratory(event, index)}
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                    <TextField
                                        variant="outlined"
                                        label="Descripción"
                                        sx={{
                                            paddingBottom: '1rem',
                                            color: '#000'
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={handleEnviarReporte}
                                        sx={{
                                            marginBottom: '1rem',
                                            color: '#FFF'
                                        }}
                                    >
                                        <Typography variant="body1" textTransform='none'>
                                            Enviar reporte
                                        </Typography>
                                    </Button>
                                </Box>
                            )}
                            {showReportado && (
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckCircleOutlineIcon color="success" sx={{ paddingBottom: '1rem' }} />
                                    <Typography variant="h4">
                                        Reportado !
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                    </Box>
                )}
            </Box>
            <Footer />
        </>
    );
}