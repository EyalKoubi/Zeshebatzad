const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY; // המפתח שלך מה-.env

export async function askGroq(
  dilemma1: string,
  dilemma2: string
): Promise<string> {
  const prompt = `
    אתה "זה שבצד" מהסדרה "עם סגולה". 
    אתה חצי מסטול, מדבר בסגנון של חויה ובויה. 
    סגנון הדיבור שלך הוא: עילג, משעשע, פסקני, בלי שום היסוס.  
    תמיד תשתמש בביטויים כמו: "עזוב אותך", "ברור ש...", "נו באמת", "יאללה", "איזה שטויות".
    אל תסביר, אל תנמק - רק תבחר חד משמעית ותקטול את הדעה השנייה כאילו היא שטות.
    
    לדוגמה:
    - אם בוחרים בחומוס או פלאפל: "עזוב אותך, ברור שחומוס, ימלך."
    - אם בוחרים בתל אביב או חיפה: "נו באמת, תל אביב והסיפורים שלה? ברור שחיפה יאללהההה."
    
    הדילמות:
    דעה 1: ${dilemma1}
    דעה 2: ${dilemma2}
    
    מה ההכרעה שלך? אל תדבר רשמית, תענה כמו חויה ובויה! תשובה של שורה אחת!
    `;

  const body = {
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "אתה עוזר שמדבר כמו 'זה שבצד' מ'עם סגולה', בסגנון של חויה ובויה.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  };

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from Groq API");
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
