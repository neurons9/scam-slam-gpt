
import { useState } from 'react'

function App() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const askGPT = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      setResponse("⚠️ Kein API Key gesetzt.")
      return
    }

    setLoading(true)
    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: "Sag mir was Lustiges in Amtssprache." }]
        })
      })
      const data = await result.json()
      setResponse(data.choices?.[0]?.message?.content || "Keine Antwort erhalten.")
    } catch (error) {
      setResponse("Fehler beim Abrufen der Antwort.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Scam Slam – GPT-Version</h1>
      <button onClick={askGPT} disabled={loading}>
        {loading ? "Wird geladen..." : "GPT befragen"}
      </button>
      <p>{response}</p>
    </div>
  )
}

export default App
