// script.js
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message-input');
const userList = document.getElementById('user-list');

const iconUser = "https://avatars.githubusercontent.com/u/85966695?v=4";
const user2 = "https://community.canvaslms.com/t5/image/serverpage/image-id/53132i2C12D32FF119D4F9/image-size/large/is-moderation-mode/true?v=v2&px=999";

const users = [
  { name: "Mark", avatar: "https://community.canvaslms.com/t5/image/serverpage/image-id/53132i2C12D32FF119D4F9/image-size/large/is-moderation-mode/true?v=v2&px=999" },
  { name: "John", avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }, // Exemplo de avatar diferente
  // Adicione mais usuários aqui...
];

// Variável para rastrear a conversa ativa
let activeConversation = null;

// Função para criar e adicionar um usuário à lista
function addUserToList(user, index) { // Adiciona o parâmetro index
  const userDiv = document.createElement('div');
  userDiv.classList.add('user-info');

  // Adiciona a classe "active" se for o primeiro usuário (index 0)
  if (index === 0) {
    userDiv.classList.add('active');
    activeConversation = userDiv; // Define como conversa ativa
  } 

  userDiv.innerHTML = `
    <img src="${user.avatar}" alt="Ícone do Usuário">
    <span>${user.name}</span>
  `;

  // Adiciona um evento de clique para alternar a conversa
  userDiv.addEventListener('click', () => {
    setActiveConversation(userDiv); // Passa o elemento da conversa
  });

  userList.appendChild(userDiv);
}

// Função para definir a conversa ativa
function setActiveConversation(conversationElement) {
  // Remove a classe "active" da conversa ativa anterior
  if (activeConversation) {
    activeConversation.classList.remove('active');
  }

  // Adiciona a classe "active" à nova conversa ativa
  conversationElement.classList.add('active');

  // Atualiza a variável de rastreamento
  activeConversation = conversationElement;
}

function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() !== '') {
    appendMessage("Caio", messageText, icon = iconUser, "user");
    messageInput.value = '';
    setTimeout(fetchMessagesFromAPI, 3000);
  }
}

function appendMessage(username, messageText, icon = user2, type = "bot") {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.innerHTML = `
    <img src="${icon}" alt="Ícone do ${type}">
    <div class="message-content">
      <span class="username">${username}</span>
      <p>${messageText}</p>
    </div>
  `;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}

function fetchMessagesFromAPI() {
  const newMessages = getMockMessages();
  newMessages.forEach(message => {
    appendMessage(message.username, message.message, icon = user2, "bot");
  });

  changeStatusChat()
}

function getMockMessages() {
  return [
    { username: "Bot", message: "Olá, tudo bem!? Em que posso ajudá-lo?" }
  ];
}


// Online and Offline:

function changeStatusChat() {
  var status = document.getElementById('status');
  var statusRing = document.querySelector("#status-ring");

  status.innerHTML = "online";
  statusRing.classList.replace("status-ring-off", "status-ring-on");
}

users.forEach(addUserToList);