import React from 'react';

function ExpenseList({ expenses, people }) {
  // Helper to get name by ID
  const getName = (id) => people.find(p => p.id === parseInt(id))?.name || 'Unknown';

  return (
    <div className="card">
      <h2>History</h2>
      {expenses.length === 0 ? (
        <p style={{color:'#aaa', textAlign:'center'}}>No expenses yet.</p>
      ) : (
        <div>
          {expenses.map(exp => (
            <div key={exp.id} className="list-item">
              <div>
                <p style={{fontWeight:'bold'}}>{exp.desc}</p>
                <p style={{fontSize:'0.8rem', color:'#aaa'}}>
                  Paid by <span style={{color:'var(--primary)'}}>{getName(exp.paidBy)}</span>
                </p>
              </div>
              <div className="amount">₹{exp.amount}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;