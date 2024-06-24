import { Box, Unstable_Grid2 as Grid, Chip } from "@mui/material";
import theme from "../theme.js";

import Nav from "./Nav.jsx";
import Viewport from "./Viewport.jsx";

import { useStore } from "../../store/useStore.jsx";

export default function MainView({ styleProps }) {
    const activeFocus = useStore((state) => state.activeFocus);

    const fadeS = {
        opacity: activeFocus ? 0.9 : 1,
        transition: "opacity 1s ease-out",
    };

    return (
        <>
            <Nav styleProps={styleProps} />
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    ...fadeS,
                }}
            >
                <Viewport styleProps={styleProps} />
            </Box>
        </>
    );
}
