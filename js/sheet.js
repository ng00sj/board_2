const GAS_URL = 'https://script.google.com/macros/s/AKfycbyPKtMUIvrI4RiYy9ktJBVPhAF166gQ0xr1tK0yr2NClJb5RdZIN0lywtlBQBRrsWLZ4g/exec';

async function get(){
  document.getElementById('loading').hidden=false;
  document.getElementById('getBtn').disabled=true;
  const chatDiv = document.getElementById('chatDiv');
  try {
    const response = await fetch(GAS_URL);
    const hist = await response.json();
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
  } catch (error) {
    console.error(error);
  }
  document.getElementById('loading').hidden=true;
  document.getElementById('getBtn').disabled=false;
  chatDiv.scrollTo(0, document.documentElement.scrollHeight);
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
    inputBoxMessage.value=''
  } catch (error) {
    console.error(error);
  }
  get();
  document.getElementById('sending').hidden=true;
  document.getElementById('postBtn').disabled=false;
}

get();