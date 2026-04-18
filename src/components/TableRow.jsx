export default function TableRow({ transaction }) {
  return (
    <tr>
      <td>{transaction.type}</td>
      <td>{transaction.label}</td>
      <td>${transaction.amount.toFixed(2)}</td>
      <td>{transaction.date}</td>
    </tr>
  );
}
