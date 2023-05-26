import { Button, Grid, Menu, MenuItem, TextField } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { addEntry, editEntry } from '../context/entriesSlice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

const keyvalue = {
    'pending': 'Pendiente',
    'in-progress': 'En proceso',
    'finished': 'Finalizado'
}

export const Entry = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [menu, setMenu] = useState(null);
    const closeMenu = () => setMenu(null);
    const openMenu = (event) => setMenu(event.currentTarget);

    const entries = useSelector(state => state.entries);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const getData = useCallback(
        () => {

            if (id) {

                let [data] = entries.filter(e => e._id === id)

                setDescription(data.description);

                setStatus(data.status)
            }

        },
        [entries, id],
    )

    useEffect(() => {
        getData()
    }, [getData])





    const renderMenu = (
        <Menu
            anchorEl={menu}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(menu)}
            onClose={closeMenu}
            keepMounted
            sx={{ width: '100%' }}
        >

            <MenuItem

                sx={{ width: '100%' }}
                onClick={() => {
                    closeMenu()
                    setStatus('pending');
                }}>Pendiente</MenuItem>
            <MenuItem

                sx={{ width: '100%' }}
                onClick={() => {
                    closeMenu()
                    setStatus('in-progress');
                }}>En progreso</MenuItem>
            <MenuItem onClick={() => {

                closeMenu()
                setStatus('finished');

            }}>Finalizado</MenuItem>
        </Menu>
    );






    function handleSubmit(e) {
        e.preventDefault()

        dispatch(addEntry({
            _id: uuidv4(),
            description: description,
            createAt: Date.now(),
            status: 'pending',
        }))
        enqueueSnackbar('Entrada registrada', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
        })
        navigate('/dasboard');



    }


    function handleSubmitEdit(e) {
        e.preventDefault()
        dispatch(editEntry({
            _id: id,
            description: description,
            status: status,
        }))
        enqueueSnackbar('Entrada actualizada', {
            variant: 'success',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
        })
        navigate('/dasboard');

    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={12} sm={6} md={4}
            >
                <form onSubmit={id ? handleSubmitEdit : handleSubmit}>
                    <Grid container gap={3}>
                        <Grid item xs={12} >
                            <TextField
                                label="Descripción"
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Button variant="outlined" onClick={openMenu} fullWidth disabled={!id}
                                endIcon={<KeyboardArrowDownIcon />}
                            >
                                {

                                    keyvalue[status] ? keyvalue[status] : 'Pendiente'}
                            </Button>
                        </Grid>

                        {renderMenu}
                        <Button
                            type="submit" variant="contained" color="primary" fullWidth>
                            {
                                id
                                    ? 'Editar'
                                    : 'Crear'
                            }
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}
