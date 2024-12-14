'use client'

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {

  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded shadow-md">
        <p className="text-black font-bold mb-2">Day {label}</p>
        {payload.map((entry, index) => {
          if (entry.value !== null) {
            if (entry.dataKey === 'measured') {
              return (
                <p key={index} style={{ color: entry.color }}>
                  Measured: {entry.value.toFixed(3)} mm/year
                </p>
              );
            }
            if (entry.dataKey === 'predicted') {
              const dataPoint = payload[0].payload;
              return (
                <div key={index}>
                  <p style={{ color: entry.color }}>
                    Predicted: {entry.value.toFixed(3)} mm/year
                  </p>
                  {dataPoint.upperBound && (
                    <p style={{ color: entry.color }}>
                      Upper Bound: {dataPoint.upperBound.toFixed(3)} mm/year
                    </p>
                  )}
                  {dataPoint.lowerBound && (
                    <p style={{ color: entry.color }}>
                      Lower Bound: {dataPoint.lowerBound.toFixed(3)} mm/year
                    </p>
                  )}
                </div>
              );
            }
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};
const CorrosionGraph = ({ measuredData, predictedData }) => {
  
  const [isMounted, setIsMounted] = useState(false);
  const [threshold, setThreshold] = useState(0.4);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  // Get the last measured point
  const lastMeasured = measuredData[measuredData.length - 1];

  const total_size = Object.keys(predictedData).length
  
  // Create a continuous dataset
  const combinedData = [
    ...measuredData.map(point => ({
      day: point.day,
      measured: point.rate,
      predicted: null
    })),
    {
      day: lastMeasured.day,
      measured: lastMeasured.rate,
      predicted: lastMeasured.rate,
    },
    ...predictedData.map(point => ({
      day: point.day,
      measured: null,
      predicted: point.rate,
      upperBound: point.upperBound,
      lowerBound: point.lowerBound
    }))
  ];

  return (
    <div className='w-full flex justify-center flex-col items-center '>
      <div className='w-full justify-center flex items-center flex-row gap-10'>
        <label className=' text-black text-2xl'>Threshold (mm/year): </label>
        <input
          type="number"
          step="0.1"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className='text-xl text-black'
        />
      </div>
      
      {predictedData.some(item => item.rate > threshold) && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Warning: Predicted corrosion rate exceeds threshold!
        </div>
      )}

      <LineChart
        width={800}
        height={400}
        data={combinedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        className='rounded-xl border-2 border-gray p-2'
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="day" 
          label={{ value: 'Time (days)', position: 'bottom' }}
          type="number"
          domain={[1, total_size]}
          ticks={[1, 2, 3, 4, 5, 6]}
          
        />
        <YAxis 
          label={{ value: 'Corrosion Rate (mm/year)', angle: -90, position: 'insideLeft' }}
          domain={[0, 0.6]}
        />
        <Tooltip content={<CustomTooltip/>} />

        
        <ReferenceLine 
          y={threshold} 
          stroke="red" 
          strokeDasharray="3 3" 
          label="Threshold"
        />

        <Line
          type="monotone"
          dataKey="measured"
          name="Measured"
          stroke="#2196F3"
          dot={{ fill: '#2196F3' }}
          strokeWidth={2}
          connectNulls={true}
        />
        
        <Line
          type="monotone"
          dataKey="predicted"
          name="Predicted"
          stroke="#FF9800"
          strokeDasharray="5 5"
          dot={{ fill: '#fff', stroke: '#FF9800' }}
          connectNulls={true}
        />
      </LineChart>
    </div>
  );
};

export default CorrosionGraph;
