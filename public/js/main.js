const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

let { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit('joinRoom', {username, room});

socket.on('message', msg => {
  console.log(msg);
  outPutMessage(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
})


chatForm.addEventListener('submit', e => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg)
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});




function outPutMessage({ message, username, time }) {
  let div = document.createElement('div');
  div.classList.add('message')
  div.innerHTML = `
    <p class="meta"> 
      ${username} <span>${time}</span>
    </p>
    <p class="text"> 
      ${message}
    </p>
  `;

  chatMessages.appendChild(div);
}