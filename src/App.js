import AppRouter from './routes/AppRouter';
import { ThemeProvider, createTheme } from "@mui/material";
import React from 'react';

function App() {
  const lightTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#114ACB',
      },
      secondary: {
        main: '#E8412C',
      },
      error: {
        main: '#d50000',
      },
      background: {
        primary: '#7198C6',
        secondary: '#9AB5D5',
        tertiary: '#CEDBFA',
      },
    }
  });

  const theme = lightTheme;

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
          <AppRouter />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
