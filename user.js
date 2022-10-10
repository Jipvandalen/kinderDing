const fs = require('fs');

try {
  var rawData = fs.readFileSync('config/config.txt', 'utf8');
  var rawData = rawData.split(':');
  var serverName = rawData[1];
  var users = rawData[3].split(';');
  var colors = rawData[5].split(';');
  var files = rawData[7].split(';');
} catch (err) {
  console.error(err);
}

var outHtml = ""
for (const i of Array(users.length).keys()) {
  outHtml = outHtml + "<div class='user' style='background-color:#" + colors[i] + "'><h3><a href='index.html?user=" + users[i] + "&config=" + files[i] + "&server.name=" + serverName + "'>" + users[i] + "</a></h3></div>"
}
document.getElementById('users').innerHTML = outHtml
