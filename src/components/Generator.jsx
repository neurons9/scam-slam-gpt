// Scam Slam Generator component using GPT or fallback text
import React, { useState } from 'react';
import axios from 'axios';

const Generator = () => {
  const [email, setEmail] = useState('');
  const [scamType, setScamType] = useState('Geldgeschenk');
  const [name, setName] = useState('Fr. Heister');
  const [customName, setCustomName] = useState('');
  const [style, setStyle] = useState('Verwaltungsapparat');
  const [amount, setAmount] = useState('500.000');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse('');
    try {
      const result = await axios.post('/api/generate', {
        email, scamType, name: customName || name, style, amount
      });
      setResponse(result.data.reply);
    } catch (err) {
      setResponse('Ein Fehler ist aufgetreten. Bitte später erneut versuchen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator">
      <h2>Scam-Slam Antwortgenerator</h2>
      <input placeholder="E-Mail des Scammers" value={email} onChange={e => setEmail(e.target.value)} />
      <select value={scamType} onChange={e => setScamType(e.target.value)}>
        <option>Geldgeschenk</option>
        <option>Love</option>
        <option>Prinzen Investment</option>
      </select>
      <select value={name} onChange={e => setName(e.target.value)}>
        <option>Fr. Heister</option>
        <option>Warren Buffet</option>
        <option>Dr. Mwewa</option>
      </select>
      <input placeholder="eigener Name (optional)" value={customName} onChange={e => setCustomName(e.target.value)} />
      <input placeholder="Betrag in EUR" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={style} onChange={e => setStyle(e.target.value)}>
        <option>Verwaltungsapparat</option>
        <option>Guru</option>
        <option>Nigerianischer Prinz</option>
        <option>President Trump (Premium)</option>
      </select>
      <button onClick={handleGenerate} disabled={loading}>Generieren</button>
      <textarea readOnly value={response} placeholder="Antwort erscheint hier" />
    </div>
  );
};

export default Generator;