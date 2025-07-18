// main.js أو أي ملف JS مربوط بالواجهة

const chatForm = document.querySelector("form");
const chatInput = document.querySelector("input");
const chatBox = document.querySelector(".chat-box");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // عرض الرسالة داخل الشات
  appendMessage("أنت", userMessage);
  chatInput.value = "";

  // أرسل الطلب إلى OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: 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 // ← حط المفتاح هون أو من .env
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "أنت سُروح، المساعدة الذكية الخاصة بـ سام بورفات." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  appendMessage("سُروح", reply);
});

// وظيفة عرض الرسائل
function appendMessage(sender, message) {
  const msgElement = document.createElement("p");
  msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgElement);
}
