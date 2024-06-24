import {
    Box,
    Typography,
    ImageList,
    ImageListItem,
    IconButton,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useState, useRef, useEffect } from "react";

import { useStore } from "../../store/useStore";
import ContainerView from "../components/ContainerView";

import BarChartVertical from "../components/BarChartVertical";
import ColorChart from "../components/ColorChart";
let color;

export default function ColorWheel({ actionId }) {
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

    color = useStore((state) => state.colors["analyze"]);
    const vH = useStore((state) => state.vH);
    const [focus, setFocus] = useState(null);

    const handleHover = (id) => {
        setFocus(id);
    };

    useEffect(() => {
        setDataHistory(actionId, data);
    }, []);

    return (
        <>
            <ContainerView
                vW={"50%"}
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
                {focus != null && <BarChartVertical data={data[focus]} />}
            </ContainerView>

            <ContainerView
                vW={`${vH}px`}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    {/* <ColorChart colors={data.map((d) => d.dominant_color)} /> */}
                    <ColorChart
                        data={data}
                        handleHover={handleHover}
                    />
                </div>
            </ContainerView>
        </>
    );
}
