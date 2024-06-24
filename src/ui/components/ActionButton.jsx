import { Box, IconButton, Tooltip } from "@mui/material";
import { useState, useEffect, useRef } from "react";

import theme from "../theme.js";
import { useStore } from "../../store/useStore.jsx";

import AddIcon from "@mui/icons-material/Add";

export default function ActionButton({ styleProps }) {
    const addBtn = useStore((state) => state.addBtn);
    const actionBtns = useStore((state) => state.actionBtns);

    const [showSubActions, setShowSubActions] = useState(null);
    const [showCategories, setShowCategories] = useState(false);

    const actionButtonRef = useRef(null); // Ref to the main action button or container

    const showBtns = () => {
        setShowCategories(!showCategories);
        setShowSubActions(null);
    };

    const showSubBtns = (id) => {
        setShowSubActions(id);
    };

    // Trigger a blur effect on the canvas
    useEffect(() => {
        if (showCategories) {
            useStore.setState({ activeFocus: true });
        } else {
            useStore.setState({ activeFocus: false });
        }
    }, [showCategories]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                actionButtonRef.current &&
                !actionButtonRef.current.contains(event.target)
            ) {
                setShowCategories(false);
                setShowSubActions(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [actionButtonRef]);

    return (
        <>
            <Box
                sx={{
                    ...styleProps.btnS,
                }}
                className="holomorphic"
            >
                <IconButton
                    sx={{ height: "100%", width: "100%" }}
                    onClick={showBtns}
                >
                    <AddIcon />
                </IconButton>
            </Box>

            {showCategories && (
                <Box
                    ref={actionButtonRef}
                    sx={{
                        position: "absolute",
                        zIndex: 10,
                        top: 0,
                        left: `${theme.btnH + theme.btnM * 3 + 2}px`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        // bgcolor: "rgba(100,100,100, 0.5)",
                        borderRadius: `${theme.btnH / 2}px`,
                    }}
                    className="subBtn"
                >
                    {actionBtns.btns.map((cat, i) => (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                }}
                                key={i}
                            >
                                <Box
                                    sx={{
                                        ...styleProps.btnS,
                                        bgcolor: cat.color,
                                        borderColor: cat.color,
                                        // boxShadow: "0px 0px 5px 0px #ebebeb",
                                    }}
                                >
                                    <Tooltip
                                        title={cat.name}
                                        placement="bottom"
                                    >
                                        <IconButton
                                            sx={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                            onClick={(e, id = i) =>
                                                showSubBtns(id)
                                            }
                                        >
                                            {cat.icon}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                {showSubActions == i && (
                                    <>
                                        {cat.btns.map((subBtn, j) => (
                                            <Box
                                                sx={{
                                                    ...styleProps.btnS,
                                                    borderColor: cat.color,
                                                }}
                                                key={j}
                                            >
                                                <Tooltip
                                                    title={subBtn.name}
                                                    placement="bottom"
                                                >
                                                    <IconButton
                                                        sx={{
                                                            height: "100%",
                                                            width: "100%",
                                                            color: cat.color,
                                                        }}
                                                        onClick={(
                                                            e,
                                                            btn = subBtn
                                                        ) => {
                                                            addBtn(btn);
                                                            showBtns();
                                                        }}
                                                    >
                                                        {subBtn.icon}
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        ))}
                                    </>
                                )}
                            </Box>
                        </>
                    ))}
                </Box>
            )}
        </>
    );
}
