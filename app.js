// const socket = io("http://localhost:3000")
const io = require("socket.io-client")
const socket = io("https://Portfolio-Chat-App-Server.mjlinane.repl.co")
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const userName = prompt('What is your name?')

appendMessage('You joined')
socket.emit('new-user', userName)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    // Check to see if the message is empty
    if (message !== '') {
        appendMessage(`You: ${message}`)
        socket.emit('send-chat-message', message)
    }
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute('id', 'message')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}