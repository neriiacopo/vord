import { Box, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import theme from "../theme.js";

import { useStore } from "../../store/useStore.jsx";

import ActionButton from "../components/ActionButton.jsx";
import CollectionsIcon from "@mui/icons-material/StorageOutlined";

export default function Nav({ styleProps }) {
    const actionsHistory = useStore((state) => state.actionsHistory);
    const actionActive = useStore((state) => state.actionActive);
    const setActive = useStore((state) => state.setActive);

    const mainContainerRef = useRef(null);
    const shadowRef = useRef(null);

    useEffect(() => {
        const mainContainer = mainContainerRef.current;
        const shadow = shadowRef.current;

        const mainContainerRect = mainContainer.getBoundingClientRect();
        const w = mainContainerRect.width - theme.btnM / 2;

        shadow.style.width = `${w}px`;
        shadow.style.borderRadius = `${w / 2}px`;
        shadow.style.height = `${mainContainerRect.height}px`;
        shadow.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    }, []);

    function History({ styleProps, actionsHistory }) {
        return actionsHistory.map((action, i) => {
            return (
                <Box
                    sx={{
                        ...styleProps.btnS,
                        bgcolor:
                            i != actionActive - 1
                                ? "transparent"
                                : action.color,
                        borderColor: action.color,
                    }}
                    key={i}
                    className="holomorphic"
                >
                    <IconButton
                        sx={{
                            height: "100%",
                            width: "100%",
                            color:
                                i == actionActive - 1
                                    ? "kinherit"
                                    : action.color,
                        }}
                        onClick={() => setActive(i + 1)}
                    >
                        {action.icon}
                    </IconButton>
                </Box>
            );
        });
    }

    return (
        <>
            <Box
                ref={mainContainerRef}
                sx={{
                    width: `${theme.btnH + theme.btnM * 2 + 2}px`,

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <DatabaseButton styleProps={styleProps} />
                <ActionButton styleProps={styleProps} />
                <History
                    styleProps={styleProps}
                    actionsHistory={actionsHistory}
                />
                <Box
                    ref={shadowRef}
                    sx={{
                        border: "solid 0.1px #ebebeb",
                        position: "absolute",
                        top: 0,
                        zIndex: -2,
                        // bgcolor: "transparent",
                    }}
                ></Box>
            </Box>
        </>
    );
}

function DatabaseButton({ styleProps }) {
    const dbOn = useStore((state) => state.dbOn);

    const dbShow = () => {
        useStore.setState({ dbOn: !dbOn });
    };

    return (
        <Box
            sx={{
                ...styleProps.btnS,
            }}
            className="holomorphic"
        >
            <IconButton
                sx={{ height: "100%", width: "100%" }}
                onClick={dbShow}
            >
                <CollectionsIcon />
            </IconButton>
        </Box>
    );
}
