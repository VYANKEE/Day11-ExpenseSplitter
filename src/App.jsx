import React, { useState, useEffect } from 'react';
import { Users, Receipt, Calculator, Trash2 } from 'lucide-react'; // Icons import
import './index.css';

// Components
import PersonForm from './components/PersonForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSummary from './components/BalanceSummary';

function App() {
  // --- STATE MANAGEMENT ---
  const [people, setPeople] = useState(() => {
    try {
      const saved = localStorage.getItem('splitwise_people');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('splitwise_expenses');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('splitwise_people', JSON.stringify(people));
    localStorage.setItem('splitwise_expenses', JSON.stringify(expenses));
  }, [people, expenses]);

  const addPerson = (name) => {
    setPeople([...people, { id: Date.now(), name }]);
  };

  const addExpense = (expenseData) => {
    setExpenses([{ id: Date.now(), ...expenseData }, ...expenses]);
  };

  const resetAll = () => {
    if(confirm("Are you sure? This will delete all data.")) {
      setPeople([]);
      setExpenses([]);
      localStorage.clear();
    }
  };

  const scrollToApp = () => {
    document.getElementById('app-dashboard').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* SECTION 1: HERO */}
      <section className="hero">
        <h1>Split Bills, <br /> Not Friendships.</h1>
        <p>The easiest way to track shared expenses for trips, housemates, and parties. Keep track of who owes whom instantly.</p>
        <button className="cta-btn" onClick={scrollToApp}>Start Splitting Now ↓</button>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="guide-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-grid">
          
          <div className="step-card">
            <div className="icon-box"><Users size={30} /></div>
            <h3>1. Add Friends</h3>
            <p style={{color:'#94a3b8'}}>Create a group by adding names of all your friends involved in the trip.</p>
          </div>

          <div className="step-card">
            <div className="icon-box"><Receipt size={30} /></div>
            <h3>2. Add Expenses</h3>
            <p style={{color:'#94a3b8'}}>Enter the amount, who paid it, and who it was for (all or specific people).</p>
          </div>

          <div className="step-card">
            <div className="icon-box"><Calculator size={30} /></div>
            <h3>3. Auto-Calculate</h3>
            <p style={{color:'#94a3b8'}}>Our smart algorithm instantly tells you who owes whom. No math needed!</p>
          </div>

        </div>
      </section>

      {/* SECTION 3: THE DASHBOARD (MAIN APP) */}
      <div id="app-dashboard" className="dashboard-section">
        <div className="container">
          
          {/* Top: Balances & Total */}
          <BalanceSummary people={people} expenses={expenses} />
          
          {/* Middle: Forms */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <PersonForm onAddPerson={addPerson} />
            <ExpenseForm people={people} onAddExpense={addExpense} />
          </div>

          {/* Bottom: History */}
          <div style={{marginTop: '20px'}}>
             <ExpenseList expenses={expenses} people={people} />
          </div>

          {/* Reset Button */}
          <button onClick={resetAll} className="secondary" style={{marginBottom: '50px', color: '#f43f5e', borderColor: '#f43f5e'}}>
            <Trash2 size={16} style={{marginRight:'8px', verticalAlign:'middle'}}/>
            Reset & Clear All Data
          </button>
          
          <footer style={{textAlign:'center', color:'#555', marginTop:'40px'}}>
            Splitter App © 2026 • Frontend Challenge Day 11
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;