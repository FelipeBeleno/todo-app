import React from 'react'
import AppIndex from '../pages/IndexApp'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Entry } from '../pages/Entry';
import { Box, Button, IconButton } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../context/themeSlice';
import { login, logout } from '../context/loginSlice';
import { Question } from '../pages/Question';

const PrivateRoute = ({ children }) => {
    // Función para simular la autenticación

    const { login } = useSelector(state => state)
    const isAuthenticated = () => {
        // Verifica si el usuario está autenticado
        // Devuelve true si está autenticado, o false en caso contrario
        return login;
    };

    return isAuthenticated() ? (
        children
    ) : (
        <Navigate to="/" />
    );
};


const PublicRoute = ({ children }) => {

    const { login } = useSelector(state => state)
    const isAuthenticated = () => {

        return login;
    };

    return !isAuthenticated() ? (
        children
    ) : (
        <Navigate to="/dashboard" />
    );
};



export const Example = () => {
    const dispatch = useDispatch();
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Button onClick={() => {
                dispatch(login())
            }} variant="contained" color="primary">
                Entra a la app
            </Button>
        </Box>
    )
}



const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute> <Example /></PublicRoute>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><AppIndex /></PrivateRoute>
    },
    {
        path: '/edit',
        element: <PrivateRoute> <Entry /> </PrivateRoute>,
        children: [
            {
                path: ':id',
                element: <Entry />
            }
        ]
    },
    {
        path: '/create',
        element: <PrivateRoute> <Entry /> </PrivateRoute>
    },
    {
        path: '/question',
        element: <PrivateRoute> <Question /></PrivateRoute>
    },
    {
        path: '*',
        element: <Navigate to={'/'} />
    }
])

export const AppRoutes = () => {

    const dispatch = useDispatch()
    const { theme, login } = useSelector(state => state)
    function changeThemeFn() {
        dispatch(changeTheme(!theme))
    }

    return (<>
        <RouterProvider router={router} />


            <IconButton
                onClick={changeThemeFn}
                sx={{ position: 'fixed', bottom: '1rem', right: '2rem' }} aria-label="delete" size="large">
                {theme ?
                    <WbSunnyIcon />
                    :
                    <DarkModeIcon fontSize="inherit" />
                }
            </IconButton>
            {
                login &&
                <>
                    <IconButton
                        onClick={() => dispatch(logout())}
                        sx={{ position: 'fixed', bottom: '4rem', right: '2rem' }} aria-label="delete" size="large">
                        <ExitToAppIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => { window.location.pathname="/question" }}
                        sx={{ position: 'fixed', bottom: '7rem', right: '2rem' }} aria-label="delete" size="large">
                        <HelpOutlineIcon />
                    </IconButton>
                </>
            }


    </>
    )
}
