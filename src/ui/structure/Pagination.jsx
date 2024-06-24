import { Box, Tooltip, Chip } from "@mui/material";
import theme from "../theme";

import { useStore } from "../../store/useStore";

import CircleIcon from "@mui/icons-material/Circle";

export default function Pagination({ styleProps }) {
    const actionsHistory = useStore((state) => state.actionsHistory);

    const actionId = useStore((state) => state.actionActive);
    const dataPre = useStore(
        (state) => state.dataHistory[actionId - 1] || state.data || []
    );
    const dataPost = useStore((state) => state.dataHistory[actionId] || []);

    console.log(dataPre, dataPost);
    return (
        <>
            <Box
                sx={{
                    ...styleProps.btnS,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "33%",
                    bgcolor: "transparent",
                    borderWidth: "1px",
                    // border: "none",
                }}
            >
                {actionsHistory.map((action, i) => (
                    <Tooltip
                        title={action.name}
                        placement="top"
                    >
                        <Box
                            key={i}
                            sx={{
                                height: "100%",
                                // width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0px 20px",
                            }}
                        >
                            <CircleIcon
                                sx={{ fontSize: "10px", color: action.color }}
                            />
                        </Box>
                    </Tooltip>
                ))}
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    right: 40,
                }}
            >
                <Chip
                    label={`filtering ${dataPost.length} entries from ${dataPre.length}`}
                />
            </Box>
        </>
    );
}
