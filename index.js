//const ftp = require('ftp');
const fs = require('fs');
if (fs.existsSync('config/ftp.txt')){
  try {
    const data = fs.readFileSync('config/ftp.txt', 'utf8');
    var dataArray = data.split(';')
    console.log(dataArray[0]);
    console.log(dataArray[1]);
    login(dataArray[0], dataArray[1])
  } catch (err) {
    console.error(err);
  }
}

//form.addEventListener("submit", login);
function login(ip = '', pass = '') {
  if (ip=='') {
  var ipElement = form.elements['server'];
  var passElement = form.elements['password'];
  const ip = ipElement.value;
  const pass = passElement.value;
  console.log(ip);
}
  //moet functie voor ophalen config via ftp komen
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
  ftp_client.get('config.txt', function(err, stream) {
    if (err) throw err;
    stream.once('close', function() { ftp_client.end(); });
    if (!fs.existsSync('config')){
    fs.mkdirSync('config');
  }
    stream.pipe(fs.createWriteStream('config/config-copy.txt', {flags: 'w'}));
    //when done writing file, redirect to main page
    stream.on('finish', () => {
      window.location.href = "main.html";;
    });
  });
  });
  }
  get_config();
}

const form = document.getElementById("login");
form.addEventListener("submit", login);
