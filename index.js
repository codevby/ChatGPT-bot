const chatLog = document.getElementById('chat-log'),
  userInput = document.getElementById('user-input'),
  sendButton = document.getElementById('send-button'),
  buttonIcon = document.getElementById('button-icon'),
  info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') {
    return;
  }
  else if (message === 'developer') {
    userInput.value = '';
    showMessege('user', message);
    setTimeout(() => {
      showMessege('bot', 'This is an actualization, the original source code was made by Reza Mehdikhanlou \nYoutube : @AsmrProg');
      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }, 2000);
    return;
  }

  showMessege('user', message);
  userInput.value = '';

  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerHTML = '<i class="fa-solid fa-spinner fa-pulse"></i>';
  loading.style.display = "flex";
  loading.style.justifyContent = "center";
  loading.style.alignItems = "center";
  chatLog.appendChild(loading);


  const url = 'https://open-ai21.p.rapidapi.com/chatgpt';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': '80ad31d0ffmshfc2a215b4bc65b1p1a263cjsned150dde27a9',
      'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      web_access: false
    })
  };

  fetch(url, options).then((response) => response.json()).then((response) => {
    showMessege('bot', response.result);

    loading.remove();

    buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
  }).catch((err) => {
    if (err.name === 'TypeError') {
      showMessege('bot', 'Error : Check Your Api Key!');
      buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
      buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }
  });

}

function showMessege(sender, message) {
  info.style.display = "none";
  buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
  buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

  const messageElement = document.createElement('div');
  const iconElement = document.createElement('div');
  const chatElement = document.createElement('div');
  const icon = document.createElement('i');

  chatElement.classList.add("chat-box");
  iconElement.classList.add("icon");
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  if (sender === 'user') {
    icon.classList.add('fa-regular', 'fa-user');
    iconElement.setAttribute('id', 'user-icon');
  } else {
    icon.classList.add('fa-solid', 'fa-robot');
    iconElement.setAttribute('id', 'bot-icon');
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;

}