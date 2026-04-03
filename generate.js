export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: 'Missing answers' });
  }

  const prompt = `אתה כותב תיאורי עסק מקצועיים בעברית בלבד.

כתוב תיאור עסק שיווקי ומרשים לעסק הבא:

שם העסק: ${answers.name}
תחום פעילות: ${answers.field}
קהל יעד: ${answers.audience}
יתרון תחרותי: ${answers.advantage}
מיקום וותק: ${answers.location_years}
גאווה מיוחדת: ${answers.pride}

הנחיות:
- כתוב 3 פסקאות בלבד
- טון חם, מקצועי, ומשכנע
- אל תכלול כותרות או נקודות
- רק פסקאות רצות בעברית

התיאור:`;

  try {
    const hfRes = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `<s>[INST] ${prompt} [/INST]`,
          parameters: {
            max_new_tokens: 700,
            temperature: 0.72,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      }
    );

    if (!hfRes.ok) {
      const err = await hfRes.json().catch(() => ({}));
      return res.status(hfRes.status).json({ error: err.error || 'HuggingFace error' });
    }

    const data = await hfRes.json();
    let result = '';

    if (Array.isArray(data) && data[0]?.generated_text) {
      result = data[0].generated_text
        .replace(/\[INST\].*?\[\/INST\]/gs, '')
        .trim();
    } else if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
