import React, {PureComponent} from 'react';
import {RadialBarChart, RadialBar, Legend, ResponsiveContainer} from 'recharts';

const colors = [
    '#6C5DD3',
    '#87E344',
    '#D822E3',
    '#17E3B9',
    '#F4A74B',
    '#F45252'
]

const data = [
    {
        name: 'Academia',
        amount: 269.69,
        fill: '#D822E3'
    }, {
        name: 'Outros',
        amount: 185.69,
        fill: '#17E3B9'

    }, {
        name: 'Comida',
        amount: 391.47,
        fill: '#87E344'
    },
];

const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px'
};

export default class ExpensesByCategoryChart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/simple-radial-bar-chart-qf8fz';

    render() {
        return (
            <ResponsiveContainer width={'100%'}
                height={200}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%"
                    barSize={10}
                    data={data}>
                    <RadialBar minAngle={15}
                        background
                        clockWise
                        dataKey="amount"/>
                    <Legend iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}/>
                </RadialBarChart>
            </ResponsiveContainer>

        );
    }
}
