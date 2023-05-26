import { createTheme } from '@mui/material/styles';

const ligthTheme = createTheme({
    palette: {
        primary: {
            main: '#80CBC4', // Turquesa pastel
            contrastText: '#FFFFFF', // Texto en contraste para el botón principal en el tema light
          },
          secondary: {
            main: '#FFD180', // Melocotón claro
            contrastText: '#434343', // Texto en contraste para el botón secundario en el tema light
          },
        background: {
          default: '#F9F6F8', // Fondo: Rosa pálido
        },
        text: {
          primary: '#434343', // Texto principal: Gris oscuro suave
        },
        button: {
          primary: '#AED581', // Botón primario: Verde pastel
          secondary: '#FFAB91', // Botón secundario: Melocotón pastel
        },
        link: {
          main: '#8E8E8E', // Enlace: Gris medio
        },
      },
});

export default ligthTheme;