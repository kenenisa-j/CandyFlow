export const useBusinessLogic = (expenses, sales, attendance, production) => {
  const isToday = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    return date.toDateString() === now.toDateString();
  };

  const stats = {
    totalExpensesToday: expenses
      .filter((item) => isToday(item.date))
      .reduce((sum, item) => sum + Number(item.amount || 0), 0),

    totalSalesToday: sales
      .filter((item) => isToday(item.date))
      .reduce((sum, item) => sum + Number(item.total || 0), 0),

    attendanceCount: attendance.filter(
      (record) => isToday(record.date) && record.status === "present",
    ).length,

    productionCount: production
      .filter((item) => isToday(item.date))
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0),
  };

  stats.profitToday = stats.totalSalesToday - stats.totalExpensesToday;

  const activities = [
    ...expenses.map((i) => ({
      ...i,
      type: "Expense",
      desc: i.name,
      icon: "💸",
    })),
    ...sales.map((i) => ({
      ...i,
      type: "Sale",
      desc: i.customerName,
      icon: "💰",
    })),
    ...production.map((i) => ({
      ...i,
      type: "Production",
      desc: i.productName,
      icon: "🏭",
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return { stats, activities };
};
