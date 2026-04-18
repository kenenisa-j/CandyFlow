export default function About({ expenses, sales, addExpense, addSale }) {
  return (
    <section>
      <h1>About</h1>
      <p>This app uses Vite, React, and React Router.</p>
      <p>
        Expense shape:{" "}
        {JSON.stringify({ id: "...", name: "...", amount: "...", date: "..." })}
      </p>
      <p>
        Sale shape:{" "}
        {JSON.stringify({
          id: "...",
          customerName: "...",
          quantity: "...",
          price: "...",
          total: "...",
          date: "...",
        })}
      </p>
    </section>
  );
}
