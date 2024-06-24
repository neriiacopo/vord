import { createTheme } from "@mui/material/styles";

// let theme = createTheme({
//     palette: {
//         primary: {
//             main: "rgba(48,48,48,0.9)",
//             light: "rgba(48,48,48,0.5)",
//             darker: "rgba(48,48,48,0.3)",
//             main: "#000000",
//         },
//         secondary: {
//             main: "#00D6D2",
//             error: "#f50057",
//             dark: "#020417",
//             // dark: "#F8AC4F",
//         },
//         legend: {
//             // vehicle: "#F8AC4F",
//             // bycicle: "#E943A4",
//             // person: "#5EBDFF",
//             gender: {
//                 Male: "#3E2CB0",
//                 Female: "#E64366",
//             },
//             age: {
//                 "0 < 18": "#D1E028",
//                 "18 < 30": "#D8AC3D",
//                 "30 < 50": "#DF7751",
//                 "50 +": "#E64366",
//             },
//         },
//         scene: {
//             grid: {
//                 main: "rgb(220,220,220)",
//                 back: "rgb(250,250,250)",
//                 dark: "rgb(100,100,100)",
//             },
//             background: { bright: "whitesmoke", dark: "#020417" },
//             symbols: "rgb(20,20,20)",
//             heatmap: {
//                 "0.0": "whitesmoke",
//                 0.5: "blue",
//                 0.7: "red",
//                 "1.0": "yellow",
//             },
//             interaction: "#00FF00",
//         },
//     },
//     typography: {
//         fontFamily: "Manrope",
//         // main: {
//         //     fontFamily: "Manrope",
//         // },
//     },
// });

// theme = createTheme(theme, {
//     components: {
//         MuiDateCalendar: {
//             styleOverrides: {
//                 root: {
//                     color: theme.palette.secondary.dark,
//                     fontFamily: theme.typography.fontFamily,
//                 },
//             },
//             MuiPickersCalendarHeader: {
//                 styleOverrides: {
//                     root: {
//                         color: theme.palette.secondary.dark,
//                         fontFamily: theme.typography.fontFamily,
//                     },
//                 },
//             },
//         },

//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: 0,
//                     // backgroundColor: theme.palette.legend.vehicle,
//                 },
//             },
//         },
//         MuiToggleButton: {
//             styleOverrides: {
//                 root: {
//                     "&.Mui-selected": {
//                         backgroundColor: theme.palette.secondary.dark,
//                         color: "white",
//                         "&:hover": {
//                             backgroundColor: theme.palette.secondary.dark,
//                         },
//                     },
//                 },
//             },
//         },

//         // MuiBox: {
//         //     styleOverrides: {
//         //         selected: {
//         //             backgroundColor: theme.palette.secondary.error,
//         //         },
//         //     },
//         // },
//     },
// });

let theme = createTheme({
    btnH: 50,
    btnM: 10,
    typography: {
        fontFamily: "Work Sans",
    },
    components: {},
});

export default theme;
