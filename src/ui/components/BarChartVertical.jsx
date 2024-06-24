import { sortParallellyArr } from "../../utils.js";
import React, { useRef, useLayoutEffect } from "react";
import * as echarts from "echarts";

export default function BarChartVertical({ data = null }) {
    const chartRef = useRef(null);
    const padding = "100";

    useLayoutEffect(() => {
        function init() {
            if (!data || !chartRef.current) return;

            const myChart = echarts.init(chartRef.current);

            // Process data
            let colors = data["color_palette"]
                .split(";")
                .map((color) => color.trim().replaceAll("'", ""));
            let counts = data["palette_count"]
                .split(";")
                .map((count) => parseInt(count.trim().replaceAll("'", "")));

            // Sort order
            [counts, colors] = sortParallellyArr(counts, colors);

            // Create series
            const series = colors.map((color, index) => ({
                name: color,
                type: "bar",

                emphasis: {
                    label: {
                        show: false,
                    },
                    focus: "series",
                },
                data: [
                    (counts[index] / counts.reduce((acc, a) => acc + a)) * 100,
                ],
                itemStyle: {
                    color: color,
                },
            }));

            const option = {
                legend: { show: false },
                tooltip: {
                    show: true,
                    formatter: (params) => {
                        return Math.round(params.value * 100) / 100 + "%";
                    },
                },
                grid: {
                    top: padding,
                    bottom: padding,
                    left: padding,
                    right: padding,
                },
                xAxis: {
                    type: "category",
                    show: false,
                },
                yAxis: {
                    min: 0,
                    // max: 100,
                    type: "value",
                    show: true,
                    axisLabel: {
                        formatter: (params) => {
                            return params + "%";
                        },
                    },
                },
                series: series,
            };

            // Set chart option
            myChart.setOption(option);

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
    }, [data]);

    return (
        <div
            ref={chartRef}
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
}
