import {
    Box,
    Typography,
    ImageList,
    ImageListItem,
    IconButton,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useState, useRef } from "react";

import { useStore } from "../../store/useStore";
import ContainerView from "../components/ContainerView";

let color;

export default function PickChoose({ actionId }) {
    const data = useStore(
        (state) => state.dataHistory[actionId - 1] || state.data
    );
    const { actionsSettings, setActionSettings, setDataHistory } = useStore(
        (state) => ({
            actionsSettings: state.actionsSettings[actionId] || {
                settings: {},
            },
            setActionSettings: state.setActionSettings,
            setDataHistory: state.setDataHistory,
        })
    );

    color = useStore((state) => state.colors["inspect"]);
    const vH = useStore((state) => state.vH);

    const selectedItems = actionsSettings.settings.selectedItems || new Set();
    // new Set(data.map((_, i) => i));

    const entry = actionsSettings.settings.entry || null;

    const handleToggleSelection = (index) => {
        const newSelection = new Set(selectedItems);

        if (newSelection.has(index)) {
            newSelection.delete(index);
        } else {
            newSelection.add(index);
        }
        setActionSettings(actionId, {
            ...actionsSettings.settings,
            selectedItems: newSelection,
            entry: data[index],
        });

        setDataHistory(
            actionId,
            data.filter((d) => {
                if (newSelection.has(data.indexOf(d))) {
                    return d;
                }
            })
        );
    };

    return (
        <>
            <ContainerView
                vW={"20%"}
                background={"white"}
                sx={{
                    border: "solid 1px #ebebeb",
                    borderColor: color,
                    color: color,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <InfoTab entry={entry} />
            </ContainerView>

            <ContainerView
                vW={"80%"}
                sx={{ display: "flex", flexDirection: "row" }}
            >
                <ImageMagnifier entry={entry} />

                <Box
                    sx={{
                        width: "30%",
                        position: "relative",
                        // border: "1px solid blue",
                        overflow: "scroll",
                    }}
                >
                    <ImageList
                        sx={{ pr: 2, pt: 1, h: "100%", mb: 0, pb: 0 }}
                        variant="woven"
                        cols={3}
                        gap={8}
                    >
                        {data.map((item, index) => (
                            <ImageListItem
                                key={index}
                                sx={{
                                    border: selectedItems.has(index)
                                        ? "2px solid"
                                        : "none",
                                    borderColor: color,
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }}
                                onClick={() => handleToggleSelection(index)}
                            >
                                <img
                                    src={`${item.image_url}?w=161&fit=crop&auto=format`}
                                    alt={item.artwork_name}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            </ContainerView>
        </>
    );
}

function Image({ entry }) {
    return (
        <Box
            sx={{
                width: "70%",
                maxWidth: "70%",
                p: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {entry != null && (
                <img
                    src={entry.image_url}
                    loading="lazy"
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                    }}
                />
            )}
        </Box>
    );
}

function ImageMagnifier({ entry, width = 200, height = 200 }) {
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [showLens, setShowLens] = useState(false);
    const containerRef = useRef(null);
    const lensRef = useRef(null);

    const radius = 200;
    const handleMouseMove = (event) => {
        if (!containerRef.current) {
            return;
        }
        const { left, top } = containerRef.current.getBoundingClientRect();
        const x = event.pageX - left;
        const y = event.pageY - top;

        lensRef.current.style.backgroundPosition = `${-x}px ${-y}px`;

        setZoomPosition({ x, y });
    };

    return (
        <Box
            // ref={containerRef}
            sx={{
                width: "70%",
                maxWidth: "70%",
                p: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {entry != null && (
                <>
                    <img
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setShowLens(true)}
                        onMouseLeave={() => setShowLens(false)}
                        src={entry.image_url}
                        loading="lazy"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                    {showLens && (
                        <div
                            ref={lensRef}
                            style={{
                                position: "absolute",
                                p: 10,
                                left: `${zoomPosition.x - radius / 4}px`,
                                top: `${zoomPosition.y - radius}px`,
                                width: `${radius / 2}px`,
                                height: `${radius / 2}px`,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: color,
                                pointerEvents: "none",
                                background: `url(${entry.image_url}) no-repeat`,
                                transform: "scale(2)",

                                borderRadius: "100%",
                                transformOrigin: `${-radius / 2}px ${
                                    -radius / 2
                                }px`,
                                boxShadow: "5px 5px 12px rgba(0, 0, 0, 0.5)",
                            }}
                        />
                    )}
                </>
            )}
        </Box>
    );
}

function InfoTab({ entry }) {
    const info = useStore((state) => state.info);

    return (
        <>
            <Typography
                id="modal-modal-title"
                variant="h4"
                component="h1"
                sx={{ p: "40px", height: "150px" }}
            >
                {entry == null
                    ? "Select a painting to view info"
                    : entry.artwork_name}
            </Typography>
            {entry != null && (
                <>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h1"
                        sx={{ p: "40px", pb: 0 }}
                    >
                        {entry.artist_full_name}
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, pl: "40px" }}
                    >
                        <br />
                        <br />
                        {info.slice(3).map((column, index) => (
                            <p>
                                {column.replace("_", " ")}:
                                <br />
                                {entry[column]}
                                <br />
                            </p>
                        ))}
                    </Typography>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            m: 4,
                            w: 4,
                            h: 4,
                            p: 1,
                            background: "#ebebeb",
                            borderRadius: "100%",
                        }}
                    >
                        <IconButton
                            aria-label="open"
                            href={entry.source_url}
                            target="_blank"
                        >
                            <OpenInNewIcon />
                        </IconButton>
                    </Box>
                </>
            )}
        </>
    );
}
