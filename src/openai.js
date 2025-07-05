const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
export async function sendmsgopenai(message) {
  const res = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3-70b-chat-hf", // ya koi aur together model
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await res.json();
  console.log("Together API response:", data);

  if (data.error) {
    return `⚠️ Error: ${data.error.message}`;
  }

  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content.trim();
  } else {
    return "⚠️ No response from Together.";
  }
}
