import { Card, CardActionArea, CardActions, CardContent, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { getFormatDistanceToNow } from "../utils/dateFunction"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEntry } from "../context/entriesSlice";
import { useSnackbar } from 'notistack';


export const EntryCard = ({ entry }) => {

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [menu, setMenu] = useState(null);
    const closeMenu = () => setMenu(null);
    const openMenu = (event) => setMenu(event.currentTarget);

    const dispatch = useDispatch();

    function handleEdit() {
        navigate(`/edit/${entry._id}`)
    }
    function handleDelete() {

        dispatch(deleteEntry(entry._id))

        enqueueSnackbar('Entrada eliminada', {
            variant: 'info',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right'
            }
        })

    }

    const renderMenu = (
        <Menu
            anchorEl={menu}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            open={Boolean(menu)}
            onClose={closeMenu}
            keepMounted
        >
            <MenuItem onClick={() => {
                handleEdit()
                closeMenu()

            }}>Editar</MenuItem>
            <MenuItem onClick={() => {
                handleDelete()
                closeMenu()

            }}>Eliminar</MenuItem>
        </Menu>
    );

    return (
        <Card
            sx={{
                marginBottom: 1
            }}
        >


            <CardActionArea>

                <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>

                    <Typography sx={{ whiteSpace: 'pre-line' }}>
                        {entry.description}
                    </Typography>
                    <IconButton onClick={openMenu}>
                        <MoreVertIcon />
                    </IconButton>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">
                        {
                            getFormatDistanceToNow(entry.createAt)
                        }
                    </Typography>
                </CardActions>

            </CardActionArea>
            {renderMenu}
        </Card>
    )
}
