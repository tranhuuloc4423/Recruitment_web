import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import React from 'react'
import { Nav } from '../components';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { chartNav } from '../utils/nav';
const ChartData = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const { currentRole, loading } = useSelector((state) => state.app)
      return (
        <div className="flex flex-col gap-4">
      {currentUser.role === 'admin' && <Nav data={chartNav} />}
      <div className="flex flex-row gap-4">
        <Outlet />
      </div>
    </div>
      );
}

export default ChartData
