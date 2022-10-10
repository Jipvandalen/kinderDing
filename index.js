const fs = require('fs');
var path = require('path');

const params = new URLSearchParams(location.search);
console.log(params)
const user = params.get('user')
const configName = params.get('config')
const serverName = params.get('server.name')
// const openWebPage = params.get('redirect')
// if (typeof openWebPage == 'string') {
//   const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600
//   })
//
//   win.loadFile('index.html')
// }
// }
userConfigDownloaded = false

if (fs.existsSync('config/ftp.txt')){
  try {
    const data = fs.readFileSync('config/ftp.txt', 'utf8');
    var dataArray = data.split(';')
    login(dataArray[0], dataArray[1])
  } catch (err) {
    console.error(err);
  }
}
else {
  window.location.href = "login.html"
}

function login(ip = '', pass = '') {
  if (ip=='') {
  var ipElement = form.elements['server'];
  var passElement = form.elements['password'];
  const ip = ipElement.value;
  const pass = passElement.value;
}
  function get_config() {
    const FTPClient = require('ftp');
let ftp_client = new FTPClient();
let ftpConfig = {
     host: ip,
     port: 21,
     user: 'user',
     password: pass,
}
//create a connection to ftp server
ftp_client.connect(ftpConfig);
ftp_client.on('ready', function() {
  ftp_client.get('users/' + configName, function(err, stream) {
    if (err) throw err;
    stream.once('close', function() { ftp_client.end(); });
    if (!fs.existsSync('config/users')){
      fs.mkdirSync('config/users');
    }
    stream.pipe(fs.createWriteStream('config/users/' + configName, {flags: 'w'}));
    //when done writing file
    stream.on('finish', () => {
      userConfigDownloaded = true
    });
  });
  });
  }
  get_config();
}

function checkFlag() {
  if(userConfigDownloaded == false) {
     window.setTimeout(checkFlag, 100); /* this checks the flag every 100 milliseconds*/
  } else {
    return true
  }
}

document.addEventListener("DOMContentLoaded", function(){
  var serverNameElements = document.getElementsByTagName('server.name')
  for (const i of Array(serverNameElements.length).keys()) {
    serverNameElements[i].innerHTML = serverName
  }

  var userNameElements = document.getElementsByTagName('user.name')
  for (const i of Array(userNameElements.length).keys()) {
    userNameElements[i].innerHTML = user
  }

  checkFlag();
  try {
    var rawData = fs.readFileSync(path.join('config', 'users', configName), 'utf8');
    var rawData = rawData.split('|');
    var shortcutUrls = rawData[1].split(';');
    var shortcutNames = rawData[3].split(';');
    var shortcutColors = rawData[5].split(';');
  } catch (err) {
    console.error(err);
  }

  var shortcutElements = document.getElementsByTagName('user.shortcuts')
  data = ""
  for (const i of Array(shortcutUrls.length).keys()) {
    data = data + "<div style='background-color:#" + shortcutColors[i] + "'><a href='" + shortcutUrls[i] + "' target='_blank'>" + shortcutNames[i] + "</a></div>"
  }
  for (const i of Array(shortcutElements.length).keys()) {
    shortcutElements[i].innerHTML = data
  }

})
