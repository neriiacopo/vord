import { randomColors } from "../../utils";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import * as echarts from "echarts";
import { useStore } from "../../store/useStore";

// let colors,
//     classes = [];
export default function RegularScatterChart({
    data = null,
    category = null,
    values = [],
}) {
    const chartRef = useRef(null);
    const padding = "50";
    const [colors, setColors] = useState(null);
    const [classes, setClasses] = useState(null);

    useLayoutEffect(() => {
        if (data || category) {
            const classes = Array.from(
                new Set(data.map((entry) => entry[category]))
            );
            const colors = randomColors(classes.length);
            setColors(colors);
            setClasses(classes);
        }
    }, [, category]);

    useEffect(() => {
        function init() {
            if (!data || !category || !classes || !chartRef.current) return;

            const chartDom = chartRef.current;
            const myChart = echarts.init(chartDom);

            // Get resolution grid
            const { width, height } = chartRef.current.getBoundingClientRect();
            const res = (width * height) / data.length;
            const dims = {
                x: Math.ceil(width / Math.sqrt(res)),
                y: Math.ceil(height / Math.sqrt(res)),
            };

            // Generate datagroup
            const dataGroup = [];
            for (let i = 0; i < classes.length; i++) {
                const cat = classes[i];
                data.map((d, j) => {
                    if (d[category] == cat) {
                        dataGroup.push(d);
                    }
                });
            }

            dataGroup.map(
                (d, index) =>
                    (d.coords = [index % dims.x, Math.floor(index / dims.x)])
            );

            let option = {
                tooltip: {
                    show: true,
                    formatter: (params) => {
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
                            <img src= ${
                                dataGroup[params.dataIndex]["image_url"]
                            }
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
                                dataGroup[params.dataIndex][layer]
                            }<br>`;
                        }
                        return str;
                    },
                    focus: "series",
                },
                xAxis: {
                    min: 0,
                    max: dims.x - 1,
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                },
                yAxis: {
                    min: 0,
                    max: dims.y - 1,
                    axisLabel: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
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

                series: classes.map((c, index) => {
                    return {
                        name: c,
                        type: "scatter",
                        symbolSize: res / 100,

                        itemStyle:
                            values.length === 0
                                ? {
                                      color: colors[index],
                                      borderWidth: 1,
                                      borderColor: colors[index],
                                      opacity: 1,
                                  }
                                : {
                                      color: colors[index],
                                      opacity: !values.includes(c) ? 0.2 : 1,
                                      borderWidth: 1,
                                      borderColor: colors[index],
                                  },
                        data: dataGroup.map((d) => {
                            if (d[category] === c) {
                                return d["coords"];
                            }
                        }),
                    };
                }),
            };

            option && myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }

        init();

        // Cleanup
        return () => {
            if (chartRef.current) {
                echarts.dispose(chartRef.current);
            }
        };
    }, [data, colors, values]);

    return (
        <div
            ref={chartRef}
            style={{ width: "100%", height: "100%" }}
        />
    );
}
