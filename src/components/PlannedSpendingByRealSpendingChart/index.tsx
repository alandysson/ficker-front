import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    planned: 590,
    real: 800,
  },
  {
    name: 'Fev',
    planned: 790,
    real: 670,
  },
  {
    name: 'Mar',
    planned: 990,
    real: 700,
  },
  {
    name: 'Abr',
    planned: 590,
    real: 800,
  },
];

export default class PlannedSpendingByRealSpendingChart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/composed-chart-with-axis-label-55s1s';

  render() {
    return (
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" label={{ value: 'Mês', position: 'insideBottomRight', offset: 0 }} scale="band" />
          <YAxis label={{ value: 'Valor', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="planned" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="real" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
