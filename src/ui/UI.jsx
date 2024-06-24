import { Unstable_Grid2 as Grid, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import theme from "./theme.js";

import { useStore } from "../store/useStore.jsx";

import Banner from "./structure/Banner";
import MainView from "./structure/MainView";
import Pagination from "./structure/Pagination.jsx";

export default function UI() {
    const btnS = {
        width: `${theme.btnH}px`,
        height: `${theme.btnH}px`,
        borderRadius: `${theme.btnH / 2}px`,
        backgroundColor: "whitesmoke",
        border: "solid 0.1px #ebebeb",
        margin: `${theme.btnM}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const btnTextS = {
        width: `auto`,
        paddingLeft: `${theme.btnM * 2}px`,
        paddingRight: `${theme.btnM * 2}px`,
    };

    return (
        <Box
            sx={{
                width: "98vw",
                height: "98vh",
                margin: "1vh 1vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <Banner styleProps={{ btnS, btnTextS }} />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <MainView styleProps={{ btnS, btnTextS }} />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Pagination styleProps={{ btnS, btnTextS }} />
            </Box>
        </Box>
    );
}
