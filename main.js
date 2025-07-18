const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

// إرسال الرسالة وتخزينها في Firebase
function sendMessage() {
  let message = userInput.value.trim();
  if(message) {
    appendMessage('أنت', message, 'right');
    db.ref('messages').push({sender: 'user', text: message});
    userInput.value = '';
    getBotReply(message);
  }
}

// عرض الرسائل في الواجهة
function appendMessage(sender, text, align='left') {
  chatBox.innerHTML += `<div style="text-align:${align};margin-bottom:7px;"><b>${sender}:</b> ${text}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

// جلب الرد من OpenAI (عن طريق Cloud Function أو API وسيط)
function getBotReply(userMessage) {
  appendMessage('سروح', 'جاري التفكير...', 'left');
  // عدل الرابط أدناه ليكون رابط الـ endpoint الخاص بك (Cloud Function أو سيرفر خاص)
  fetch('https://YOUR_CLOUD_FUNCTION_URL/ask', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: userMessage})
  })
  .then(res => res.json())
  .then(data => {
    // إزالة "جاري التفكير..."
    chatBox.lastChild.remove();
    appendMessage('سروح', data.reply, 'left');
    db.ref('messages').push({sender: 'bot', text: data.reply});
  })
  .catch(() => {
    chatBox.lastChild.remove();
    appendMessage('سروح', 'حصل خطأ بالاتصال، حاول مجدداً.', 'left');
  });
}

// دعم الإرسال بالضغط على Enter
userInput.addEventListener('keydown', function(event) {
  if(event.key === 'Enter') sendMessage();
});
