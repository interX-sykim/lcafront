import { ResponsiveStream } from '@nivo/stream';

const MyResponsiveStream = ({}) => (
    <ResponsiveStream
        data={
            [
                {
                  "Raoul": 107,
                  "Josiane": 56,
                  "Marcel": 23,
                  "René": 73,
                  "Paul": 182,
                  "Jacques": 164
                },
                {
                  "Raoul": 187,
                  "Josiane": 124,
                  "Marcel": 162,
                  "René": 37,
                  "Paul": 170,
                  "Jacques": 126
                },
                {
                  "Raoul": 199,
                  "Josiane": 41,
                  "Marcel": 155,
                  "René": 166,
                  "Paul": 54,
                  "Jacques": 95
                },
                {
                  "Raoul": 90,
                  "Josiane": 11,
                  "Marcel": 87,
                  "René": 58,
                  "Paul": 39,
                  "Jacques": 193
                },
                {
                  "Raoul": 169,
                  "Josiane": 56,
                  "Marcel": 85,
                  "René": 192,
                  "Paul": 200,
                  "Jacques": 177
                },
                {
                  "Raoul": 107,
                  "Josiane": 95,
                  "Marcel": 33,
                  "René": 66,
                  "Paul": 137,
                  "Jacques": 98
                },
                {
                  "Raoul": 160,
                  "Josiane": 117,
                  "Marcel": 56,
                  "René": 90,
                  "Paul": 87,
                  "Jacques": 25
                },
                {
                  "Raoul": 30,
                  "Josiane": 147,
                  "Marcel": 177,
                  "René": 74,
                  "Paul": 35,
                  "Jacques": 167
                },
                {
                  "Raoul": 43,
                  "Josiane": 166,
                  "Marcel": 200,
                  "René": 172,
                  "Paul": 67,
                  "Jacques": 61
                }
              ]
        }
        keys={[
            'Raoul',
            'Josiane',
            'Marcel',
            'René',
            'Paul',
            'Jacques'
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40
        }}
        enableGridX={true}
        enableGridY={false}
        offsetType="silhouette"
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#2c998f',
                size: 4,
                padding: 2,
                stagger: true
            },
            {
                id: 'squares',
                type: 'patternSquares',
                background: 'inherit',
                color: '#e4c912',
                size: 6,
                padding: 2,
                stagger: true
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Paul'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Marcel'
                },
                id: 'squares'
            }
        ]}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.7
                ]
            ]
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                translateX: 100,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsiveStream;