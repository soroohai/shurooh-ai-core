// main.js

async function sendMessage() {
  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // عرض رسالة المستخدم
  const userMsgElement = document.createElement("p");
  userMsgElement.innerHTML = `<strong>أنت:</strong> ${userMessage}`;
  chatBox.appendChild(userMsgElement);

  input.value = "";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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` // ← مفتاحك الحقيقي
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "أنت سُروح، المساعدة الذكية الخاصة بـ أبو شام." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // عرض رد سُروح
    const botMsgElement = document.createElement("p");
    botMsgElement.innerHTML = `<strong>سُروح:</strong> ${reply}`;
    chatBox.appendChild(botMsgElement);
  } catch (error) {
    const errorMsg = document.createElement("p");
    errorMsg.innerHTML = `<strong>⚠️ خطأ:</strong> فشل الاتصال بـ GPT.`;
    chatBox.appendChild(errorMsg);
    console.error("GPT Error:", error);
  }
}
