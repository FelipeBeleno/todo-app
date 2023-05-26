import { Box, Button, Grid, TextField } from "@mui/material"
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);




export const Question = () => {

    const [description, setDescription] = useState('');
    const [response, setResponse] = useState('');
    const [loader, setLoader] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            setLoader(true)
            let responseIA = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: description,
                temperature: 0.7,
                max_tokens: 1000,
            });

            setResponse(responseIA.data.choices[0].text)
            setLoader(false)
        } catch (error) {

        }
    }

    return (
        <Box
            display="flex"
            flexDirection={'column'}
            justifyContent="center"
            alignItems="center"
            height="100vh"

        >
            <form onSubmit={handleSubmit}>
                <Grid container gap={3}>

                    <TextField
                        label="Pregunta algo"
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        required
                        multiline

                    />

                    <Button  disabled={loader} variant="contained" color="primary" fullWidth type="submit">
                        Consultar
                    </Button>
                </Grid>
            </form>

            <code variant="body1" style={{ padding: '1rem' }}>
                {response}
            </code>
        </Box>
    )
}
