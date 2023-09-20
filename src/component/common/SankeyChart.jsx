import React, { useRef, useEffect, useState } from 'react';
import * as echarts from "echarts";
import dummyData from "../../content/dummy.json";

const SankeyChart = () => {
    const chartRef = useRef(null);
    const [data, setData] = useState(dummyData);

    const [options, setOptions] = useState({
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
              type: 'sankey',
              data: data.nodes,
              links: data.links,
              emphasis: {
                focus: 'adjacency'
              },
              levels: [
                {
                  depth: 0,
                  itemStyle: {
                    color: '#fbb4ae'
                  },
                  lineStyle: {
                    color: 'source',
                    opacity: 0.6
                  }
                },
                {
                  depth: 1,
                  itemStyle: {
                    color: '#b3cde3'
                  },
                  lineStyle: {
                    color: 'source',
                    opacity: 0.6
                  }
                },
                {
                  depth: 2,
                  itemStyle: {
                    color: '#ccebc5'
                  },
                  lineStyle: {
                    color: 'source',
                    opacity: 0.6
                  }
                },
                {
                  depth: 3,
                  itemStyle: {
                    color: '#decbe4'
                  },
                  lineStyle: {
                    color: 'source',
                    opacity: 0.6
                  }
                }
              ],
              lineStyle: {
                curveness: 0.5
              }
            }
          ]
    });


    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            chart.setOption(options);

            window.addEventListener('resize', () => {
                chart.resize();
            })
        }
        
    }, [options, chartRef]);

    return (
        <>
          <div
              ref={chartRef}
              style={{
                  width: "100%",
                  height: "100%",
              }}
          />
        </>
    )
}

export default SankeyChart;