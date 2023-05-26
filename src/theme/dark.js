import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Modo oscuro
        primary: {
            main: '#80CBC4', // Turquesa pastel
            contrastText: '#000000', // Texto en contraste para el botón principal en el tema dark
          },
          secondary: {
            main: '#FFD180', // Melocotón claro
            contrastText: '#FFFFFF', // Texto en contraste para el botón secundario en el tema dark
          },
        background: {
          default: '#212121', // Fondo: Negro
        },
        text: {
          primary: '#F9F6F8', // Texto principal: Blanco
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

export default darkTheme;