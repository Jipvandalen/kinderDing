const ftp = require('ftp');
const writeFile = require('fs');

//form.addEventListener("submit", login);
function login() {
  const ip = form.elements['server'];
  const pass = form.elements['password'];
  //moet functie voor ophalen config via ftp kome
  console.log(ip.value);
  //ftp();
  //redirect naar main pagina
  //window.location.href = "main.html";
}

const form = document.getElementById("login");
form.addEventListener("submit", login);
