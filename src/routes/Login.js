import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import AppBarCustom from "../components/AppBarCustom";
import Footer from "../components/Footer";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [codigoInstitucional, setCodigoInstitucional] = useState('');
    const [password, setPassword] = useState('');
    const [errorCodigo, setErrorCodigo] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorCodigo('');
        setErrorPassword('');

        let isValid = true;
        if (!codigoInstitucional) {
            setErrorCodigo('El código institucional es requerido');
            isValid = false;
        }
        if (!password) {
            setErrorPassword('La contraseña es requerida');
            isValid = false;
        }

        if (isValid) {
            if (codigoInstitucional === 'A123' && password === '123') {
                navigate('/profesor');
            }
            if (codigoInstitucional === 'B123' && password === '123') {
                navigate('/tecnico');
            } else {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        }
    };

    return (
        <>
            <AppBarCustom professorsText="INICIAR SESIÓN" />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100vh',
                    backgroundColor: theme.palette.background.primary,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '60%',
                            maxWidth: '600px',
                            height: '70vh',
                            maxHeight: '600px',
                            backgroundColor: '#FFF',
                            borderRadius: '10px',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                        }}
                    >
                        <Typography variant="h4" textAlign='center' sx={{ paddingBottom: '1rem', fontWeight: 600 }}>
                            Bienvenido
                        </Typography>
                        <Typography variant="body1" textAlign='center' sx={{ paddingBottom: '1rem' }}>
                            Ingresa el código institucional y la contraseña para iniciar
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: '90%',
                                paddingBottom: '1rem',
                            }}
                        >
                            <TextField
                                variant="outlined"
                                label="Código Institucional"
                                type="text"
                                value={codigoInstitucional}
                                onChange={(e) => setCodigoInstitucional(e.target.value)}
                                error={!!errorCodigo}
                                helperText={errorCodigo}
                                sx={{ paddingBottom: '1rem' }}
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!errorPassword}
                                helperText={errorPassword}
                                sx={{ paddingBottom: '1rem' }}
                            />
                        </Box>
                        <Button
                            variant="text"
                            sx={{
                                marginBottom: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '90%',
                                borderRadius: '20px',
                            }}
                        >
                            <Typography variant="body2" textTransform='none' >
                                ¿Olvidaste tu contraseña?
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            to='/calendar'
                            sx={{
                                marginBottom: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '90%',
                                borderRadius: '20px',
                            }}
                        >
                            <Typography variant="body2" textTransform='none' >
                                Iniciar Sesión
                            </Typography>
                        </Button>
                    </Box>
                    {showAlert && (
                        <Alert
                            severity="error"
                            variant="filled"
                            onClose={() => setShowAlert(false)}
                            sx={{
                                position: 'fixed',
                                bottom: '2rem',
                                left: '50%',
                                transform: 'translate(-50%)',
                                zIndex: 2,
                            }}
                        >
                            Las credenciales ingresadas no son correctas. Por favor, inténtalo de nuevo.
                        </Alert>
                    )}
                </Box>
            </Box>
            <Footer />
        </>
    );
}