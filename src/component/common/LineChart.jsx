// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => {
  const subChartData = [];
  const chartData = [];

  useEffect(() => {
        axios.post("/product/chart",{
            id: sessionStorage.getItem("productId")
        }).then((response) => {
          console.log(response.data["rsltList"]);
          if(response.data["rsltList"] !== null && response.data["rsltList"].length > 0){
            for(let i=0;i<response.data["rsltList"].length;i++){
                const itemData = {
                    "x": response.data["rsltList"][i].name
                  , "y": response.data["rsltList"][i].co2eq  

                }
                subChartData.push(itemData);
            }
            console.log("subChartData :::::::::" + subChartData);
            const tItemData = {
              "id" : "co2eq"
              ,"color": "hsl(82, 70%, 50%)"
              ,"data" : subChartData
            }
            console.log("Line True Data ::::::::::::" + tItemData);
            chartData.push(tItemData);
          }
          console.log("Line Chart Data :::::::::::" + chartData[0].data[0].x);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
      <>
      <ResponsiveLine
          data={chartData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'component',
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />
    </>
    )
}

export default MyResponsiveLine;