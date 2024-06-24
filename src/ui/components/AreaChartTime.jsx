import { strToDate, aggregateTime, hoursChunkMid } from "../../utils.js";

import { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { useStore } from "../../store/useStore";

export default function AreaChartTime({ data }) {
    const chartRef = useRef(null);
    const padding = "50";

    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        let option;

        if (data) {
            option = {
                tooltip: {
                    trigger: "axis",
                    position: function (pt) {
                        return [pt[0], "5%"];
                    },
                },
                xAxis: {
                    type: "category",
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(0, 0, 0, 0.1)",
                        },
                    },
                    axisLabel: {
                        show: true,
                        formatter: (params) => {
                            const date = new Date(params);
                            const str =
                                date.getHours() + ":" + date.getMinutes();
                            return str;
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    // boundaryGap: [0, 1],
                    // min: 0,
                    // max: 300,
                    // axisLabel: {
                    //     interval: 2500,
                    // },
                    // splitLine: {
                    //     show: true,
                    //     lineStyle: {
                    //         color: "rgba(0, 0, 0, 0.5)",
                    //     },
                    // },
                },
                grid: {
                    top: padding,
                    bottom: padding,
                    left: padding,
                    right: padding,
                },

                series: data[""].map((cat, index) => {
                    return {
                        name: cat,
                        type: "line",
                        symbol: "none",
                        sampling: "lttb",
                        smooth: true,
                        itemStyle: {
                            color: colors[index],
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: colors[index],
                                    },
                                    {
                                        offset: 1,
                                        color: "white",
                                    },
                                ]
                            ),
                        },
                        data: counts.map((count) => count[cat]),
                    };
                }),
            };

            option && myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [counts]);

    return (
        <div
            ref={chartRef}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
