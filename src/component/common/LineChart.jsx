// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

const data = [
    {
      "id": "co2eq",
      "color": "hsl(82, 70%, 50%)",
      "data": [
        {
          "x": "EK808",
          "y": 413000
        },
        {
          "x": "EK302",
          "y": 258000
        },
        {
          "x": "INS-303",
          "y": 812220
        },
        {
          "x": "CDE-302",
          "y": 993220
        },
        {
          "x": "ADE-301",
          "y": 394100
        },
        {
          "x": "BDE-401",
          "y": 330000
        },
        {
          "x": "EK303",
          "y": 383900
        }
      ]
    },
    {
        "id": "μSv",
        "color": "hsl(112, 70%, 50%)",
        "data": [
          {
            "x": "EK808",
            "y": 213000
          },
          {
            "x": "EK302",
            "y": 125000
          },
          {
            "x": "INS-303",
            "y": 406220
          },
          {
            "x": "CDE-302",
            "y": 493220
          },
          {
            "x": "ADE-301",
            "y": 194100
          },
          {
            "x": "BDE-401",
            "y": 160000
          },
          {
            "x": "EK303",
            "y": 193900
          }
        ]
      }
  ]
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => (
    <ResponsiveLine
        data={data}
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
)

export default MyResponsiveLine;