// script.js
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message-input');
const userList = document.getElementById('user-list');

const iconUser = "https://avatars.githubusercontent.com/u/85966695?v=4";

const users = [
  {
    name: "Mark",
    avatar: "https://community.canvaslms.com/t5/image/serverpage/image-id/53132i2C12D32FF119D4F9/image-size/large/is-moderation-mode/true?v=v2&px=999"
  },
  {
    name: "John",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  },
  // Adicione mais usuários aqui...
];

const conversationHistory = {};

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

  userDiv.addEventListener('click', () => {
    setActiveConversation(userDiv);
    openConversation(user.name); // Abre a conversa ao clicar
  });

  userList.appendChild(userDiv);
}

function openConversation(userName) {
  // Define o cabeçalho da conversa
  document.getElementById('channel-header').textContent = userName;

  // Limpa as mensagens antigas do chat
  chat.innerHTML = '';

  // Recupera o histórico da conversa do cache ou inicializa um novo
  const history = conversationHistory[userName] || [];

  // Exibe as mensagens do histórico
  history.forEach(messageData => {
    appendMessage(messageData.username, messageData.message, messageData.icon, messageData.type);
  });
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

// Função para enviar mensagem
function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() !== '') {
    const activeUser = document.querySelector('.user-info.active span').textContent;
    appendMessage("Você", messageText, iconUser, "user");
    messageInput.value = '';

    saveMessageToHistory(activeUser, "Você", messageText, iconUser, "user");

    setTimeout(() => {
      const botMessage = getBotResponse(messageText);

      // Busca o avatar do usuário ativo
      const activeUserAvatar = users.find(user => user.name === activeUser).avatar; 

      changeStatusChat()

      appendMessage(activeUser, botMessage, activeUserAvatar, "bot"); // Usa o avatar encontrado
      saveMessageToHistory(activeUser, activeUser, botMessage, activeUserAvatar, "bot");
    }, 3000);
  }
}

// Função para salvar a mensagem no histórico
function saveMessageToHistory(userName, username, message, icon, type) {
  if (!conversationHistory[userName]) {
    conversationHistory[userName] = [];
  }
  conversationHistory[userName].push({ username, message, icon, type });
}

function appendMessage(username, messageText, icon, type = "bot") {
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

function getBotResponse(message) {
  const responses = [
    "Olá! 👋",
    "Como posso te ajudar?",
    "Interessante...",
    "Conte-me mais!",
    "Entendo..."
  ];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Modifica changeStatusChat para aceitar um parâmetro
function changeStatusChat(online = true) {
  var status = document.getElementById('status');
  var statusRing = document.querySelector("#status-ring");

  if (online) {
    status.innerHTML = "online";
    statusRing.classList.replace("status-ring-off", "status-ring-on");
  } else {
    status.innerHTML = "offline";
    statusRing.classList.replace("status-ring-on", "status-ring-off");
  }
}

// Reset messages:
function resetChatApp() {
  // 1. Limpa o histórico de conversas (correção)
  Object.keys(conversationHistory).forEach(key => {
    delete conversationHistory[key];
  });

  // 2. Redefine o status para offline
  changeStatusChat(false); 

  // 3. Limpa o chat
  chat.innerHTML = '';

  // 4. Redefine a conversa ativa para o primeiro usuário (Mark)
  const firstUserDiv = userList.firstChild;
  setActiveConversation(firstUserDiv);
  openConversation(users[0].name);
}

users.forEach(addUserToList); 	