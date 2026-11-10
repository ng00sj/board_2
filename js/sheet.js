const GAS_URL = 'https://script.google.com/macros/s/AKfycbwxcuOvHCBC7PrQZv3LjSg2mRMJtQtOQV2tK4OxoeDMkfCRjObleJSto0X-B7eIqu6W9w/exec';

function makeMessage(hist){
  const chatDiv = document.getElementById('chatDiv');
  chatDiv.innerHTML = '';
  for (const row of hist) {
    const timeBox = document.createElement('p');
    const nameBox = document.createElement('h2');
    const messageBox = document.createElement('p');
    const chatBox = document.createElement('div');
    
    timeBox.innerHTML = new Date(row.time).toLocaleString('zh-TW');
    timeBox.classList.add('timeBox');
    nameBox.innerHTML = row.name;
    nameBox.classList.add('nameBox');
    messageBox.innerHTML = row.message;
    messageBox.classList.add('messageBox');
    
    chatBox.appendChild(nameBox);
    chatBox.appendChild(timeBox);
    chatBox.appendChild(messageBox);
    chatBox.classList.add('chatBox');
    chatDiv.appendChild(chatBox);
   }
   chatDiv.scrollTo(0, chatDiv.scrollHeight);
}

async function get(){
  document.getElementById('loading').hidden=false;
  document.getElementById('getBtn').disabled=true;
  try {
    const response = await fetch(GAS_URL);
    const hist = await response.json();
    makeMessage(hist);
  } catch (error) {
    console.error(error);
  }
  document.getElementById('loading').hidden=true;
  document.getElementById('getBtn').disabled=false;
}

async function post(){
  const inputBoxUser = document.getElementById('inputBoxUser');
  const inputBoxMessage = document.getElementById('inputBoxMessage');
  const userName = inputBoxUser.value.trim(); if (!userName) return;
  const userMessage = inputBoxMessage.value.trim(); if (!userMessage) return;
  document.getElementById('sending').hidden=false;
  document.getElementById('postBtn').disabled=true;
  try {
    const response = await fetch(GAS_URL,{method: 'POST', mode: 'cors', headers: {"Content-Type": "text/plain"}, body: JSON.stringify({name: userName, message: userMessage}),});
    const hist = await response.json();
    makeMessage(hist);
    inputBoxMessage.value='';
  } catch (error) {
    console.error(error);
  }
  document.getElementById('sending').hidden=true;
  document.getElementById('postBtn').disabled=false;
}

get();