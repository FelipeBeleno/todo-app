
import { ThemeProvider, CssBaseline } from '@mui/material';
import '../App.css';
import { SnackbarProvider } from 'notistack';

import { useSelector } from 'react-redux';
import darkTheme from '../theme/dark';
import ligthTheme from '../theme/ligth';
import { AppRoutes } from '../router/AppRoutes';

export default function ContentApp() {
    const { theme } = useSelector(state => state);


    return (
        <ThemeProvider theme={theme ? darkTheme : ligthTheme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3}>
                <AppRoutes />
            </SnackbarProvider>
        </ThemeProvider>
    )
}
