// script.js

// Seleciona elementos do DOM e armazena em variáveis.
const chat = document.getElementById('chat'); // Área onde as mensagens são exibidas.
const messageInput = document.getElementById('message-input'); // Campo de entrada da mensagem.
const userList = document.getElementById('user-list'); // Lista de usuários.

// Define a URL da imagem de ícone do usuário.
const iconUser = "https://avatars.githubusercontent.com/u/85966695?v=4";

// Array de objetos que representa os usuários do chat.
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

// Objeto para armazenar o histórico de conversas.
const conversationHistory = {};

// Variável para rastrear a conversa ativa (inicialmente nula).
let activeConversation = null;

// Função para criar e adicionar um usuário à lista de usuários.
function addUserToList(user, index) {
  // Cria um novo elemento div para representar o usuário na lista.
  const userDiv = document.createElement('div');
  userDiv.classList.add('user-info'); // Adiciona a classe 'user-info'.

  // Define o primeiro usuário adicionado como ativo.
  if (index === 0) {
    userDiv.classList.add('active'); // Adiciona a classe 'active' para o primeiro usuário.
    activeConversation = userDiv; // Define o primeiro usuário como a conversa ativa.
  }

  // Define o HTML interno do elemento de usuário com a imagem e nome.
  userDiv.innerHTML = `
    <img src="${user.avatar}" alt="Ícone do Usuário">
    <span>${user.name}</span>
  `;

  // Adiciona um ouvinte de evento de clique ao elemento do usuário.
  // Quando o usuário é clicado, a função setActiveConversation e openConversation são chamadas.
  userDiv.addEventListener('click', () => {
    setActiveConversation(userDiv); 
    openConversation(user.name); 
  });

  // Adiciona o elemento do usuário à lista de usuários.
  userList.appendChild(userDiv);
}

// Função para abrir uma conversa com um usuário específico.
function openConversation(userName) {
  // Define o nome do usuário no cabeçalho da conversa.
  document.getElementById('channel-header').textContent = userName; 

  // Limpa as mensagens da conversa anterior.
  chat.innerHTML = ''; 

  // Recupera o histórico de mensagens para o usuário, se existir.
  // Caso contrário, define um array vazio.
  const history = conversationHistory[userName] || []; 

  // Itera sobre o histórico de mensagens e exibe cada uma delas.
  history.forEach(messageData => {
    appendMessage(messageData.username, messageData.message, messageData.icon, messageData.type);
  });
}

// Função para definir qual conversa está ativa no momento.
function setActiveConversation(conversationElement) {
  // Remove a classe 'active' da conversa ativa anterior, se houver.
  if (activeConversation) {
    activeConversation.classList.remove('active');
  }

  // Adiciona a classe 'active' à nova conversa ativa.
  conversationElement.classList.add('active');

  // Atualiza a variável global activeConversation para a nova conversa ativa.
  activeConversation = conversationElement;
}

// Função para enviar uma nova mensagem.
function sendMessage() {
  // Obtém o texto da mensagem do campo de entrada.
  const messageText = messageInput.value;

  // Verifica se a mensagem não está vazia após remover espaços em branco.
  if (messageText.trim() !== '') {
    // Obtém o nome do usuário ativo da lista de usuários.
    const activeUser = document.querySelector('.user-info.active span').textContent;

    // Exibe a mensagem do usuário no chat.
    appendMessage("Você", messageText, iconUser, "user");

    // Limpa o campo de entrada de mensagem.
    messageInput.value = '';

    // Salva a mensagem no histórico de conversas.
    saveMessageToHistory(activeUser, "Você", messageText, iconUser, "user");

    // Define um tempo de espera de 3 segundos para simular o tempo de resposta do bot.
    setTimeout(() => {
      // Obtém uma resposta aleatória do bot.
      const botMessage = getBotResponse(messageText);

      // Busca o avatar do usuário ativo na lista de usuários.
      const activeUserAvatar = users.find(user => user.name === activeUser).avatar;

      // Altera o status do chat para 'online' (opcional).
      changeStatusChat(); 

      // Exibe a mensagem do bot no chat.
      appendMessage(activeUser, botMessage, activeUserAvatar, "bot"); 

      // Salva a mensagem do bot no histórico de conversas.
      saveMessageToHistory(activeUser, activeUser, botMessage, activeUserAvatar, "bot"); 
    }, 3000); // Tempo de espera de 3 segundos.
  }
}

// Função para salvar a mensagem no histórico de conversas.
function saveMessageToHistory(userName, username, message, icon, type) {
  // Se ainda não houver um histórico para o usuário, cria um array vazio.
  if (!conversationHistory[userName]) {
    conversationHistory[userName] = [];
  }
  // Adiciona a mensagem ao histórico do usuário.
  conversationHistory[userName].push({ username, message, icon, type });
}

// Função para adicionar uma nova mensagem à área de chat.
function appendMessage(username, messageText, icon, type) {
  // Cria um novo elemento div para a mensagem.
  const messageElement = document.createElement('div');
  // Adiciona as classes 'message' e o tipo de mensagem ('user' ou 'bot').
  messageElement.classList.add('message', type);

  // Define o HTML interno da mensagem com o ícone, nome de usuário e texto.
  messageElement.innerHTML = `
    <img src="${icon}" alt="Ícone do ${type}">
    <div class="message-content">
      <span class="username">${username}</span>
      <p>${messageText}</p>
    </div>
  `;

  // Adiciona a mensagem à área de chat.
  chat.appendChild(messageElement);

  // Rola o chat para baixo para mostrar a mensagem mais recente.
  chat.scrollTop = chat.scrollHeight;
}

// Função para obter uma resposta aleatória do bot.
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

// Função para alterar o status do chat (online/offline).
// O parâmetro 'online' define se o status deve ser 'online' (true) ou 'offline' (false).
function changeStatusChat(online = true) {
  var status = document.getElementById('status'); // Obtém o elemento de status.
  var statusRing = document.querySelector("#status-ring"); // Obtém o elemento do anel de status.

  // Verifica o valor do parâmetro 'online'.
  if (online) {
    status.innerHTML = "online"; // Define o texto como 'online'.
    statusRing.classList.replace("status-ring-off", "status-ring-on"); // Altera a classe para 'online'.
  } else {
    status.innerHTML = "offline"; // Define o texto como 'offline'.
    statusRing.classList.replace("status-ring-on", "status-ring-off"); // Altera a classe para 'offline'.
  }
}

// Função para resetar o chat.
function resetChatApp() {
  // Limpa o histórico de conversas.
  for (const key in conversationHistory) {
    delete conversationHistory[key];
  }

  // Define o status do chat para 'offline'.
  changeStatusChat(false);

  // Limpa as mensagens do chat.
  chat.innerHTML = '';

  // Define a conversa ativa como o primeiro usuário (Mark).
  const firstUserDiv = userList.firstChild;
  setActiveConversation(firstUserDiv);
  openConversation(users[0].name);
}

// Itera sobre a lista de usuários e adiciona cada um à lista de usuários no chat.
users.forEach(addUserToList); 