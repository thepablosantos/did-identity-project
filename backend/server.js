require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sessões em memória
const sessions = {};

app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// Cria/atualiza uma sessão para o endereço da carteira
app.post('/session', (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ error: 'No address provided' });
  }

  // Guarda a sessão em memória
  sessions[address] = {
    address,
    createdAt: Date.now(),
    loggedIn: true
  };

  return res.json({ success: true, message: 'Session created/updated' });
});

// Verificar sessão
app.get('/session/:address', (req, res) => {
  const { address } = req.params;
  const session = sessions[address];
  if (session && session.loggedIn) {
    return res.json({ loggedIn: true, session });
  } else {
    return res.json({ loggedIn: false });
  }
});

// Deletar sessão
app.delete('/session/:address', (req, res) => {
  const { address } = req.params;
  if (sessions[address]) {
    delete sessions[address];
    return res.json({ success: true, message: 'Session deleted' });
  }
  return res.status(404).json({ error: 'Session not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});