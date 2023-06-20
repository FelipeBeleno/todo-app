import { useCallback, useEffect } from "react";
import { Box, Button, Card, CardHeader, Grid } from "@mui/material";
import { EntryList } from "../components/EntryList";
import { useDispatch } from "react-redux";
import { setInitial } from "../context/entriesSlice";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from "react-router-dom";

const AppIndex = () => {


    const dispatch = useDispatch();

    const navitage = useNavigate();


    const getEntries = useCallback(
        async () => {

            if (!localStorage.getItem('entries')) {

                const response = await fetch('/entries.json');
                const body = await response.json();
                dispatch(setInitial(body))
                localStorage.setItem('entries', JSON.stringify(body))

            } else {
                dispatch(setInitial(JSON.parse(localStorage.getItem('entries'))))
            }
        },
        [dispatch],
    )
    useEffect(() => {
        getEntries()
    }, [getEntries]);


    return (
        <Box sx={{ padding: '10px 20px' }}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={4} >
                    <Card sx={{ height: 'auto', padding:'10px' }}>
                        <CardHeader title="Pendientes" />

                        <Button variant="contained" fullWidth
                            endIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => {
                                navitage('/create')
                            }}
                        >
                            Agregar tarea
                        </Button>

                        <EntryList status="pending" />

                    </Card>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Card sx={{ height: 'auto', padding:'10px' }}>
                        <CardHeader title="Progreso" />
                        <EntryList status="in-progress" />
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4} >
                    <Card sx={{ height: 'auto',padding:'10px' }}>
                        <CardHeader title="Completadas" />
                        <EntryList status="finished" />

                    </Card>
                </Grid>


            </Grid>
        </Box>
    );
};
export default AppIndex;