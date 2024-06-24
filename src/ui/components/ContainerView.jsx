import { Box } from "@mui/material";
import { useRef, useEffect } from "react";
import theme from "../theme";

import { useStore } from "../../store/useStore";

export default function ContainerView({
    children,
    parent = false,
    background = "linear-gradient(45deg, #000000, #222222)",
    border = null,
    vW = `${useStore((state) => state.vW)}px`,
    vH = `${useStore((state) => state.vH)}px`,
    sx = null,
}) {
    const viewportRef = useRef(null);

    useEffect(() => {
        if (parent) {
            setSizes();
        }
    }, []);

    function setSizes() {
        const vW = viewportRef.current.offsetWidth;
        const vH = viewportRef.current.offsetHeight;
        console.log("setting sizes: ", vW, vH, "px");

        useStore.setState({ vW: vW, vH: vH });
    }

    window.onresize = setSizes;

    return (
        <Box
            ref={viewportRef}
            sx={{
                width: vW,
                height: vH,
                maxHeight: vH,
                borderRadius: `${theme.btnH / 2}px`,
                bgcolor: "black",
                margin: `${theme.btnM}px`,
                marginTop: 0,
                marginBottom: 0,
                background: background,

                // border: border,
                position: "relative",
                overflow: "auto",
                ...sx,
            }}
            className="holomorphic"
        >
            {children}
        </Box>
    );
}
