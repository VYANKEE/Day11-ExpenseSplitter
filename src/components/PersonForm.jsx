import React, { useState } from 'react';

function PersonForm({ onAddPerson }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPerson(name);
    setName('');
  };

  return (
    <div className="card">
      <h2>1. Add Friends</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Enter name (e.g. Alice)" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" style={{ width: 'auto' }}>Add</button>
      </form>
    </div>
  );
}

export default PersonForm;