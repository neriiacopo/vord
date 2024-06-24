import { useEffect, useState } from "react";
import {
    Box,
    MenuItem,
    FormControl,
    Select,
    Chip,
    Unstable_Grid2 as Grid,
} from "@mui/material";

import { useStore } from "../../store/useStore";
import ContainerView from "../components/ContainerView";

import RegularScatterChart from "../components/RegularScatterChart";

export default function MetaSearch({ actionId }) {
    const color = useStore((state) => state.colors["filter"]);
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

    const values = actionsSettings.settings.values || [];
    const category = actionsSettings.settings.category || "";

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        const newValues = typeof value === "string" ? value.split(",") : value;
        setActionSettings(actionId, {
            ...actionsSettings.settings,
            values: newValues,
        });
        setDataHistory(
            actionId,
            data.filter((d) => {
                if (newValues.includes(d[category]) > 0) {
                    return d;
                }
            })
        );
    };

    const handleCategory = (event) => {
        const newCategory = event.target.value;
        setActionSettings(actionId, {
            ...actionsSettings.settings,
            category: newCategory,
            values: [],
        });
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
                    alignItems: "center",
                    px: 2,
                }}
            >
                <DoubleDropdown
                    data={data}
                    category={category}
                    handleCategory={handleCategory}
                    values={values}
                    handleChange={handleChange}
                />
            </ContainerView>

            <ContainerView
                vW={"80%"}
                sx={{ display: "flex", flexDirection: "row" }}
            >
                {category != "" && (
                    <RegularScatterChart
                        data={data}
                        category={category}
                        values={values}
                    />
                )}
            </ContainerView>
        </>
    );
}

function DoubleDropdown({
    data,
    category,
    handleCategory,
    values,
    handleChange,
}) {
    const info = [
        "artist_full_name",
        "collection_origins",
        "century",
        "general_type",
        "school",
    ];
    const uniqueValues = Array.from(
        new Set(data.map((entry) => entry[category]))
    );

    return (
        <>
            <FormControl
                fullWidth
                sx={{ pt: 2 }}
            >
                <Select
                    id="demo-simple-select"
                    sx={{
                        borderRadius: "20px 20px 0 0 ",
                    }}
                    value={category}
                    onChange={handleCategory}
                >
                    {info.map((cat, i) => (
                        <MenuItem
                            key={i}
                            value={cat}
                        >
                            {cat.replaceAll("_", " ")}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl
                fullWidth
                sx={{ pt: 0 }}
            >
                <Select
                    multiple
                    value={values}
                    onChange={handleChange}
                    sx={{
                        borderRadius: "0 0 20px 20px  ",
                    }}
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                />
                            ))}
                        </Box>
                    )}
                >
                    {uniqueValues.sort().map((v, i) => (
                        <MenuItem
                            key={i}
                            value={v}
                        >
                            {v}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
