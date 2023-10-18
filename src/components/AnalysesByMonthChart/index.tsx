import React, { PureComponent, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export interface AnalysesByMonthChartInterface {
  data: Array<{ mes: string; entrada: number; saida: number }>;
}

export default class AnalysesByMonthChart extends PureComponent<AnalysesByMonthChartInterface> {
  static demoUrl = "https://codesandbox.io/s/simple-line-chart-kec3v";

  render() {
    const { data } = this.props;

    return (
      <LineChart
        width={400}
        height={200}
        data={data} // Use this.props.data
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" /> {/* Use "mes" instead of "name" if that's the data key */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="entrada"
          stroke="#8884d8"
        />
        <Line type="monotone" dataKey="saida" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
