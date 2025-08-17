import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getWeeklyProgress } from '../utils/dateUtils';
import { Habit } from '../types';

interface WeeklyProgressProps {
  habits: Habit[];
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ habits }) => {
  const progressData = getWeeklyProgress(habits);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">
            {data.completed} of {data.total} habits completed
          </p>
          <p className="text-gray-600">{data.percentage}% completion</p>
        </div>
      );
    }
    return null;
  };

  if (habits.length === 0) {
    return (
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Progress</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Add some habits to see your weekly progress!
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Progress</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              className="text-sm fill-gray-600"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-sm fill-gray-600"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="percentage" 
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-center">
        {progressData.map((day, index) => (
          <div key={day.day} className="text-xs">
            <div className="text-gray-500 mb-1">{day.day}</div>
            <div className="font-semibold text-gray-800">{day.percentage}%</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeeklyProgress;