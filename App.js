import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'player1', password: 'password123' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setBalance(data.balance);
        else setMessage(data.message);
      });
  }, []);

  const handleBet = amount => {
    fetch(`${API_URL}/bet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ betAmount: amount })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setBalance(data.new_balance);
          setMessage(data.bet_response);
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="App">
      <header>
        <h1>Aajad Casino</h1>
      </header>
      <main>
        <p>Balance: ${balance}</p>
        <button onClick={() => handleBet(10)}>Bet $10</button>
        <button onClick={() => handleBet(20)}>Bet $20</button>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
}

export default App;
