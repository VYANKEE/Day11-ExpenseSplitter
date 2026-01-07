import React, { useState } from 'react';

function ExpenseForm({ people, onAddExpense }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [splitBetween, setSplitBetween] = useState([]);

  const handleToggleSplit = (personId) => {
    if (splitBetween.includes(personId)) {
      setSplitBetween(splitBetween.filter(id => id !== personId));
    } else {
      setSplitBetween([...splitBetween, personId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount || !paidBy || splitBetween.length === 0) {
      alert("Please fill all fields and select at least one person.");
      return;
    }
    onAddExpense({ desc, amount: parseFloat(amount), paidBy, splitBetween });
    setDesc(''); setAmount(''); setSplitBetween([]); 
  };

  return (
    <div className="card">
      <h2>📝 Add Expense</h2>
      {people.length < 2 ? (
        <p style={{color: 'var(--text-muted)'}}>Add at least 2 people first.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Description (e.g. Dinner)" 
            value={desc} onChange={(e) => setDesc(e.target.value)} 
          />
          <input 
            type="number" placeholder="Amount (₹)" 
            value={amount} onChange={(e) => setAmount(e.target.value)} 
          />
          
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
            <option value="">Who Paid?</option>
            {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <div style={{marginTop: '20px'}}>
            <label style={{color:'var(--text-muted)', marginBottom:'10px', display:'block'}}>Split Amongst:</label>
            
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {people.map(p => (
                // FIX: Added 'checkbox-item' class for alignment
                <div key={p.id} className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id={`checkbox-${p.id}`} // ID for linking label
                    checked={splitBetween.includes(p.id)}
                    onChange={() => handleToggleSplit(p.id)}
                  />
                  {/* htmlFor links the name click to the checkbox */}
                  <label htmlFor={`checkbox-${p.id}`}>{p.name}</label>
                </div>
              ))}
            </div>
            
            <button 
              type="button" className="secondary" style={{marginTop:'10px', padding:'8px'}}
              onClick={() => setSplitBetween(people.map(p => p.id))}
            >
              Select All People
            </button>
          </div>

          <button type="submit" style={{background: 'var(--accent)', marginTop:'20px'}}>Add This Expense</button>
        </form>
      )}
    </div>
  );
}

export default ExpenseForm;