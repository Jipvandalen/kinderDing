const ftp = require('ftp')
const writeFile = require('fs')
const form  = document.getElementById('login');

form.addEventListener('submit', (event) => {
  const ip = form.elements['server'];
  const pass = form.elements['password']
  //moet functie voor ophalen config via ftp komen
  alert(ip.value)
  ftp()
  //redirect naar main pagina
  window.location.href = "main.html";
});
