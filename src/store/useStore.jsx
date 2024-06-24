import { create } from "zustand";

import FilterListIcon from "@mui/icons-material/FilterList";
import AnalyzeIcon from "@mui/icons-material/Assessment";
import InspectIcon from "@mui/icons-material/Search";

import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PinIcon from "@mui/icons-material/Pin";
import PieChartIcon from "@mui/icons-material/PieChart";
import TuneIcon from "@mui/icons-material/Tune";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GridIcon from "@mui/icons-material/Apps";
import SelectIcon from "@mui/icons-material/Done";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ShowChartIcon from "@mui/icons-material/ShowChart";

const colors = {
    inspect: "#F8AC4F",
    filter: "#5EBDFF",
    analyze: "#E943A4",
};

export let useStore = create((set, get) => ({
    actionsHistory: [],
    actionsSettings: {},
    dataHistory: {},

    actionActive: false,
    dbOn: false,

    colors: colors,

    info: [
        "artwork_name",
        "artist_full_name",
        "source_url",

        "collection_origins",
        "century",
        "creation_year",
        "general_type",
        "school",
    ],

    actionBtns: {
        icon: <></>,
        btns: [
            {
                name: "inspect",
                icon: <VisibilityIcon />,
                color: colors["inspect"],

                btns: [
                    {
                        name: "pickChoose",
                        icon: <SelectIcon />,
                        color: colors["inspect"],
                        fn: <></>,
                    },
                    {
                        name: "download",
                        icon: <DownloadIcon />,
                        color: colors["inspect"],
                        fn: <></>,
                    },
                ],
            },
            {
                name: "filter",
                icon: <FilterListIcon />,
                color: colors["filter"],
                btns: [
                    {
                        name: "metaSearch",
                        icon: <TuneIcon />,
                        color: colors["filter"],
                        fn: <></>,
                    },
                    {
                        name: "timeRange",
                        icon: <AccessTimeIcon />,
                        color: colors["filter"],
                        fn: <></>,
                    },
                    {
                        name: "semanticSearch",
                        icon: <FormatShapesIcon />,
                        color: colors["filter"],
                        fn: <></>,
                    },
                ],
            },
            {
                name: "analyze",
                icon: <AnalyzeIcon />,
                color: colors["analyze"],

                btns: [
                    {
                        name: "colorWheel",
                        icon: <ColorLensIcon />,
                        color: colors["analyze"],
                        fn: <></>,
                    },
                    {
                        name: "tsne",
                        icon: <BubbleChartIcon />,
                        color: colors["analyze"],
                        fn: <></>,
                    },
                    {
                        name: "umap",
                        icon: <GridIcon />,
                        color: colors["analyze"],
                        fn: <></>,
                    },
                    {
                        name: "piechart",
                        icon: <PieChartIcon />,
                        color: colors["analyze"],
                        fn: <></>,
                    },
                    {
                        name: "sort",
                        icon: <ShowChartIcon />,
                        color: colors["analyze"],
                        fn: <></>,
                    },
                ],
            },
        ],
    },

    addBtn: (btn) => {
        const currentHistory = get().actionsHistory || [];
        const newHistory = [...currentHistory, btn];
        const id = newHistory.length; // Generate a unique ID for the new action

        set((state) => ({
            dbOn: false,
            actionsHistory: newHistory,
            actionsSettings: {
                ...state.actionsSettings,
                [id]: { ...btn, settings: {} }, // Initialize settings for the new action
            },
            dataHistory: {
                ...state.dataHistory,
                [id]: [], // Initialize settings for the new action
            },
            actionActive: newHistory.length,
        }));
    },

    setActionSettings: (id, settings) => {
        set((state) => ({
            actionsSettings: {
                ...state.actionsSettings,
                [id]: { ...state.actionsSettings[id], settings },
            },
        }));
    },

    setDataHistory: (id, data) => {
        set((state) => ({
            dataHistory: {
                ...state.dataHistory,
                [id]: data,
            },
        }));
    },

    setActive: (id) => {
        set(() => ({
            actionActive: id,
        }));
    },
}));
