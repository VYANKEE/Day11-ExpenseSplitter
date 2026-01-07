import React from 'react';

function BalanceSummary({ people, expenses }) {
  
  // 1. Calculate TOTAL TRIP EXPENSE
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Logic for Balances
  const calculateBalances = () => {
    const balances = {};
    people.forEach(p => balances[p.id] = 0);

    expenses.forEach(exp => {
      const payerId = parseInt(exp.paidBy);
      const amount = parseFloat(exp.amount);
      const splitIds = exp.splitBetween;
      
      const share = amount / splitIds.length;

      if (balances[payerId] !== undefined) balances[payerId] += amount;

      splitIds.forEach(id => {
        const memberId = parseInt(id);
        if (balances[memberId] !== undefined) balances[memberId] -= share;
      });
    });
    return balances;
  };

  const balances = calculateBalances();

  return (
    <>
      {/* NEW: TOTAL EXPENSE CARD */}
      <div className="card total-card">
        <h3 style={{color:'#a855f7', textTransform:'uppercase', letterSpacing:'2px'}}>Total Trip Expense</h3>
        <div className="big-amount">₹{totalExpense}</div>
        <p style={{color:'#94a3b8'}}>Total money spent by the group</p>
      </div>

      {/* BALANCE LIST */}
      <div className="card">
        <h2>📊 Net Balance</h2>
        {people.length === 0 ? (
          <p style={{color:'#666', textAlign:'center'}}>Add people to see calculation.</p>
        ) : (
          <div>
            {people.map(person => {
              const balance = balances[person.id] || 0;
              const roundedBalance = Math.round(balance * 100) / 100;
              
              if (Math.abs(roundedBalance) < 1) return null; // Hide if 0

              const isOwed = roundedBalance > 0;
              
              return (
                <div key={person.id} className="list-item">
                  <span style={{fontWeight:'500', fontSize:'1.1rem'}}>{person.name}</span>
                  <span className={`tag ${isOwed ? 'green' : 'red'}`}>
                    {isOwed ? 'Gets back' : 'Owes'} ₹{Math.abs(roundedBalance)}
                  </span>
                </div>
              );
            })}
             {Object.values(balances).every(b => Math.round(b) === 0) && expenses.length > 0 && (
                <p style={{textAlign:'center', color:'var(--green)', marginTop:'10px'}}>✅ All settled up!</p>
             )}
          </div>
        )}
      </div>
    </>
  );
}

export default BalanceSummary;