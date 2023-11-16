import {createTheme} from '@mui/material/styles';
import themeJson from './theme.json'

const theme = createTheme({
    palette: {
        primary: {
            main: themeJson.coreColors.primary,
        },
        secondary: {
            main: themeJson.coreColors.secondary,
        },
        tertiary: {
            main: themeJson.coreColors.tertiary,
        },
        neutral: {
            main: themeJson.coreColors.neutral,
        },
        neutralVariant: {
            main: themeJson.coreColors.neutralVariant,
        },
        error: {
            main: themeJson.coreColors.error,
        }
    },
    // Take out schemes values from theme.json path way: Frontend/src/theme.json
    schemes:{
        light: {
            primary: themeJson.schemes.light.primary,
            onPrimary: themeJson.schemes.light.onPrimary,
            primaryContainer: themeJson.schemes.light.primaryContainer,
            onPrimaryContainer: themeJson.schemes.light.onPrimaryContainer,
            primaryFixed: themeJson.schemes.light.primaryFixed,
            onPrimaryFixed: themeJson.schemes.light.onPrimaryFixed,
            onPrimaryFixedDim: themeJson.schemes.light.onPrimaryFixedDim,
            onPrimaryFixedVariant: themeJson.schemes.light.onPrimaryFixedVariant,


            
        }
    }
})