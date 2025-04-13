import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

export function ProfitChart({ data, breakEvenYear }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-400 mt-4">수익 그래프를 계산 중입니다...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="year" stroke="#ccc" />
        <YAxis tickFormatter={(v) => (v / 1000000) + 'M'} stroke="#ccc" />
        <Tooltip formatter={(v) => `${v.toLocaleString()} 원`} />
        <Line type="monotone" dataKey="netProfit" name="연간 순이익" stroke="#00e0ff" />
        <Line type="monotone" dataKey="cumulativeProfit" name="누적 수익" stroke="#8884d8" />
        {breakEvenYear && <ReferenceLine x={breakEvenYear} label="손익분기점" stroke="red" />}
      </LineChart>
    </ResponsiveContainer>
  );
}