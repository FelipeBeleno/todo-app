import React from 'react'
import AppIndex from '../pages/IndexApp'
import {  Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Entry } from '../pages/Entry';
import { Box, Button, IconButton } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
//import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../context/themeSlice';
import { login } from '../context/loginSlice';
import { Question } from '../pages/Question';
import { Charts } from '../pages/Charts';
import BarChartIcon from '@mui/icons-material/BarChart';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';


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
        path: '/charts',
        element: <Charts />,
        caseSensitive: true
    },
    {
        path: '/dashboard',
        element: <AppIndex />
    },
    {
        path: '/edit',
        element: <Entry />,
        children: [
            {
                path: ':id',
                element: <Entry />
            }
        ]
    },
    {
        path: '/create',
        element: <Entry />
    },
    {
        path: '/question',
        element: <Question />
    },
    {
        path:'/',
        element: <Navigate to="/dashboard"/>
    },
    {
        path: '*',
        element:<Navigate to="/dashboard"/>

    }
])

export const AppRoutes = () => {

    const dispatch = useDispatch()
    const { theme } = useSelector(state => state)
    function changeThemeFn() {
        localStorage.setItem('theme', JSON.stringify(!theme))
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


        <IconButton
            onClick={() => {

                if (window.location.pathname === '/charts') {
                    window.location.pathname = '/dashboard'
                    return
                }

                window.location.pathname = '/charts'

            }}
            sx={{ position: 'fixed', bottom: '4rem', right: '2rem' }} aria-label="delete" size="large">
            {
                window.location.pathname === '/charts'
                    ? <PlaylistAddCheckIcon />
                    : <BarChartIcon />
            }

        </IconButton>
      {/* 
       <IconButton
            onClick={() => { window.location.pathname = "/question" }}
            sx={{ position: 'fixed', bottom: '7rem', right: '2rem' }} aria-label="delete" size="large">
            <HelpOutlineIcon />
        </IconButton>
      */} 

    </>
    )
}
