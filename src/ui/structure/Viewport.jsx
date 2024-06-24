import { Box, Typography, Chip } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import theme from "../theme";

import { useStore } from "../../store/useStore";

import PickChoose from "../pages/PickChoose";
import CollectionSelection from "../components/CollectionSelection";
import ContainerView from "../components/ContainerView";
import MetaSearch from "../pages/MetaSearch";
import ColorWheel from "../pages/ColorWheel";

let background = "linear-gradient(45deg, #000000, #222222)";
// let background = "linear-gradient(45deg, rgb(240,240,240), rgb(220,220,220))";

export default function Viewport({ styleProps }) {
    const actionsHistory = useStore((state) => state.actionsHistory);
    const actionActive = useStore((state) => state.actionActive);

    const dbOn = useStore((state) => state.dbOn);

    return (
        <>
            {dbOn && <CollectionSelection />}
            {!dbOn && actionActive == 0 && (
                <ContainerView
                    parent={true}
                    vW={"100%"}
                    vH={"100%"}
                />
            )}
            {!dbOn &&
                actionsHistory.length > 0 &&
                ((actionsHistory[actionActive - 1].name == "pickChoose" && (
                    <PickChoose actionId={actionActive} />
                )) ||
                    (actionsHistory[actionActive - 1].name == "metaSearch" && (
                        <MetaSearch actionId={actionActive} />
                    )) ||
                    (actionsHistory[actionActive - 1].name == "colorWheel" && (
                        <ColorWheel actionId={actionActive} />
                    )))}

            {/* TO BE DEVELOPED PANEL */}
            {!dbOn &&
                actionsHistory.length > 0 &&
                actionsHistory[actionActive - 1].name != "pickChoose" &&
                actionsHistory[actionActive - 1].name != "metaSearch" &&
                actionsHistory[actionActive - 1].name != "colorWheel" && (
                    <ContainerView parent={false} />
                )}
        </>
    );
}
