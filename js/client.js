// Client-side code (client.js)
const socket = io("http://localhost:8000"); // Connect to the server

// Elements
const form = document.getElementById("message-form");
const messageinput = document.getElementById("message-input");
const messagecontainer = document.querySelector(".container");
var tingaudio = new Audio("metal-clang-sound-81634.mp3")
const  append = (message,position)=>{

    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if (position=='left'){
        tingaudio.play();
    }
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you : ${message}`, 'right');
    socket.emit('send',message);
       messageinput.value ='';
})
// Prompt the user for their name
const name = prompt('Enter your name to join:');
socket.emit('new-user-join', name);

// Handle receiving messages


// Handle user joining
socket.on('user-joined', (name) => {
    append(`${name} has joined the chat!`,'right');
});
socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`,'left');
  
});
socket.on('left', (name) => {
    append(`${name} has left the chat`,'left');
  
});