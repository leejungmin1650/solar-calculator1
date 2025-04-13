import React, { useState, useEffect } from 'react';

export function CalculatorForm({ onDataChange }) {
  const [form, setForm] = useState({
    capacity: 100,
    sunHour: 3.5,
    smp: 140,
    rec: 70,
    weight: 1.0,
    opex: 0,
    invest: 70000,
    loan: 150000,
    rate: 5.8,
    term: 10,
  });

  useEffect(() => {
    const { capacity, sunHour, smp, rec, weight, opex, invest, loan, rate, term } = form;
    const annualGen = capacity * sunHour * 365;
    const smpIncome = annualGen * smp;
    const recIncome = annualGen * rec * weight;
    const gross = smpIncome + recIncome;
    const repayment = (loan * (rate / 100) * Math.pow(1 + rate / 100, term)) / (Math.pow(1 + rate / 100, term) - 1);
    const net = gross - opex * 1000 - repayment * 1000;
    const data = [];

    let cumulative = 0;
    let breakEven = null;
    for (let i = 1; i <= term; i++) {
      cumulative += net;
      data.push({ year: i, netProfit: Math.round(net), cumulativeProfit: Math.round(cumulative) });
      if (breakEven === null && cumulative >= invest * 1000) breakEven = i;
    }

    onDataChange(data, breakEven);
  }, [form]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: parseFloat(value.replace(/,/g, '')) || 0 });
  };

  const fields = [
    ['설치용량 (kW)', 'capacity'],
    ['일일 발전시간 (h)', 'sunHour'],
    ['SMP 단가 (원/kWh)', 'smp'],
    ['REC 단가 (원/kWh)', 'rec'],
    ['REC 가중치', 'weight'],
    ['운영비용 (천 원)', 'opex'],
    ['투자금액 (천 원)', 'invest'],
    ['대출금 (천 원)', 'loan'],
    ['이자율 (%)', 'rate'],
    ['상환기간 (년)', 'term'],
  ];

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      {fields.map(([label, key]) => (
        <label key={key} className="flex flex-col text-white">
          {label}
          <input
            type="text"
            name={key}
            value={form[key].toLocaleString()}
            onChange={handle}
            className="mt-1 rounded-md px-3 py-2 bg-gray-800 text-white border border-gray-600"
          />
        </label>
      ))}
    </div>
  );
}