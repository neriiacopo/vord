import { hexToHsv } from "../../utils";

import { Box } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

import { useStore } from "../../store/useStore";

let colors,
    classes = [];
export default function ColorChart({ data, handleHover = null }) {
    const chartRef = useRef(null);
    const padding = "50";

    const size = 600;
    const buffer = 50;
    const radius = size / 2;

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        let option;

        if (data) {
            const coords = [];
            const hexs = [];
            data.map((d) => {
                const [h, s, v] = hexToHsv(d.dominant_color);
                const angle = (h * Math.PI) / 180;
                const x = Math.cos(angle) * radius * (s / 100) + radius;
                const y = Math.sin(angle) * radius * (s / 100) + radius;
                coords.push([x, y]);
                hexs.push(d.dominant_color);
            });

            option = {
                tooltip: {
                    show: true,
                    formatter: (params) => {
                        const id = params.componentIndex;

                        handleHover(id);
                        let str = `<div
                                style="
                                    width: 200px;
                                    height: 200px;
                                    p: 10;
                                    display: flex;
                                    justify-content: center;
                                    align-ttems: center;
                                    position: relative;
                                    background-color: white;"
                            >
                            <img src= ${data[id]["image_url"]}
                                   style="
                                   max-width: 100%;
                                   max-height: 100%;
                                   object-fit: contain;
                                   loading:lazy"
                                   ></img>
                            </div>`;

                        for (const layer of [
                            "artwork_name",
                            "artist_full_name",
                        ]) {
                            str += `${layer.replaceAll("_", " ")}: <br>${
                                data[params.dataIndex][layer]
                            }<br>`;
                        }
                        return str;
                    },
                },

                xAxis: {
                    axisTick: {
                        show: false,
                    },
                    type: "value",
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "value",
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
                grid: {
                    top: padding,
                    bottom: padding,
                    left: padding,
                    right: padding,
                },

                color: hexs,

                series: coords.map((coord, index) => ({
                    type: "scatter",
                    symbolSize: 3,
                    emphasis: {
                        label: {
                            show: false,
                        },
                        focus: "series",
                    },
                    data: [coord],
                    itemStyle: {
                        color: "black",
                        // color: hexs[index],
                    },
                })),
            };

            option && myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [data]);

    return (
        <>
            <div
                ref={chartRef}
                width={size}
                height={size}
                style={{
                    zIndex: 3,
                    position: "absolute",
                    left: `${-size / 2}px`,
                    top: `${-size / 2}px`,
                    background: "transparent",
                    width: size,
                    height: size,
                }}
            />

            <div
                style={{
                    zIndex: 0,
                    position: "absolute",
                    left: `${-size / 2}px`,
                    top: `${-size / 2}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: "100%",
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                <img
                    src={"./public/colorWheel.jpg"}
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        pointerEvents: "none",
                    }}
                />
            </div>
            <Compass
                size={size}
                buffer={buffer}
            />
        </>
    );
}

const Compass = ({ size, buffer }) => {
    const radius = (size + buffer) / 2;

    return (
        <svg
            width={size + buffer}
            height={size + buffer}
            style={{
                position: "absolute",
                left: `${-radius}px`,
                top: `${-radius}px`,
                zIndex: 0,
                cursor: "pointer",
            }}
        >
            <circle
                cx={radius}
                cy={radius}
                r={(size + buffer) / 2}
                fill="none"
                stroke="#ebebeb"
                strokeWidth={2}
                strokeDasharray="2, 2"
            />
        </svg>
    );
};
