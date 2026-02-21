
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const sendMessageToAI = async (message) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
           model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content:
                "You are a friendly neighborhood assistant. Keep responses warm and helpful.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "AI Error");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI error:", error);
    return "AI is not available right now.";
  }
};
