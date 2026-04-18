import React from "react";

export default function MonthSelector({ currentMonth, setCurrentMonth }) {
  // Logic: Generate a list of months for the user to pick from
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="month-picker-container">
      <label className="cyber-label">Reporting Period</label>
      <select
        value={currentMonth}
        onChange={(e) => setCurrentMonth(e.target.value)}
        className="cyber-select"
      >
        {months.map((m) => (
          <option key={m} value={`${m} ${currentYear}`}>
            {m} {currentYear}
          </option>
        ))}
      </select>
    </div>
  );
}
