const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let userBalance = 100;

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'player1' && password === 'password123') {
    return res.json({ status: 'success', message: 'Login successful', balance: userBalance });
  }
  res.json({ status: 'error', message: 'Invalid credentials' });
});

app.post('/bet', (req, res) => {
  const { betAmount } = req.body;
  if (betAmount > userBalance) {
    return res.json({ status: 'error', message: 'Insufficient funds' });
  }
  userBalance -= betAmount;
  const roll = Math.floor(Math.random() * 6) + 1;
  let result = `Lose! Dice rolled: ${roll}`;
  if (roll >= 4) {
    userBalance += betAmount * 2;
    result = `Win! Dice rolled: ${roll}`;
  }
  res.json({ status: 'success', bet_response: result, new_balance: userBalance });
});

app.listen(port, () => console.log(`Backend running on port ${port}`));
