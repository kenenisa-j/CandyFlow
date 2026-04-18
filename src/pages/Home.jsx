export default function Home({ expenses, sales, addExpense, addSale }) {
  return (
    <section>
      <h1>Home</h1>
      <p>Welcome to the Candy React app.</p>
      <p>Expenses: {expenses.length}</p>
      <p>Sales: {sales.length}</p>
    </section>
  );
}
