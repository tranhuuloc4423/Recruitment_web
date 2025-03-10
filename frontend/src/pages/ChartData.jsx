import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import React from 'react'

const ChartData = () => {
    const data = [
        { name: 'Tháng 1', value: 400 },
        { name: 'Tháng 2', value: 300 },
        { name: 'Tháng 3', value: 500 },
      ];
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
}

export default ChartData
